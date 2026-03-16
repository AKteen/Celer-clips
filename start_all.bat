@echo off
echo ========================================
echo   Celer Clips - Starting Application
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start "Celer Clips Backend" cmd /k "python -m uvicorn app.main:app --reload"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend...
start "Celer Clips Frontend" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
