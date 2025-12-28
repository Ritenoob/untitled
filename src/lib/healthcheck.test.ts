import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { performHealthCheck } from './healthcheck'

describe('healthcheck', () => {
  let originalSpark: typeof window.spark;

  beforeEach(() => {
    originalSpark = window.spark;
  });

  afterEach(() => {
    window.spark = originalSpark;
  });

  it('returns healthy status when all checks pass', async () => {
    const result = await performHealthCheck();
    
    expect(result.status).toBe('healthy');
    expect(result.checks.sparkSdk).toBe(true);
    expect(result.checks.localStorage).toBe(true);
    expect(result.checks.rendering).toBe(true);
  });

  it('includes timestamp', async () => {
    const result = await performHealthCheck();
    
    expect(result.timestamp).toBeDefined();
    expect(new Date(result.timestamp).getTime()).toBeGreaterThan(0);
  });

  it('includes version and environment', async () => {
    const result = await performHealthCheck();
    
    expect(result.version).toBe('1.0.0');
    expect(result.environment).toBeDefined();
  });

  it('detects missing Spark SDK', async () => {
    // @ts-expect-error - Testing error condition
    window.spark = undefined;
    
    const result = await performHealthCheck();
    
    expect(result.status).toBe('unhealthy');
    expect(result.checks.sparkSdk).toBe(false);
  });
})
