@echo off
echo Starting StudWork...

:: Start Backend in a new window
start "StudWork Backend" cmd /k "cd backend && python app.py"

:: Start Frontend in a new window
start "StudWork Frontend" cmd /k "cd frontend && npm run dev"

echo Servers are initializing...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Please wait a few seconds for them to boot up.
pause
