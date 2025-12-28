# Git Hooks Setup (Optional but Recommended)

Git hooks can automatically run quality checks before commits and pushes to catch issues early.

## Option 1: Manual Git Hooks (Lightweight)

### Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Pre-commit hook - runs validation before each commit

echo "🔍 Running pre-commit checks..."

# Run validation
npm run validate

if [ $? -ne 0 ]; then
    echo "❌ Pre-commit checks failed. Commit aborted."
    echo "Fix the issues above or use 'git commit --no-verify' to skip checks."
    exit 1
fi

echo "✅ Pre-commit checks passed!"
exit 0
```

### Pre-push Hook

Create `.git/hooks/pre-push`:

```bash
#!/bin/bash
# Pre-push hook - runs tests before push

echo "🧪 Running pre-push tests..."

# Run full test suite
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Push aborted."
    echo "Fix the failing tests or use 'git push --no-verify' to skip checks."
    exit 1
fi

echo "✅ Tests passed!"
exit 0
```

### Installation

```bash
# Make hooks executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

## Option 2: Husky (Automated)

If your team wants automated hook management, install Husky:

```bash
# Install Husky
npm install -D husky

# Enable Git hooks
npx husky init

# Add pre-commit hook
echo "npm run validate" > .husky/pre-commit

# Add pre-push hook
echo "npm test" > .husky/pre-push

# Make executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

## Option 3: Pre-commit Framework

For more advanced setups, use the `pre-commit` framework:

1. Install: `pip install pre-commit`
2. Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: local
    hooks:
      - id: validate
        name: Run validation
        entry: npm run validate
        language: system
        pass_filenames: false
      - id: test
        name: Run tests
        entry: npm test
        language: system
        pass_filenames: false
        stages: [push]
```

3. Install hooks: `pre-commit install`

## What Gets Checked

### Pre-commit (on every commit)
- ✅ TypeScript type checking
- ✅ ESLint validation
- ✅ Unit tests
- ✅ Test coverage

### Pre-push (before pushing)
- ✅ Full test suite
- ✅ Build verification

## Bypassing Hooks (Use Sparingly)

```bash
# Skip pre-commit checks
git commit --no-verify -m "message"

# Skip pre-push checks
git push --no-verify
```

⚠️ **Warning**: Only bypass hooks when absolutely necessary. CI/CD will still catch issues.

## CI/CD is Your Safety Net

Even if local hooks are bypassed, the GitHub Actions CI pipeline will:
1. Run all checks on every push
2. Block PRs with failing checks
3. Prevent merging broken code

So local hooks are a **convenience feature**, not a security requirement.

## Recommended Setup for Teams

1. **Small teams**: Manual git hooks (Option 1)
2. **Medium teams**: Husky (Option 2)
3. **Large teams**: Pre-commit framework (Option 3)

## Troubleshooting

### Hooks not running?
```bash
# Check if hooks are executable
ls -la .git/hooks/

# Make executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

### Hooks taking too long?
```bash
# Run only lint and type-check (skip tests)
npm run lint && npm run type-check
```

### Want to remove hooks?
```bash
# Remove specific hook
rm .git/hooks/pre-commit

# Or disable by renaming
mv .git/hooks/pre-commit .git/hooks/pre-commit.disabled
```
