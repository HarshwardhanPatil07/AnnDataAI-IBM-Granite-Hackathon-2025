# AnnDataAI Vercel Deployment Script (PowerShell)

Write-Host "🚀 Starting AnnDataAI deployment..." -ForegroundColor Green

# Navigate to project root  
Set-Location "c:\Users\61433\Downloads\AnnDataAI"

# Check Vercel authentication
Write-Host "🔐 Checking Vercel authentication..." -ForegroundColor Yellow
try {
    vercel whoami
} catch {
    Write-Host "Please login to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Set environment variables
Write-Host "🔧 Setting environment variables..." -ForegroundColor Yellow

$envVars = @{
    "WATSONX_API_KEY" = "fE1f-7b-xTomfbts3S5D1R-edfoqFlDDenkRu0y8HFv5"
    "WATSONX_PROJECT_ID" = "44983bea-36cc-467c-a71b-8a9b055761dc"
    "WATSONX_URL" = "https://us-south.ml.cloud.ibm.com" 
    "WATSONX_PLATFORM_URL" = "https://api.dataplatform.cloud.ibm.com"
    "WATSONX_AUTHENTICATOR" = "iam"
    "PORT" = "3000"
    "NODE_ENV" = "production"
    "MONGO_CONNECTION_URL" = "mongodb+srv://AnnDataAI:AnnDataAI@anndataai.xwok8gk.mongodb.net/?retryWrites=true&w=majority&appName=AnnDataAI"
    "JWT_SECRET" = "846d9b63615993b4a8314f2a6ead98b4d6d2332c2c4650f53319dc049d87cef8"
    "JWT_EXPIRES_IN" = "1d"
    "MAX_FILE_SIZE" = "10mb"
    "UPLOAD_PATH" = "./uploads"
    "RATE_LIMIT_WINDOW_MS" = "900000"
    "RATE_LIMIT_MAX_REQUESTS" = "100"
    "DEBUG" = "false"
}

foreach ($key in $envVars.Keys) {
    Write-Host "Setting $key..." -ForegroundColor Cyan
    vercel env add $key $envVars[$key] production
}

Write-Host "✅ Environment variables configured!" -ForegroundColor Green

# Deploy to production
Write-Host "🚀 Deploying to production..." -ForegroundColor Green
vercel --prod --cwd ".\AnnDataAI"

Write-Host "🎉 Deployment complete!" -ForegroundColor Green
