Write-Host "🌾 AnnDataAI - Deploying to Vercel..." -ForegroundColor Green

if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
npm run build
Set-Location ..

Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "🚀 Deployment complete! Check your Vercel dashboard for the live URL." -ForegroundColor Green
Write-Host "📝 Don't forget to set up your environment variables in Vercel dashboard!" -ForegroundColor Cyan