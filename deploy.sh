#!/bin/bash

# Script to deploy the project to GitHub and prepare for Vercel

echo "🚀 بدء عملية النشر..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 تهيئة مستودع Git..."
    git init
fi

# Add all files
echo "📦 إضافة الملفات..."
git add .

# Commit changes
echo "💾 حفظ التغييرات..."
git commit -m "Update project for deployment"

# Check if remote origin exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "🔄 تحديث المستودع البعيد..."
    git remote set-url origin https://github.com/ahmedtitio/shkrashid-lawyers.git
else
    echo "🔗 ربط المستودع البعيد..."
    git remote add origin https://github.com/ahmedtitio/shkrashid-lawyers.git
fi

# Push to main branch
echo "⬆️ رفع المشروع إلى GitHub..."
git branch -M main
git push -u origin main

echo "✅ تم رفع المشروع بنجاح!"
echo ""
echo "📋 الخطوات التالية:"
echo "1. انتقل إلى https://github.com/ahmedtitio/shkrashid-lawyers"
echo "2. اربط المستودع بـ Vercel من https://vercel.com"
echo "3. اضغط 'Deploy' لنشر المشروع"
echo ""
echo "🔗 رابط المستودع: https://github.com/ahmedtitio/shkrashid-lawyers.git"
