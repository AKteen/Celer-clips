@echo off
echo Starting Celer Clips Backend...
echo.
python -m uvicorn app.main:app --reload
