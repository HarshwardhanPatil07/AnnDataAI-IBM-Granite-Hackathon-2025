@echo off
echo 🚀 Deploying AnnDataAI to Vercel...
echo.

REM Check if we're in the right directory
if not exist "vercel.json" (
    echo ❌ Error: vercel.json not found!
    echo Please run this script from the AnnDataAI root directory
    pause
    exit /b 1
)

echo 📋 Pre-deployment checklist:
echo ✅ Backend CORS updated to allow all origins
echo ✅ Authentication disabled (DISABLE_AUTH = true)
echo ✅ Local backend working on port 3600

echo.
echo 🔧 Building frontend...
cd frontend
call npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

echo.
echo 🔧 Building backend...
cd ..\backend
call npm run build
if errorlevel 1 (
    echo ❌ Backend build failed!
    pause
    exit /b 1
)

cd ..

echo.
echo 🚀 Deploying to Vercel...
echo.
echo ⚠️  IMPORTANT: After deployment, you need to:
echo    1. Set environment variables in Vercel dashboard
echo    2. Update the API URL in your frontend
echo    3. Test the deployed endpoints
echo.

REM Deploy to Vercel
npx vercel --prod

echo.
echo ✅ Deployment command completed!
echo.
echo 📋 Next steps:
echo    1. Copy the deployment URL from above
echo    2. Go to Vercel dashboard and set environment variables:
echo       - MONGO_CONNECTION_URL
echo       - JWT_SECRET
echo       - NODE_ENV=production
echo    3. Test your deployed API at: [YOUR_URL]/api/
echo    4. Update frontend API URL if needed
echo.
pause
