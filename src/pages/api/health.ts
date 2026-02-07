import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { version } from '../../../package.json';

interface CheckResult {
  name: string;
  status: 'healthy' | 'unhealthy';
  responseTime?: number;
  missing?: string[];
}

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: string;
  uptime: number;
  checks: CheckResult[];
}

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL'];

async function checkDatabase(): Promise<CheckResult> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      name: 'database',
      status: 'healthy',
      responseTime: Date.now() - start,
    };
  } catch {
    return {
      name: 'database',
      status: 'unhealthy',
      responseTime: Date.now() - start,
    };
  }
}

function checkEnvironment(): CheckResult {
  const missing = REQUIRED_ENV_VARS.filter((v) => !process.env[v]);

  if (missing.length === 0) {
    return { name: 'environment', status: 'healthy' };
  }

  return { name: 'environment', status: 'unhealthy', missing };
}

function aggregateStatus(checks: CheckResult[]): 'healthy' | 'degraded' | 'unhealthy' {
  const db = checks.find((c) => c.name === 'database');
  const env = checks.find((c) => c.name === 'environment');

  if (db?.status === 'unhealthy') return 'unhealthy';
  if (env?.status === 'unhealthy') return 'degraded';
  return 'healthy';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HealthResponse | { error: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const dbCheck = await checkDatabase();
  const envCheck = checkEnvironment();
  const checks = [dbCheck, envCheck];
  const status = aggregateStatus(checks);

  const statusCode = status === 'unhealthy' ? 503 : 200;

  return res.status(statusCode).json({
    status,
    version,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks,
  });
}
