#!/usr/bin/env node

/**
 * GitHub OAuth Configuration Verification Script
 *
 * This script verifies your GitHub OAuth setup for production deployment.
 * Run this before deploying to catch configuration issues early.
 *
 * Usage:
 *   node scripts/verify-github-oauth.js
 *
 * Or with environment:
 *   node scripts/verify-github-oauth.js production
 */

const https = require('https');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const environment = process.argv[2] || 'development';

console.log(`\n${colors.cyan}================================${colors.reset}`);
console.log(`${colors.cyan}GitHub OAuth Configuration Check${colors.reset}`);
console.log(`${colors.cyan}================================${colors.reset}\n`);
console.log(`${icons.info} Environment: ${colors.blue}${environment}${colors.reset}\n`);

let errorCount = 0;
let warningCount = 0;

function success(message) {
  console.log(`${icons.success} ${colors.green}${message}${colors.reset}`);
}

function error(message) {
  console.log(`${icons.error} ${colors.red}${message}${colors.reset}`);
  errorCount++;
}

function warning(message) {
  console.log(`${icons.warning} ${colors.yellow}${message}${colors.reset}`);
  warningCount++;
}

function info(message) {
  console.log(`${icons.info} ${colors.cyan}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    }).on('error', reject);
  });
}

async function verifyConfiguration() {
  console.log(`${colors.blue}1. Checking Environment Variables${colors.reset}`);
  console.log('─'.repeat(50));

  // Check required environment variables
  const requiredVars = [
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ];

  const optionalVars = [
    'GITHUB_ORG',
  ];

  let allVarsPresent = true;

  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      const maskedValue = varName.includes('SECRET')
        ? '***' + process.env[varName].slice(-4)
        : process.env[varName];
      success(`${varName}: ${maskedValue}`);
    } else {
      error(`${varName} is not set`);
      allVarsPresent = false;
    }
  });

  optionalVars.forEach(varName => {
    if (process.env[varName]) {
      success(`${varName}: ${process.env[varName]}`);
    } else {
      warning(`${varName} is not set (optional but recommended for production)`);
    }
  });

  console.log('');

  if (!allVarsPresent) {
    return;
  }

  // Validate NEXTAUTH_URL format
  console.log(`${colors.blue}2. Validating Configuration${colors.reset}`);
  console.log('─'.repeat(50));

  const nextauthUrl = process.env.NEXTAUTH_URL;
  if (!nextauthUrl.startsWith('http://') && !nextauthUrl.startsWith('https://')) {
    error('NEXTAUTH_URL must start with http:// or https://');
  } else {
    success('NEXTAUTH_URL has valid format');
  }

  // Check callback URL format
  const callbackUrl = `${nextauthUrl}/api/auth/callback/github`;
  info(`Expected callback URL: ${callbackUrl}`);
  info('Make sure this matches your GitHub OAuth App settings!');

  // Warn about production URL
  if (environment === 'production' && nextauthUrl.includes('localhost')) {
    warning('NEXTAUTH_URL contains localhost but environment is production');
  } else if (environment === 'development' && !nextauthUrl.includes('localhost')) {
    warning('NEXTAUTH_URL does not contain localhost but environment is development');
  } else {
    success('NEXTAUTH_URL matches environment');
  }

  console.log('');

  // Check NEXTAUTH_SECRET strength
  console.log(`${colors.blue}3. Security Checks${colors.reset}`);
  console.log('─'.repeat(50));

  const secret = process.env.NEXTAUTH_SECRET;
  if (secret.length < 32) {
    warning('NEXTAUTH_SECRET is shorter than 32 characters (run: openssl rand -base64 32)');
  } else {
    success('NEXTAUTH_SECRET has sufficient length');
  }

  if (secret === 'your-secret-key-here' || secret === 'change-me') {
    error('NEXTAUTH_SECRET is using a default/example value');
  } else {
    success('NEXTAUTH_SECRET is not a default value');
  }

  console.log('');

  // Test GitHub API access (if possible)
  console.log(`${colors.blue}4. GitHub API Connection${colors.reset}`);
  console.log('─'.repeat(50));

  try {
    const clientId = process.env.GITHUB_CLIENT_ID;

    // Check if the client ID looks valid
    if (clientId.length < 20) {
      warning('GITHUB_CLIENT_ID seems too short (should be ~20 characters)');
    } else {
      success('GITHUB_CLIENT_ID has expected length');
    }

    // Test GitHub API availability
    const response = await makeRequest('https://api.github.com', {
      headers: {
        'User-Agent': 'VetsWhoCode-OAuth-Verifier'
      }
    });

    if (response.status === 200) {
      success('GitHub API is reachable');
    } else {
      warning(`GitHub API returned status ${response.status}`);
    }

  } catch (err) {
    error(`Failed to connect to GitHub API: ${err.message}`);
  }

  console.log('');

  // Check organization membership (if GITHUB_ORG is set)
  if (process.env.GITHUB_ORG) {
    console.log(`${colors.blue}5. GitHub Organization Check${colors.reset}`);
    console.log('─'.repeat(50));

    const org = process.env.GITHUB_ORG;
    info(`Organization configured: ${org}`);
    info(`In production, only members of ${org} can sign in`);
    info('(plus hardcoded admin: jeromehardaway)');

    console.log('');
  }

  // Summary
  console.log(`${colors.cyan}================================${colors.reset}`);
  console.log(`${colors.cyan}Summary${colors.reset}`);
  console.log(`${colors.cyan}================================${colors.reset}\n`);

  if (errorCount === 0 && warningCount === 0) {
    success('All checks passed! Your GitHub OAuth is properly configured.');
  } else {
    if (errorCount > 0) {
      error(`Found ${errorCount} error(s) that must be fixed`);
    }
    if (warningCount > 0) {
      warning(`Found ${warningCount} warning(s) that should be reviewed`);
    }
  }

  console.log('');

  // Next steps
  console.log(`${colors.blue}Next Steps:${colors.reset}`);
  console.log('─'.repeat(50));
  console.log('1. Create GitHub OAuth App at: https://github.com/settings/developers');
  console.log(`2. Set callback URL to: ${callbackUrl}`);
  console.log('3. Add environment variables to Vercel project settings');
  console.log('4. Deploy and test sign-in functionality');
  console.log('');

  process.exit(errorCount > 0 ? 1 : 0);
}

// Run verification
verifyConfiguration().catch(err => {
  console.error(`${icons.error} ${colors.red}Unexpected error: ${err.message}${colors.reset}`);
  process.exit(1);
});
