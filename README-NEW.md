# ✨ Spark Template - Production Ready

[![CI Status](https://github.com/github/spark-template/workflows/CI/badge.svg)](https://github.com/github/spark-template/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready, fully-tested Spark template with enterprise-grade quality standards. This template provides everything you need to build, test, and deploy Spark applications with confidence.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone or use this template
# cd into your project directory

# Install dependencies
npm install

# Copy environment template (if needed)
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Check code for linting errors |
| `npm run lint:fix` | Fix auto-fixable linting errors |
| `npm run type-check` | Run TypeScript type checking |
| `npm run validate` | Run lint + type-check + test (pre-commit check) |

## 🏗️ Project Structure

```
spark-template/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD pipeline
├── src/
│   ├── components/
│   │   └── ui/            # 45+ shadcn components
│   ├── hooks/
│   │   └── use-mobile.ts  # Mobile breakpoint detection
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── styles/
│   │   └── theme.css      # Radix UI color system
│   ├── test/
│   │   └── setup.ts       # Test environment setup
│   ├── App.tsx            # Main application component
│   ├── App.test.tsx       # App component tests
│   ├── ErrorFallback.tsx  # Error boundary UI
│   ├── index.css          # Custom CSS styles
│   ├── main.css           # CSS imports (do not edit)
│   └── main.tsx           # Application entry point (do not edit)
├── .env.example           # Environment variables template
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── PRD.md                 # Product Requirements Document
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── vitest.config.ts       # Vitest test configuration
```

## 🧪 Testing

This template includes comprehensive testing infrastructure:

- **Unit Tests**: Test individual functions and utilities
- **Component Tests**: Test React components with React Testing Library
- **Coverage Reports**: Track test coverage with detailed metrics
- **CI Integration**: Automated testing on every push/PR

### Running Tests

```bash
# Run all tests once
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

Tests are co-located with source files using the `.test.tsx` or `.test.ts` extension:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## 🎨 UI Components

This template includes 45+ pre-installed shadcn/ui components:

- Buttons, Cards, Dialogs, Forms
- Tables, Tabs, Tooltips, Popovers
- Select, Input, Textarea, Checkbox
- Alert, Badge, Avatar, Progress
- And many more...

See `src/components/ui/` for the full list.

### Using Components

```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

## 🎯 Code Quality

### ESLint
Configured with TypeScript ESLint and React-specific rules:

```bash
npm run lint        # Check for errors
npm run lint:fix    # Auto-fix issues
```

### TypeScript
Strict type checking enabled:

```bash
npm run type-check
```

### Pre-commit Validation
Run all checks before committing:

```bash
npm run validate
```

## 🔄 CI/CD Pipeline

GitHub Actions workflow automatically runs on push/PR:

1. **Lint**: ESLint checks
2. **Type Check**: TypeScript validation
3. **Test**: Full test suite with coverage
4. **Build**: Production build verification

All jobs run in parallel for fast feedback.

## 🔐 Environment Variables

Copy `.env.example` to `.env` and add your configuration:

```bash
cp .env.example .env
```

Never commit `.env` files to version control.

## 📦 Adding Dependencies

Always verify packages are browser-compatible:

```bash
# Add a new dependency
npm install package-name

# Add a dev dependency
npm install -D package-name

# Update dependencies
npm update
```

## 🎨 Styling

### Tailwind CSS
Utility-first CSS framework with custom theme:

```tsx
<div className="flex items-center gap-4 p-4 bg-background text-foreground">
  <Button className="bg-primary text-primary-foreground">Click</Button>
</div>
```

### Theme Customization
Edit `src/main.css` to customize colors:

```css
:root {
  --primary: oklch(0.5 0.2 250);
  --background: oklch(1 0 0);
  /* ... */
}
```

## 🗄️ Data Persistence

Use the Spark KV store for data persistence:

```typescript
import { useKV } from '@github/spark/hooks'

function MyComponent() {
  const [data, setData] = useKV('my-key', defaultValue)
  
  // Always use functional updates for reliability
  setData(current => ({ ...current, newField: 'value' }))
}
```

## 🚨 Error Handling

Built-in error boundary catches and displays errors gracefully:

- In **development**: Errors are re-thrown for better debugging
- In **production**: User-friendly error message with retry option

## 📱 Responsive Design

Mobile-first approach with breakpoint detection:

```typescript
import { useIsMobile } from '@/hooks/use-mobile'

function MyComponent() {
  const isMobile = useIsMobile()
  
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}
```

## 🔧 Troubleshooting

### Build fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tests failing
```bash
# Update snapshots (if using)
npm run test -- -u

# Check test output
npm run test:coverage
```

### Type errors
```bash
# Run type checker for detailed errors
npm run type-check
```

## 📚 Additional Resources

- [Spark Documentation](https://github.com/github/spark)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

## 🎯 What's Next?

Now that your template is set up, you can:

1. **Build Your Feature** - Start editing `src/App.tsx`
2. **Add Components** - Use shadcn components from `src/components/ui/`
3. **Write Tests** - Create `.test.tsx` files alongside your components
4. **Configure Theme** - Customize colors in `src/main.css`
5. **Deploy** - Build and deploy with `npm run build`

Happy coding! 🚀
