@echo off
REM Spark Template Setup Script for Windows
REM This script helps you get started with the Spark Template

echo.
echo ======================================
echo    Spark Template Setup
echo ======================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 20.x or higher from https://nodejs.org/
    exit /b 1
)

echo [OK] Node.js detected
node -v
echo.

REM Check npm installation
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)

echo [OK] npm detected
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo.

REM Copy .env.example if .env doesn't exist
if not exist .env (
    if exist .env.example (
        echo Creating .env file from .env.example...
        copy .env.example .env >nul
        echo [OK] .env file created
    )
) else (
    echo [INFO] .env file already exists
)
echo.

REM Run validation
echo Running validation checks...
echo.

echo   Checking TypeScript...
call npm run type-check
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] TypeScript check failed
    exit /b 1
)
echo   [OK] TypeScript check passed
echo.

echo   Running linter...
call npm run lint
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Lint check failed
    exit /b 1
)
echo   [OK] Lint check passed
echo.

echo   Running tests...
call npm test
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Tests failed
    exit /b 1
)
echo   [OK] Tests passed
echo.

REM Success message
echo ======================================
echo    Setup Complete!
echo ======================================
echo.
echo Next steps:
echo   1. Start development server:
echo      npm run dev
echo.
echo   2. Open your browser to:
echo      http://localhost:5173
echo.
echo   3. Read the documentation:
echo      - README-NEW.md - Getting started
echo      - PRD.md - Product requirements
echo      - TESTING.md - Testing guide
echo.
echo Happy coding!
echo.
