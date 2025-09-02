#!/bin/bash

# Script for deploying the project to production

echo "🚀 Starting deployment process..."

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run type checking
echo "⚡ Running type check..."
npm run type-check

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Commit your changes: git add . && git commit -m 'Ready for deployment'"
    echo "2. Push to GitHub: git push origin main"
    echo "3. Deploy on Vercel:"
    echo "   - Go to vercel.com"
    echo "   - Import your GitHub repository"
    echo "   - Deploy!"
    echo ""
    echo "🎉 Your project is ready for deployment!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi
