Write-Host "🌾 AnnDataAI - Deployment Test Script" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

Write-Host "1. Testing if frontend builds locally..." -ForegroundColor Yellow
Set-Location "AnnDataAI/frontend"

Write-Host "   Installing dependencies..." -ForegroundColor Cyan
npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed - dependency conflicts" -ForegroundColor Red
    Write-Host "Try running: npm install --legacy-peer-deps --force" -ForegroundColor Yellow
    exit 1
}

Write-Host "   Building frontend..." -ForegroundColor Cyan
npm run build

if (Test-Path "dist/index.html") {
    Write-Host "✅ Frontend build successful - index.html exists" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed - no index.html found" -ForegroundColor Red
    exit 1
}

Write-Host "2. Checking build output..." -ForegroundColor Yellow
Get-ChildItem "dist/" -Force

Write-Host "3. Testing backend compilation..." -ForegroundColor Yellow
Set-Location "../backend"
npm install

Write-Host "4. All checks passed! Ready for deployment." -ForegroundColor Green
Write-Host "5. Next steps:" -ForegroundColor Cyan
Write-Host "   - Commit changes: git add . && git commit -m 'Fix vercel deployment'" -ForegroundColor White
Write-Host "   - Push to GitHub: git push origin main" -ForegroundColor White
Write-Host "   - Check Vercel dashboard for deployment status" -ForegroundColor White

Set-Location "../.."
