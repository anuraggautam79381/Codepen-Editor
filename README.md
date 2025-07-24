# CodePen Clone - React Online Code Editor

A fully functional CodePen-like online editor built with React, featuring real-time HTML, CSS, and JavaScript editing with live preview.


## 🚀 Features

### Core Features
- **Three Resizable Code Editors**: HTML, CSS, and JavaScript with syntax highlighting
- **Live Preview**: Real-time rendering of your code in an iframe
- **Monaco Editor Integration**: Professional code editing experience with IntelliSense
- **Dark/Light Mode**: Toggle between themes for comfortable coding
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Advanced Features
- **Console Output**: Capture and display `console.log()`, errors, and warnings
- **Local Storage Persistence**: Save snippets locally with auto-persistence
- **Download as ZIP**: Export your project as a complete ZIP file with HTML, CSS, JS, and README
- **Share Snippets**: Generate shareable URLs for your code snippets
- **Layout Toggle**: Switch between horizontal and vertical editor layouts
- **Reset Functionality**: Quick reset to default template
- **Mobile-Responsive**: Optimized layout for mobile development

### Technical Features
- **Safe Code Execution**: Sandboxed iframe for secure preview rendering
- **Error Handling**: Comprehensive error catching and display
- **Auto-Save**: Automatic saving of your work to localStorage
- **Multiple Themes**: Support for custom Monaco Editor themes

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **State Management**: Zustand with persistence middleware
- **Code Editor**: Monaco Editor (VS Code editor)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **File Processing**: JSZip for download functionality
- **Storage**: localStorage for snippet persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-codepen-clone.git
   cd react-codepen-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start coding!

## 🎯 Usage

### Basic Usage
1. **Write Code**: Use the three editors to write HTML, CSS, and JavaScript
2. **See Live Preview**: Your code renders automatically in the preview pane
3. **Check Console**: Toggle the console to see JavaScript output and errors
4. **Toggle Theme**: Switch between dark and light modes using the theme button

### Advanced Usage
1. **Save Snippets**: Click the save icon to store your code snippets locally
2. **Load Snippets**: Access your saved snippets from the folder icon
3. **Share Code**: Use the share button to generate a URL for sharing your code
4. **Download Project**: Export your code as a ZIP file for local development
5. **Change Layout**: Toggle between horizontal and vertical editor layouts

### Keyboard Shortcuts
- **Ctrl/Cmd + S**: Save current snippet (when save dialog is open)
- **Monaco Editor shortcuts**: All standard VS Code shortcuts work in the editors

## 📁 Project Structure

```
react-codepen-clone/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx      # Monaco Editor wrapper
│   │   ├── Console.jsx         # Console output display
│   │   ├── Header.jsx          # Toolbar and navigation
│   │   └── Preview.jsx         # Live preview iframe
│   ├── store/
│   │   └── useStore.js         # Zustand store with persistence
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Tailwind CSS imports
│   └── main.jsx                # React app entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Customization

### Adding New Themes
Modify the Monaco Editor theme configuration in `src/components/CodeEditor.jsx`:

```javascript
monaco.editor.defineTheme('custom-theme', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // Add custom syntax highlighting rules
  ],
  colors: {
    'editor.background': '#your-color',
    // Add more color customizations
  }
});
```

### Extending Features
The modular architecture makes it easy to add new features:
- Add new editor languages in `CodeEditor.jsx`
- Extend the store in `useStore.js` for new state management
- Add toolbar buttons in `Header.jsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### Deploy to GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor**: For providing the excellent code editing experience
- **CodePen**: For inspiration and reference
- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Zustand**: For the simple and effective state management

## 🐛 Known Issues

- Large files may cause performance issues in the preview
- Some browser extensions may interfere with iframe rendering
- Mobile keyboard may hide parts of the interface

## 🔮 Future Enhancements

- [ ] Multiple file support within projects
- [ ] User authentication and cloud storage
- [ ] Collaborative editing features
- [ ] More programming language support
- [ ] Plugin system for custom functionality
- [ ] Import external libraries
- [ ] Project templates gallery

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainers.

---

**Happy Coding!** 🎉
