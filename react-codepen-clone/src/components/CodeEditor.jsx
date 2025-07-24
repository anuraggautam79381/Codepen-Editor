import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import useStore from '../store/useStore';

const CodeEditor = ({ language, value, onChange, title }) => {
  const editorRef = useRef(null);
  const { isDarkMode } = useStore();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure Monaco themes
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1a1a1a',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
      }
    });

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#333333',
        'editorLineNumber.foreground': '#999999',
        'editorLineNumber.activeForeground': '#333333',
      }
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      const theme = isDarkMode ? 'custom-dark' : 'custom-light';
      editorRef.current.updateOptions({ theme });
    }
  }, [isDarkMode]);

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'javascript':
        return 'javascript';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Editor Header */}
      <div className={`px-4 py-2 border-b ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-gray-100 border-gray-300 text-gray-900'
      }`}>
        <h3 className="text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
      </div>
      
      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguageForMonaco(language)}
          value={value}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={isDarkMode ? 'custom-dark' : 'custom-light'}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
            },
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            bracketPairColorization: {
              enabled: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;