@echo off
REM Quick setup script for AnnDataAI IBM watsonx.ai integration (Windows)

echo 🚀 AnnDataAI IBM watsonx.ai Setup Script
echo ========================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the backend directory
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy ".env.example" ".env"
    echo ✅ .env file created. Please edit it with your IBM watsonx.ai credentials.
    echo.
    echo 🔑 Required IBM watsonx.ai credentials:
    echo    - WATSONX_API_KEY (from IBM Cloud)
    echo    - WATSONX_PROJECT_ID (from watsonx.ai Studio)
    echo    - WATSONX_URL (based on your region)
    echo.
    echo 📖 See IBM_WATSONX_SETUP_GUIDE.md for detailed instructions
    echo.
    pause
)

REM Test the setup
echo 🧪 Testing IBM watsonx.ai connection...
node test-watson-setup.js

if %errorlevel% equ 0 (
    echo.
    echo 🎉 Setup completed successfully!
    echo 🚀 You can now start the server with: npm run dev
) else (
    echo.
    echo ❌ Setup test failed. Please check your credentials and try again.
    echo 📖 See IBM_WATSONX_SETUP_GUIDE.md for troubleshooting
)

pause
