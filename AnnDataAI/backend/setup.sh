#!/bin/bash
# Quick setup script for AnnDataAI IBM watsonx.ai integration

echo "🚀 AnnDataAI IBM watsonx.ai Setup Script"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your IBM watsonx.ai credentials."
    echo ""
    echo "🔑 Required IBM watsonx.ai credentials:"
    echo "   - WATSONX_API_KEY (from IBM Cloud)"
    echo "   - WATSONX_PROJECT_ID (from watsonx.ai Studio)"
    echo "   - WATSONX_URL (based on your region)"
    echo ""
    echo "📖 See IBM_WATSONX_SETUP_GUIDE.md for detailed instructions"
    echo ""
    read -p "Press Enter after you've updated the .env file..."
fi

# Test the setup
echo "🧪 Testing IBM watsonx.ai connection..."
node test-watson-setup.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "🚀 You can now start the server with: npm run dev"
else
    echo ""
    echo "❌ Setup test failed. Please check your credentials and try again."
    echo "📖 See IBM_WATSONX_SETUP_GUIDE.md for troubleshooting"
fi
