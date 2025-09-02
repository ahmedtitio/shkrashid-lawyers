#!/bin/bash

echo "🚀 Starting optimization process for Sheikh Rashid Lawyers website..."

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Run linting and fix issues
echo "🔧 Running ESLint and fixing issues..."
npm run lint:fix

# Run TypeScript type checking
echo "📝 Running TypeScript type checking..."
npm run type-check

# Build the project with optimizations
echo "🏗️ Building project with optimizations..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npm run export

echo "✅ Optimization completed successfully!"
echo ""
echo "📊 Performance improvements applied:"
echo "   • Image optimization enabled"
echo "   • Bundle splitting optimized"
echo "   • CSS optimization enabled"
echo "   • Compression enabled"
echo "   • Static export configured"
echo "   • Security headers added"
echo ""
echo "🎯 Next steps:"
echo "   • Deploy the 'out/' folder to your hosting provider"
echo "   • Test the website performance using Lighthouse"
echo "   • Monitor Core Web Vitals"
