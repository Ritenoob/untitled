# ✨ Spark Template - Production Ready

[![CI Status](https://github.com/github/spark-template/workflows/CI/badge.svg)](https://github.com/github/spark-template/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A production-ready, enterprise-grade Spark template** with comprehensive testing, CI/CD, and quality tooling built-in.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Validate everything
npm run validate
```

Visit `http://localhost:5173` to see your app!

## ✨ What's Included

- ✅ **TypeScript 5.7** - Strict type safety
- ✅ **React 19.0** - Latest features
- ✅ **Vite 7.2** - Lightning-fast builds
- ✅ **Vitest** - Modern test framework
- ✅ **ESLint** - Code quality enforcement
- ✅ **GitHub Actions CI/CD** - Automated testing
- ✅ **45+ shadcn/ui components** - Beautiful pre-built UI
- ✅ **Tailwind CSS v4** - Utility-first styling
- ✅ **Production utilities** - Logging, validation, health checks

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Commands and patterns at a glance |
| **[PRD.md](PRD.md)** | Product requirements and design decisions |
| **[TESTING.md](TESTING.md)** | Comprehensive testing guide |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | How to contribute to this project |
| **[DELIVERABLES.md](DELIVERABLES.md)** | Full production readiness report |
| **[GIT_HOOKS.md](GIT_HOOKS.md)** | Set up pre-commit checks |

## 🧪 Testing

This template comes with a complete testing infrastructure:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Generate coverage report
```

## 🎨 UI Components

45+ pre-installed shadcn/ui components ready to use:

```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
```

## 🛠️ Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm test              # Run tests
npm run lint          # Check code quality
npm run type-check    # Verify TypeScript
npm run validate      # Run all checks
```

## 📦 Production Utilities

### Logger
```typescript
import { logger } from '@/lib/logger'
logger.info('User logged in', { userId: 123 })
```

### Validation
```typescript
import { validators } from '@/lib/validation'
validators.isEmail(email)
validators.isMinLength(password, 8)
```

### Health Check
```typescript
import { performHealthCheck } from '@/lib/healthcheck'
const health = await performHealthCheck()
```

## 🔄 CI/CD Pipeline

Every push triggers automated:
1. Lint checks
2. Type checking
3. Test suite
4. Production build

See `.github/workflows/ci.yml` for details.

## 📱 Demo Application

The template includes a simple counter demo showing:
- React state management
- shadcn/ui components
- Responsive design
- TypeScript types
- Test coverage

Replace `src/App.tsx` with your own code to get started.

## 🎯 What's Next?

1. **Explore** - Run `npm run dev` and check out the demo
2. **Read** - Check out `QUICK_REFERENCE.md` for common patterns
3. **Build** - Start editing `src/App.tsx`
4. **Test** - Write tests in `*.test.tsx` files
5. **Deploy** - Run `npm run build` when ready

## 🔒 Security

- Input validation built-in
- No secrets in code
- XSS prevention
- Dependency security scanning

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

**Ready to build something amazing?** Start with `npm run dev` 🚀
