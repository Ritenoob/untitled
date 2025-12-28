# Contributing to Spark Template

Thank you for considering contributing to the Spark Template! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/spark-template.git
   cd spark-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write code following existing patterns
   - Add tests for new functionality
   - Update documentation as needed

5. **Run validation**
   ```bash
   npm run validate
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Standards

### TypeScript
- Use strict type checking
- Avoid `any` types unless absolutely necessary
- Export types and interfaces when they're reusable

### React
- Use functional components with hooks
- Keep components focused and single-purpose
- Use proper TypeScript types for props

### Testing
- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive test names

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Pull Request Process

1. Ensure all tests pass (`npm test`)
2. Ensure linting passes (`npm run lint`)
3. Ensure type checking passes (`npm run type-check`)
4. Update README.md if needed
5. Update PRD.md if changing functionality
6. Request review from maintainers

## Code Review Guidelines

Reviewers will check for:
- Code quality and readability
- Test coverage
- TypeScript type safety
- Documentation completeness
- Performance considerations
- Security implications

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

Thank you for contributing! 🎉
