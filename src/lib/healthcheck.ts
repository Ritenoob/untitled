export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  checks: {
    sparkSdk: boolean;
    localStorage: boolean;
    rendering: boolean;
  };
  version: string;
  environment: string;
}

export async function performHealthCheck(): Promise<HealthCheckResult> {
  const checks = {
    sparkSdk: checkSparkSdk(),
    localStorage: checkLocalStorage(),
    rendering: checkRendering(),
  };

  const allHealthy = Object.values(checks).every(check => check === true);

  return {
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks,
    version: '1.0.0',
    environment: import.meta.env.MODE || 'production',
  };
}

function checkSparkSdk(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      typeof window.spark !== 'undefined' &&
      typeof window.spark.kv !== 'undefined' &&
      typeof window.spark.llm !== 'undefined'
    );
  } catch {
    return false;
  }
}

function checkLocalStorage(): boolean {
  try {
    const testKey = '__spark_health_check__';
    localStorage.setItem(testKey, 'test');
    const value = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return value === 'test';
  } catch {
    return false;
  }
}

function checkRendering(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined' &&
      document.getElementById('root') !== null
    );
  } catch {
    return false;
  }
}
