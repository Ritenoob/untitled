# 🚀 Quick Reference Card

## 📦 Setup (First Time)
```bash
npm install
cp .env.example .env  # Optional
npm run validate      # Verify everything works
```

## 🛠️ Development
```bash
npm run dev           # Start dev server (http://localhost:5173)
npm run test:watch    # Run tests in watch mode
```

## ✅ Before Committing
```bash
npm run validate      # Run ALL checks (lint + type-check + test)
```

## 🧪 Testing
```bash
npm test                 # Run all tests once
npm run test:coverage    # Generate coverage report
npm test App.test.tsx    # Run specific test file
```

## 🔍 Quality Checks
```bash
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors
npm run type-check    # Check TypeScript types
```

## 🏗️ Build
```bash
npm run build         # Build for production
npm run preview       # Preview production build
```

## 📁 Project Structure
```
src/
├── components/ui/    # 45+ shadcn components
├── hooks/            # Custom React hooks
├── lib/              # Utilities (logger, validation, etc.)
├── test/             # Test setup
├── App.tsx           # Main app component
└── main.tsx          # Entry point (don't edit)
```

## 🎨 Key Components
```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useKV } from '@github/spark/hooks'
import { logger } from '@/lib/logger'
```

## 🗄️ Data Persistence
```typescript
const [data, setData] = useKV('key', defaultValue)

// ALWAYS use functional updates
setData(current => ({ ...current, field: 'value' }))
```

## 📝 Logging
```typescript
import { logger } from '@/lib/logger'

logger.debug('Debug message', { context: 'data' })
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message', { error: 'details' })
```

## ✔️ Validation
```typescript
import { validators } from '@/lib/validation'

validators.isNonEmpty(value, 'Username')
validators.isEmail(email)
validators.isMinLength(password, 8, 'Password')
validators.isUrl(url)
```

## 🏥 Health Check
```typescript
import { performHealthCheck } from '@/lib/healthcheck'

const health = await performHealthCheck()
console.log(health.status) // 'healthy' | 'unhealthy'
```

## 🧪 Writing Tests
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## 🎨 Styling
```tsx
// Tailwind utilities
<div className="flex items-center gap-4 p-4">

// Theme colors
<div className="bg-background text-foreground">
<Button className="bg-primary text-primary-foreground">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2">
```

## 🔧 Common Issues

### Build fails?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tests failing?
```bash
npm run test:coverage  # See detailed output
```

### Type errors?
```bash
npm run type-check     # See specific errors
```

## 📚 Documentation
- **README-NEW.md** - Full setup guide
- **PRD.md** - Product requirements
- **TESTING.md** - Testing guide
- **CONTRIBUTING.md** - How to contribute
- **GIT_HOOKS.md** - Pre-commit setup

## 🚨 Need Help?
1. Check documentation files above
2. Run `npm run validate` to diagnose
3. Check CI/CD logs in GitHub Actions
4. Open an issue with details

## 💡 Pro Tips
- Use `npm run validate` before every commit
- Write tests alongside your code
- Keep components small and focused
- Use TypeScript types everywhere
- Check coverage with `npm run test:coverage`

## 🎯 CI/CD Status
Push to any branch triggers:
1. Lint check
2. Type check
3. Test suite
4. Build verification

All must pass for PR merge.
