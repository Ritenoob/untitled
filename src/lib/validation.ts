export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validators = {
  isNonEmpty(value: string, fieldName = 'Field'): void {
    if (!value || value.trim().length === 0) {
      throw new ValidationError(`${fieldName} cannot be empty`);
    }
  },

  isEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new ValidationError('Invalid email address');
    }
  },

  isMinLength(value: string, minLength: number, fieldName = 'Field'): void {
    if (value.length < minLength) {
      throw new ValidationError(
        `${fieldName} must be at least ${minLength} characters`
      );
    }
  },

  isMaxLength(value: string, maxLength: number, fieldName = 'Field'): void {
    if (value.length > maxLength) {
      throw new ValidationError(
        `${fieldName} must be no more than ${maxLength} characters`
      );
    }
  },

  isInRange(value: number, min: number, max: number, fieldName = 'Value'): void {
    if (value < min || value > max) {
      throw new ValidationError(
        `${fieldName} must be between ${min} and ${max}`
      );
    }
  },

  isPositive(value: number, fieldName = 'Value'): void {
    if (value <= 0) {
      throw new ValidationError(`${fieldName} must be positive`);
    }
  },

  isInteger(value: number, fieldName = 'Value'): void {
    if (!Number.isInteger(value)) {
      throw new ValidationError(`${fieldName} must be an integer`);
    }
  },

  isUrl(value: string): void {
    try {
      new URL(value);
    } catch {
      throw new ValidationError('Invalid URL');
    }
  },

  matches(value: string, pattern: RegExp, fieldName = 'Field'): void {
    if (!pattern.test(value)) {
      throw new ValidationError(`${fieldName} format is invalid`);
    }
  },

  isOneOf<T>(value: T, allowedValues: T[], fieldName = 'Value'): void {
    if (!allowedValues.includes(value)) {
      throw new ValidationError(
        `${fieldName} must be one of: ${allowedValues.join(', ')}`
      );
    }
  },
};

export function sanitizeHtml(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
