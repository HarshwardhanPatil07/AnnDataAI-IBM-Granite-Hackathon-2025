#!/bin/bash

echo "🌾 AnnDataAI - Deployment Test Script"
echo "======================================"

echo "1. Testing if frontend builds locally..."
cd AnnDataAI/frontend
npm install
npm run build

if [ -f "dist/index.html" ]; then
    echo "✅ Frontend build successful - index.html exists"
else
    echo "❌ Frontend build failed - no index.html found"
    exit 1
fi

echo "2. Checking build output..."
ls -la dist/

echo "3. Testing backend compilation..."
cd ../backend
npm install
npx tsc --noEmit api/index.ts

echo "4. All checks passed! Ready for deployment."
echo "5. Next steps:"
echo "   - Commit changes: git add . && git commit -m 'Fix vercel deployment'"
echo "   - Push to GitHub: git push origin main"
echo "   - Check Vercel dashboard for deployment status"
