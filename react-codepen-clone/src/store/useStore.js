import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePen Clone</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Start coding and see your changes in real-time!</p>
</body>
</html>`;

const defaultCSS = `body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

h1 {
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
}

p {
    text-align: center;
    font-size: 18px;
}`;

const defaultJS = `// Welcome to the CodePen Clone!
// Try some JavaScript here

console.log('Hello from the JavaScript editor!');

// Example: Change background color on click
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.addEventListener('click', function() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, \${colors[(colors.indexOf(randomColor) + 1) % colors.length]} 100%)\`;
    });
});`;

const useStore = create(
  persist(
    (set, get) => ({
      // Code states
      html: defaultHTML,
      css: defaultCSS,
      javascript: defaultJS,
      
      // UI states
      isDarkMode: true,
      layout: 'horizontal', // 'horizontal' or 'vertical'
      
      // Console output for JavaScript
      consoleOutput: [],
      
      // Saved snippets
      snippets: [],
      currentSnippetId: null,
      
      // Actions
      setHTML: (html) => set({ html }),
      setCSS: (css) => set({ css }),
      setJavaScript: (javascript) => set({ javascript }),
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setLayout: (layout) => set({ layout }),
      
      addConsoleOutput: (output) => set((state) => ({
        consoleOutput: [...state.consoleOutput, output]
      })),
      clearConsoleOutput: () => set({ consoleOutput: [] }),
      
      resetCode: () => set({
        html: defaultHTML,
        css: defaultCSS,
        javascript: defaultJS,
        consoleOutput: []
      }),
      
      saveSnippet: (name) => {
        const { html, css, javascript } = get();
        const snippet = {
          id: Date.now().toString(),
          name,
          html,
          css,
          javascript,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          snippets: [...state.snippets, snippet],
          currentSnippetId: snippet.id
        }));
        return snippet.id;
      },
      
      loadSnippet: (id) => {
        const { snippets } = get();
        const snippet = snippets.find(s => s.id === id);
        if (snippet) {
          set({
            html: snippet.html,
            css: snippet.css,
            javascript: snippet.javascript,
            currentSnippetId: id,
            consoleOutput: []
          });
        }
      },
      
      deleteSnippet: (id) => set((state) => ({
        snippets: state.snippets.filter(s => s.id !== id),
        currentSnippetId: state.currentSnippetId === id ? null : state.currentSnippetId
      })),
      
      updateCurrentSnippet: () => {
        const { snippets, currentSnippetId, html, css, javascript } = get();
        if (currentSnippetId) {
          set({
            snippets: snippets.map(snippet =>
              snippet.id === currentSnippetId
                ? { ...snippet, html, css, javascript }
                : snippet
            )
          });
        }
      }
    }),
    {
      name: 'codepen-clone-storage',
      partialize: (state) => ({
        snippets: state.snippets,
        isDarkMode: state.isDarkMode,
        layout: state.layout
      })
    }
  )
);

export default useStore;