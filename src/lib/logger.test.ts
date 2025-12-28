import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger } from './logger'

describe('logger', () => {
  let consoleDebugSpy: ReturnType<typeof vi.spyOn>;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs debug messages', () => {
    logger.setMinLevel('debug');
    logger.debug('Test debug message');
    expect(consoleDebugSpy).toHaveBeenCalled();
  });

  it('logs info messages', () => {
    logger.info('Test info message');
    expect(consoleInfoSpy).toHaveBeenCalled();
  });

  it('logs warning messages', () => {
    logger.warn('Test warning message');
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('logs error messages', () => {
    logger.error('Test error message');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('includes context in log messages', () => {
    logger.info('Test with context', { userId: 123, action: 'login' });
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining('userId')
    );
  });

  it('respects minimum log level', () => {
    logger.setMinLevel('warn');
    logger.debug('Should not log');
    logger.info('Should not log');
    logger.warn('Should log');
    
    expect(consoleDebugSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('formats timestamp in ISO format', () => {
    logger.info('Test timestamp');
    const call = consoleInfoSpy.mock.calls[0][0] as string;
    expect(call).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
})
