import { useEffect, useState } from 'react';
import useStore from './store/useStore';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import Console from './components/Console';

function App() {
  const { 
    html, 
    css, 
    javascript, 
    setHTML, 
    setCSS, 
    setJavaScript, 
    isDarkMode, 
    layout 
  } = useStore();

  const [showConsole, setShowConsole] = useState(false);

  // Handle URL sharing - load shared code from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('code');
    
    if (sharedCode) {
      try {
        const codeData = JSON.parse(atob(sharedCode));
        if (codeData.html) setHTML(codeData.html);
        if (codeData.css) setCSS(codeData.css);
        if (codeData.javascript) setJavaScript(codeData.javascript);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Failed to load shared code:', error);
      }
    }
  }, [setHTML, setCSS, setJavaScript]);

  // Handle responsive layout
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply dark mode to document body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  const getLayoutClasses = () => {
    if (isMobile) {
      return 'flex flex-col';
    }
    
    if (layout === 'vertical') {
      return 'flex flex-col';
    }
    
    return 'flex flex-row';
  };

  const getEditorContainerClasses = () => {
    if (isMobile) {
      return 'flex flex-col h-64'; // Fixed height on mobile
    }
    
    if (layout === 'vertical') {
      return 'grid grid-cols-1 md:grid-cols-3 gap-1 flex-1';
    }
    
    return 'flex flex-col gap-1 w-1/2';
  };

  const getPreviewContainerClasses = () => {
    if (isMobile) {
      return 'flex-1 flex flex-col';
    }
    
    if (layout === 'vertical') {
      return 'flex-1 flex flex-col';
    }
    
    return 'w-1/2 flex flex-col';
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      <Header />
      
      {/* Main Content */}
      <div className="h-[calc(100vh-73px)] flex flex-col">
        <div className={`flex-1 ${getLayoutClasses()} gap-1 p-1`}>
          {/* Editors Container */}
          <div className={getEditorContainerClasses()}>
            {/* HTML Editor */}
            <div className="h-full">
              <CodeEditor
                language="html"
                value={html}
                onChange={(value) => setHTML(value || '')}
                title="HTML"
              />
            </div>

            {/* CSS Editor */}
            <div className="h-full">
              <CodeEditor
                language="css"
                value={css}
                onChange={(value) => setCSS(value || '')}
                title="CSS"
              />
            </div>

            {/* JavaScript Editor */}
            <div className="h-full">
              <CodeEditor
                language="javascript"
                value={javascript}
                onChange={(value) => setJavaScript(value || '')}
                title="JavaScript"
              />
            </div>
          </div>

          {/* Preview Container */}
          <div className={getPreviewContainerClasses()}>
            {/* Preview */}
            <div className={`${showConsole ? 'h-2/3' : 'flex-1'}`}>
              <Preview />
            </div>

            {/* Console Toggle Button */}
            <div className={`flex justify-center py-1 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <button
                onClick={() => setShowConsole(!showConsole)}
                className={`px-4 py-1 text-xs rounded transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-300 text-gray-700'
                } ${showConsole ? 'bg-blue-500 text-white' : ''}`}
                title={showConsole ? 'Hide console' : 'Show console'}
              >
                {showConsole ? '📄 Hide Console' : '📄 Show Console'}
              </button>
            </div>

            {/* Console */}
            {showConsole && (
              <div className="h-1/3 border-t">
                <Console />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-specific bottom toolbar */}
      {isMobile && (
        <div className={`flex justify-center gap-2 p-2 border-t ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-3 py-1 text-xs rounded ${
              showConsole 
                ? 'bg-blue-500 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-200 text-gray-700'
            }`}
          >
            Console
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
