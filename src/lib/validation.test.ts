import { describe, it, expect } from 'vitest'
import { validators, ValidationError, sanitizeHtml, sanitizeInput, isValidJson } from './validation'

describe('validators', () => {
  describe('isNonEmpty', () => {
    it('passes for non-empty strings', () => {
      expect(() => validators.isNonEmpty('test')).not.toThrow();
    });

    it('throws for empty strings', () => {
      expect(() => validators.isNonEmpty('')).toThrow(ValidationError);
      expect(() => validators.isNonEmpty('   ')).toThrow(ValidationError);
    });
  });

  describe('isEmail', () => {
    it('passes for valid emails', () => {
      expect(() => validators.isEmail('test@example.com')).not.toThrow();
      expect(() => validators.isEmail('user.name@domain.co.uk')).not.toThrow();
    });

    it('throws for invalid emails', () => {
      expect(() => validators.isEmail('invalid')).toThrow(ValidationError);
      expect(() => validators.isEmail('test@')).toThrow(ValidationError);
      expect(() => validators.isEmail('@example.com')).toThrow(ValidationError);
    });
  });

  describe('isMinLength', () => {
    it('passes for strings meeting minimum length', () => {
      expect(() => validators.isMinLength('test', 4)).not.toThrow();
      expect(() => validators.isMinLength('testing', 4)).not.toThrow();
    });

    it('throws for strings below minimum length', () => {
      expect(() => validators.isMinLength('ab', 4)).toThrow(ValidationError);
    });
  });

  describe('isMaxLength', () => {
    it('passes for strings within maximum length', () => {
      expect(() => validators.isMaxLength('test', 10)).not.toThrow();
    });

    it('throws for strings exceeding maximum length', () => {
      expect(() => validators.isMaxLength('very long string', 5)).toThrow(ValidationError);
    });
  });

  describe('isInRange', () => {
    it('passes for values within range', () => {
      expect(() => validators.isInRange(5, 1, 10)).not.toThrow();
      expect(() => validators.isInRange(1, 1, 10)).not.toThrow();
      expect(() => validators.isInRange(10, 1, 10)).not.toThrow();
    });

    it('throws for values outside range', () => {
      expect(() => validators.isInRange(0, 1, 10)).toThrow(ValidationError);
      expect(() => validators.isInRange(11, 1, 10)).toThrow(ValidationError);
    });
  });

  describe('isPositive', () => {
    it('passes for positive numbers', () => {
      expect(() => validators.isPositive(1)).not.toThrow();
      expect(() => validators.isPositive(0.1)).not.toThrow();
    });

    it('throws for zero and negative numbers', () => {
      expect(() => validators.isPositive(0)).toThrow(ValidationError);
      expect(() => validators.isPositive(-1)).toThrow(ValidationError);
    });
  });

  describe('isInteger', () => {
    it('passes for integers', () => {
      expect(() => validators.isInteger(5)).not.toThrow();
      expect(() => validators.isInteger(-10)).not.toThrow();
    });

    it('throws for non-integers', () => {
      expect(() => validators.isInteger(5.5)).toThrow(ValidationError);
      expect(() => validators.isInteger(0.1)).toThrow(ValidationError);
    });
  });

  describe('isUrl', () => {
    it('passes for valid URLs', () => {
      expect(() => validators.isUrl('https://example.com')).not.toThrow();
      expect(() => validators.isUrl('http://localhost:3000')).not.toThrow();
    });

    it('throws for invalid URLs', () => {
      expect(() => validators.isUrl('not a url')).toThrow(ValidationError);
      expect(() => validators.isUrl('example.com')).toThrow(ValidationError);
    });
  });

  describe('matches', () => {
    it('passes for matching patterns', () => {
      expect(() => validators.matches('abc123', /^[a-z0-9]+$/)).not.toThrow();
    });

    it('throws for non-matching patterns', () => {
      expect(() => validators.matches('ABC', /^[a-z]+$/)).toThrow(ValidationError);
    });
  });

  describe('isOneOf', () => {
    it('passes for allowed values', () => {
      expect(() => validators.isOneOf('red', ['red', 'blue', 'green'])).not.toThrow();
    });

    it('throws for disallowed values', () => {
      expect(() => validators.isOneOf('yellow', ['red', 'blue', 'green'])).toThrow(ValidationError);
    });
  });
});

describe('sanitizeHtml', () => {
  it('escapes HTML tags', () => {
    expect(sanitizeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert("xss")&lt;/script&gt;'
    );
  });

  it('preserves plain text', () => {
    expect(sanitizeHtml('Hello World')).toBe('Hello World');
  });
});

describe('sanitizeInput', () => {
  it('removes angle brackets', () => {
    expect(sanitizeInput('Hello <world>')).toBe('Hello world');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  test  ')).toBe('test');
  });
});

describe('isValidJson', () => {
  it('returns true for valid JSON', () => {
    expect(isValidJson('{"key": "value"}')).toBe(true);
    expect(isValidJson('[1, 2, 3]')).toBe(true);
  });

  it('returns false for invalid JSON', () => {
    expect(isValidJson('not json')).toBe(false);
    expect(isValidJson('{invalid}')).toBe(false);
  });
});
