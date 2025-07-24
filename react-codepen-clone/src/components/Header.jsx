import { useState } from 'react';
import useStore from '../store/useStore';
import templates from '../store/templates';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Header = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    resetCode, 
    html, 
    css, 
    javascript, 
    setHTML,
    setCSS,
    setJavaScript,
    saveSnippet,
    snippets,
    loadSnippet,
    deleteSnippet,
    layout,
    setLayout
  } = useStore();
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSnippetsDialog, setShowSnippetsDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [snippetName, setSnippetName] = useState('');

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    
    // Add HTML file
    zip.file('index.html', html);
    
    // Add CSS file
    zip.file('style.css', css);
    
    // Add JavaScript file
    zip.file('script.js', javascript);
    
    // Add a basic package.json for completeness
    const packageJson = {
      name: 'codepen-clone-export',
      version: '1.0.0',
      description: 'Exported from CodePen Clone',
      main: 'index.html',
      scripts: {
        start: 'npx http-server .'
      }
    };
    zip.file('package.json', JSON.stringify(packageJson, null, 2));
    
    // Add a README
    const readme = `# CodePen Clone Export

This project was exported from CodePen Clone.

## Files
- \`index.html\` - Your HTML code
- \`style.css\` - Your CSS code  
- \`script.js\` - Your JavaScript code

## Running locally
1. Install http-server: \`npm install -g http-server\`
2. Run: \`npm start\` or \`http-server .\`
3. Open your browser to the displayed URL

Alternatively, you can open \`index.html\` directly in your browser.
`;
    zip.file('README.md', readme);
    
    // Generate and download the zip
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'codepen-clone-project.zip');
  };

  const handleSaveSnippet = () => {
    if (snippetName.trim()) {
      saveSnippet(snippetName.trim());
      setSnippetName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadSnippet = (snippetId) => {
    loadSnippet(snippetId);
    setShowSnippetsDialog(false);
  };

  const handleDeleteSnippet = (snippetId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(snippetId);
    }
  };

  const generateShareUrl = () => {
    const codeData = {
      html: html,
      css: css,
      javascript: javascript
    };
    const encodedData = btoa(JSON.stringify(codeData));
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodedData}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Share URL copied to clipboard!');
    }).catch(() => {
      prompt('Copy this URL to share:', shareUrl);
    });
  };

  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      setHTML(template.html);
      setCSS(template.css);
      setJavaScript(template.javascript);
      setShowTemplatesDialog(false);
    }
  };

  return (
    <>
      <header className={`px-4 py-3 border-b ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-300 text-gray-900'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">
              <span className="text-blue-500">Code</span>
              <span>Pen Clone</span>
            </h1>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2">
            {/* Layout Toggle */}
            <button
              onClick={() => setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title={`Switch to ${layout === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
            >
              {layout === 'horizontal' ? '⚏' : '⚎'}
            </button>

            {/* Save Snippet */}
            <button
              onClick={() => setShowSaveDialog(true)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Save snippet"
            >
              💾
            </button>

            {/* Templates */}
            <button
              onClick={() => setShowTemplatesDialog(true)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Load templates"
            >
              📋
            </button>

            {/* Load Snippets */}
            <button
              onClick={() => setShowSnippetsDialog(true)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Load snippets"
            >
              📂 ({snippets.length})
            </button>

            {/* Share */}
            <button
              onClick={generateShareUrl}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Share code"
            >
              🔗
            </button>

            {/* Download */}
            <button
              onClick={handleDownloadZip}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Download as ZIP"
            >
              ⬇️
            </button>

            {/* Reset */}
            <button
              onClick={() => confirm('Reset all code to default?') && resetCode()}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Reset code"
            >
              🔄
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Toggle dark/light mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Save Snippet</h3>
            <input
              type="text"
              placeholder="Enter snippet name..."
              value={snippetName}
              onChange={(e) => setSnippetName(e.target.value)}
              className={`w-full px-3 py-2 border rounded mb-4 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveSnippet()}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className={`px-4 py-2 rounded ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSnippet}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!snippetName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snippets Dialog */}
      {showSnippetsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-auto ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Saved Snippets</h3>
            {snippets.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No snippets saved yet</p>
            ) : (
              <div className="space-y-2">
                {snippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className={`p-3 rounded border cursor-pointer hover:opacity-80 ${
                      isDarkMode 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleLoadSnippet(snippet.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{snippet.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(snippet.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSnippet(snippet.id, e)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete snippet"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowSnippetsDialog(false)}
                className={`px-4 py-2 rounded ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Dialog */}
      {showTemplatesDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-auto ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div
                className={`p-4 rounded border cursor-pointer hover:opacity-80 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => loadTemplate('default')}
              >
                <h4 className="font-medium text-blue-500">🎨 Welcome Template</h4>
                <p className="text-sm text-gray-500 mt-1">
                  A simple welcome page with interactive colors
                </p>
              </div>
              
              <div
                className={`p-4 rounded border cursor-pointer hover:opacity-80 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => loadTemplate('calculator')}
              >
                <h4 className="font-medium text-green-500">🧮 Calculator</h4>
                <p className="text-sm text-gray-500 mt-1">
                  A fully functional calculator with keyboard support
                </p>
              </div>
              
              <div
                className={`p-4 rounded border cursor-pointer hover:opacity-80 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => loadTemplate('todoApp')}
              >
                <h4 className="font-medium text-purple-500">📝 Todo App</h4>
                <p className="text-sm text-gray-500 mt-1">
                  A complete todo application with local storage
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowTemplatesDialog(false)}
                className={`px-4 py-2 rounded ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;