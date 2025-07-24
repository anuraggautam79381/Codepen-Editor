import { useRef, useEffect } from 'react';
import useStore from '../store/useStore';

const Preview = () => {
  const iframeRef = useRef(null);
  const { html, css, javascript, isDarkMode, addConsoleOutput, clearConsoleOutput } = useStore();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Clear previous console output
    clearConsoleOutput();

    // Create the complete HTML document
    const document = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Reset some default styles */
            * {
              box-sizing: border-box;
            }
            
            /* User CSS */
            ${css}
          </style>
        </head>
        <body>
          ${html}
          
          <script>
            // Override console.log to capture output
            (function() {
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;
              
              console.log = function(...args) {
                parent.postMessage({
                  type: 'console-log',
                  level: 'log',
                  args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))
                }, '*');
                originalLog.apply(console, args);
              };
              
              console.error = function(...args) {
                parent.postMessage({
                  type: 'console-log',
                  level: 'error',
                  args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))
                }, '*');
                originalError.apply(console, args);
              };
              
              console.warn = function(...args) {
                parent.postMessage({
                  type: 'console-log',
                  level: 'warn',
                  args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))
                }, '*');
                originalWarn.apply(console, args);
              };
              
              // Catch runtime errors
              window.addEventListener('error', function(e) {
                parent.postMessage({
                  type: 'console-log',
                  level: 'error',
                  args: [e.message + ' at line ' + e.lineno]
                }, '*');
              });
              
              // Catch unhandled promise rejections
              window.addEventListener('unhandledrejection', function(e) {
                parent.postMessage({
                  type: 'console-log',
                  level: 'error',
                  args: ['Unhandled promise rejection: ' + e.reason]
                }, '*');
              });
            })();
            
            // User JavaScript
            try {
              ${javascript}
            } catch (error) {
              console.error('JavaScript Error:', error.message);
            }
          </script>
        </body>
      </html>
    `;

    // Write to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(document);
    iframeDoc.close();
  }, [html, css, javascript, clearConsoleOutput]);

  useEffect(() => {
    // Listen for console messages from iframe
    const handleMessage = (event) => {
      if (event.data.type === 'console-log') {
        addConsoleOutput({
          level: event.data.level,
          message: event.data.args.join(' '),
          timestamp: new Date().toLocaleTimeString()
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addConsoleOutput]);

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Preview Header */}
      <div className={`px-4 py-2 border-b ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-gray-100 border-gray-300 text-gray-900'
      }`}>
        <h3 className="text-sm font-medium uppercase tracking-wide">
          Preview
        </h3>
      </div>
      
      {/* Iframe Preview */}
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Code Preview"
          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-presentation allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Preview;