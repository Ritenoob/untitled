#!/bin/bash

# Spark Template Setup Script
# This script helps you get started with the Spark Template

set -e  # Exit on error

echo "🚀 Spark Template Setup"
echo "======================="
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js 20.x or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Warning: Node.js version is $NODE_VERSION, but 20+ is recommended"
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Copy .env.example if .env doesn't exist
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📝 Creating .env file from .env.example..."
        cp .env.example .env
        echo "✅ .env file created"
    fi
else
    echo "ℹ️  .env file already exists"
fi
echo ""

# Run validation
echo "🔍 Running validation checks..."
echo ""

echo "  Checking TypeScript..."
npm run type-check
echo "  ✅ TypeScript check passed"
echo ""

echo "  Running linter..."
npm run lint
echo "  ✅ Lint check passed"
echo ""

echo "  Running tests..."
npm test
echo "  ✅ Tests passed"
echo ""

# Success message
echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "  1. Start development server:"
echo "     npm run dev"
echo ""
echo "  2. Open your browser to:"
echo "     http://localhost:5173"
echo ""
echo "  3. Read the documentation:"
echo "     - README-NEW.md - Getting started"
echo "     - PRD.md - Product requirements"
echo "     - TESTING.md - Testing guide"
echo ""
echo "Happy coding! 🎉"
