#!/bin/bash

# CodePen Clone - Quick Start Script

echo "🚀 Starting CodePen Clone..."
echo "=================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔥 Starting development server..."
echo "📱 The app will be available at: http://localhost:5173"
echo "🌟 Features included:"
echo "   - Live HTML/CSS/JavaScript editing"
echo "   - Real-time preview"
echo "   - Console output"
echo "   - Dark/Light mode"
echo "   - Save & share snippets"
echo "   - Download as ZIP"
echo "   - Mobile responsive"
echo ""
echo "Happy coding! 🎉"

npm run dev