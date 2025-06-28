# AnnDataAI - Start Both Backend and Frontend
# PowerShell script to run the full-stack application

Write-Host "Starting AnnDataAI - Agricultural Intelligence Platform" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Check if ports are available
Write-Host "Checking ports..." -ForegroundColor Yellow
if (Test-Port 5000) {
    Write-Host "Warning: Port 5000 (backend) is already in use" -ForegroundColor Red
}
if (Test-Port 5173) {
    Write-Host "Warning: Port 5173 (frontend) is already in use" -ForegroundColor Red
}

# Start backend server
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
$backendJob = Start-Job -ScriptBlock {
    Set-Location "c:\Users\61433\Downloads\AnnDataAI\AnnDataAI\backend"
    npm run dev
}

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "c:\Users\61433\Downloads\AnnDataAI\AnnDataAI\frontend"
    npm run dev
}

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host "Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow

# Keep the script running and monitor jobs
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if jobs are still running
        if ($backendJob.State -eq "Failed" -or $backendJob.State -eq "Completed") {
            Write-Host "Backend server stopped" -ForegroundColor Red
            break
        }
        if ($frontendJob.State -eq "Failed" -or $frontendJob.State -eq "Completed") {
            Write-Host "Frontend server stopped" -ForegroundColor Red
            break
        }
    }
}
catch {
    Write-Host "Stopping servers..." -ForegroundColor Yellow
}
finally {
    # Clean up jobs
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job $frontendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job $frontendJob -ErrorAction SilentlyContinue
    Write-Host "All servers stopped" -ForegroundColor Red
}
