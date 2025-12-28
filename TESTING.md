# Testing Guide

This guide covers testing practices, patterns, and conventions for the Spark Template.

## Table of Contents
- [Overview](#overview)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Testing Patterns](#testing-patterns)
- [Coverage](#coverage)
- [Best Practices](#best-practices)

## Overview

The Spark Template uses:
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **jsdom** - Browser environment simulation
- **@testing-library/jest-dom** - Custom matchers

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test src/App.test.tsx

# Run tests matching a pattern
npm test -- --grep="counter"
```

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders with initial state', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

### Utility Function Tests

```typescript
import { describe, it, expect } from 'vitest'
import { myUtility } from './utils'

describe('myUtility', () => {
  it('handles valid input', () => {
    expect(myUtility('test')).toBe('expected')
  })

  it('handles edge cases', () => {
    expect(myUtility('')).toBe('')
    expect(myUtility(null)).toBe(null)
  })
})
```

### Testing Hooks

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from './useMyHook'

describe('useMyHook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe(defaultValue)
  })

  it('updates value on action', () => {
    const { result } = renderHook(() => useMyHook())
    act(() => {
      result.current.setValue('new value')
    })
    expect(result.current.value).toBe('new value')
  })
})
```

## Testing Patterns

### Querying Elements

```typescript
// By role (preferred - most accessible)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { level: 1 })

// By label text
screen.getByLabelText('Username')

// By text content
screen.getByText(/hello world/i)

// By test ID (use sparingly)
screen.getByTestId('custom-element')
```

### Async Testing

```typescript
import { waitFor } from '@testing-library/react'

it('loads data asynchronously', async () => {
  render(<AsyncComponent />)
  
  // Wait for element to appear
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
```

### User Events

```typescript
import { fireEvent } from '@testing-library/react'

// Click
fireEvent.click(button)

// Type into input
const input = screen.getByRole('textbox')
fireEvent.change(input, { target: { value: 'test' } })

// Submit form
fireEvent.submit(form)
```

### Testing Spark SDK

The Spark SDK is mocked in test environment (see `src/test/setup.ts`):

```typescript
// The mock is automatically available
it('uses spark.kv', async () => {
  // Mock returns are configured in setup.ts
  const value = await window.spark.kv.get('key')
  expect(value).toBe(undefined) // default mock behavior
})
```

To customize mocks per test:

```typescript
import { vi } from 'vitest'

it('tests custom spark behavior', async () => {
  const mockGet = vi.fn().mockResolvedValue({ data: 'test' })
  window.spark.kv.get = mockGet
  
  // Your test code
  await myFunction()
  
  expect(mockGet).toHaveBeenCalledWith('expected-key')
})
```

## Coverage

### Viewing Coverage

```bash
# Generate and view coverage
npm run test:coverage

# Open HTML report
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
```

### Coverage Thresholds

Configure in `vitest.config.ts`:

```typescript
coverage: {
  branches: 80,
  functions: 80,
  lines: 80,
  statements: 80,
}
```

### Coverage Exclusions

Automatically excluded:
- `node_modules/`
- Test files (`*.test.ts`, `*.test.tsx`)
- Config files
- Mock data
- Build output

## Best Practices

### ✅ Do

- **Test behavior, not implementation** - Test what users see and do
- **Use semantic queries** - Prefer `getByRole` over `getByTestId`
- **Keep tests focused** - One assertion per test when possible
- **Test edge cases** - Empty states, errors, boundary conditions
- **Use descriptive names** - Test names should explain the scenario
- **Arrange-Act-Assert** - Clear test structure

### ❌ Avoid

- **Testing internal state** - Don't test React state directly
- **Snapshot tests** - They're brittle and don't test behavior
- **Too many mocks** - Mock only external dependencies
- **Testing implementation details** - Test the public API
- **Overly complex tests** - Split complex scenarios into multiple tests

### Example: Good vs Bad

```typescript
// ❌ Bad - Tests implementation details
it('sets state correctly', () => {
  const { result } = renderHook(() => useState(0))
  act(() => result.current[1](1))
  expect(result.current[0]).toBe(1)
})

// ✅ Good - Tests user-facing behavior
it('increments counter when button clicked', () => {
  render(<Counter />)
  fireEvent.click(screen.getByRole('button', { name: /increment/i }))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

## Debugging Tests

### View what's rendered

```typescript
import { screen } from '@testing-library/react'

it('debug test', () => {
  render(<MyComponent />)
  screen.debug() // Prints the entire DOM
  screen.debug(screen.getByRole('button')) // Prints specific element
})
```

### Check why a query fails

```typescript
// Use getAllBy to see all matches
const buttons = screen.getAllByRole('button')
console.log(buttons) // See what's actually available
```

### Run single test

```bash
npm test -- --grep="specific test name"
```

## Continuous Integration

Tests run automatically on:
- Every push to any branch
- Every pull request
- Can be run manually via GitHub Actions

CI fails if:
- Any test fails
- Coverage drops below threshold
- TypeScript errors exist
- ESLint errors exist

## Additional Resources

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
