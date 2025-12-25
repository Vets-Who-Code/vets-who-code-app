#!/usr/bin/env node
/**
 * Replace deprecated colors with brand-approved colors
 * Run with: node scripts/replace-deprecated-colors.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color replacement mappings
const colorReplacements = [
  // Orange → Red or Gold (context-dependent, defaulting to red for CTAs)
  { from: /tw-bg-orange(?!-)/g, to: 'tw-bg-red' },
  { from: /tw-text-orange(?!-)/g, to: 'tw-text-red' },
  { from: /tw-border-orange(?!-)/g, to: 'tw-border-red' },
  { from: /tw-bg-orange-light/g, to: 'tw-bg-red-signal/10' },
  { from: /tw-bg-orange-100/g, to: 'tw-bg-red-signal' },
  { from: /tw-bg-orange-200/g, to: 'tw-bg-red-signal' },
  { from: /tw-bg-orange-300/g, to: 'tw-bg-red' },
  { from: /tw-text-orange-100/g, to: 'tw-text-red-signal' },
  { from: /tw-text-orange-200/g, to: 'tw-text-red-signal' },
  { from: /tw-text-orange-300/g, to: 'tw-text-red' },

  // Yellow → Gold
  { from: /tw-bg-yellow(?!-)/g, to: 'tw-bg-gold' },
  { from: /tw-text-yellow(?!-)/g, to: 'tw-text-gold' },
  { from: /tw-border-yellow(?!-)/g, to: 'tw-border-gold' },
  { from: /tw-bg-yellow-100/g, to: 'tw-bg-gold-bright' },
  { from: /tw-text-yellow-100/g, to: 'tw-text-gold-bright' },

  // Blue-100 → Navy ocean or sky
  { from: /tw-bg-blue-100/g, to: 'tw-bg-navy-sky' },
  { from: /tw-text-blue-100/g, to: 'tw-text-navy-ocean' },
  { from: /tw-border-blue-100/g, to: 'tw-border-navy-ocean' },

  // Spring → Cream
  { from: /tw-bg-spring/g, to: 'tw-bg-cream' },
  { from: /tw-text-spring/g, to: 'tw-text-cream' },

  // Desert → Red (it was using red anyway)
  { from: /tw-bg-desert(?!-)/g, to: 'tw-bg-red' },
  { from: /tw-text-desert(?!-)/g, to: 'tw-text-red' },
  { from: /tw-border-desert(?!-)/g, to: 'tw-border-red' },
  { from: /tw-bg-desert-100/g, to: 'tw-bg-cream' },

  // Pearl → Cream
  { from: /tw-bg-pearl/g, to: 'tw-bg-cream' },
  { from: /tw-text-pearl/g, to: 'tw-text-cream' },

  // Putty → Gold
  { from: /tw-bg-putty/g, to: 'tw-bg-gold' },
  { from: /tw-text-putty/g, to: 'tw-text-gold' },

  // Brunt → Red
  { from: /tw-bg-brunt/g, to: 'tw-bg-red' },
  { from: /tw-text-brunt/g, to: 'tw-text-red' },

  // Jagged → Navy sky
  { from: /tw-bg-jagged/g, to: 'tw-bg-navy-sky' },
  { from: /tw-text-jagged/g, to: 'tw-text-navy-sky' },

  // Azure → Navy ocean
  { from: /tw-bg-azure/g, to: 'tw-bg-navy-ocean' },
  { from: /tw-text-azure/g, to: 'tw-text-navy-ocean' },
  { from: /tw-border-azure/g, to: 'tw-border-navy-ocean' },

  // Alto → Gray-100 (Silver)
  { from: /tw-bg-alto/g, to: 'tw-bg-gray-100' },
  { from: /tw-border-alto/g, to: 'tw-border-gray-100' },

  // Teracotta → Red or Gold (defaulting to red)
  { from: /tw-bg-teracotta(?!-)/g, to: 'tw-bg-red' },
  { from: /tw-text-teracotta(?!-)/g, to: 'tw-text-red' },
  { from: /tw-bg-teracotta-light/g, to: 'tw-bg-red-signal/10' },

  // Scooter → Navy ocean
  { from: /tw-bg-scooter(?!-)/g, to: 'tw-bg-navy-ocean' },
  { from: /tw-text-scooter(?!-)/g, to: 'tw-text-navy-ocean' },
  { from: /tw-bg-scooter-light/g, to: 'tw-bg-navy-sky' },

  // Ebb → Cream or Gray-50
  { from: /tw-bg-ebb/g, to: 'tw-bg-gray-50' },

  // Pampas → Cream
  { from: /tw-bg-pampas/g, to: 'tw-bg-cream' },

  // Gore → Navy
  { from: /tw-bg-gore/g, to: 'tw-bg-navy' },
  { from: /tw-text-gore/g, to: 'tw-text-navy' },

  // Porsche → Gold
  { from: /tw-bg-porsche/g, to: 'tw-bg-gold' },
  { from: /tw-text-porsche/g, to: 'tw-text-gold' },

  // Mandy → Red
  { from: /tw-bg-mandy/g, to: 'tw-bg-red' },
  { from: /tw-text-mandy/g, to: 'tw-text-red' },

  // Tan → Gold or Cream
  { from: /tw-bg-tan/g, to: 'tw-bg-gold-light' },
  { from: /tw-text-tan/g, to: 'tw-text-gold' },

  // Mishcka → Gray-100
  { from: /tw-bg-mishcka/g, to: 'tw-bg-gray-100' },
  { from: /tw-text-mishcka/g, to: 'tw-text-gray-200' },

  // Old gray scale replacements
  { from: /tw-bg-gray-350/g, to: 'tw-bg-gray-100' },
  { from: /tw-border-gray-350/g, to: 'tw-border-gray-100' },
  { from: /tw-bg-gray-450/g, to: 'tw-bg-gray-50' },
  { from: /tw-bg-gray-500/g, to: 'tw-bg-gray-50' },
  { from: /tw-bg-gray-550/g, to: 'tw-bg-gray-50' },
  { from: /tw-bg-gray-600/g, to: 'tw-bg-gray-300' },
  { from: /tw-text-gray-600/g, to: 'tw-text-gray-300' },
  { from: /tw-bg-gray-650/g, to: 'tw-bg-gray-100' },
  { from: /tw-border-gray-650/g, to: 'tw-border-gray-100' },
  { from: /tw-bg-gray-700/g, to: 'tw-bg-gray-200' },
  { from: /tw-text-gray-700/g, to: 'tw-text-gray-200' },
  { from: /tw-bg-gray-750/g, to: 'tw-bg-gray-50' },
  { from: /tw-bg-gray-800/g, to: 'tw-bg-gray-400' },
  { from: /tw-text-gray-800/g, to: 'tw-text-gray-400' },
  { from: /tw-bg-gray-850/g, to: 'tw-bg-gray-300' },
  { from: /tw-text-gray-850/g, to: 'tw-text-gray-300' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  colorReplacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  return false;
}

function findAndReplaceInDirectory(dir) {
  const files = execSync(`find ${dir} -type f \\( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \\) ! -path "*/node_modules/*" ! -path "*/.next/*"`, {
    encoding: 'utf8',
  }).trim().split('\n').filter(Boolean);

  let modifiedCount = 0;
  const modifiedFiles = [];

  files.forEach(file => {
    if (processFile(file)) {
      modifiedCount++;
      modifiedFiles.push(file);
    }
  });

  return { modifiedCount, modifiedFiles };
}

// Main execution
console.log('🎨 Starting color replacement...\n');

const srcDir = path.join(process.cwd(), 'src');
const { modifiedCount, modifiedFiles } = findAndReplaceInDirectory(srcDir);

console.log(`\n✅ Replaced deprecated colors in ${modifiedCount} files\n`);

if (modifiedFiles.length > 0 && modifiedFiles.length <= 20) {
  console.log('Modified files:');
  modifiedFiles.forEach(file => {
    console.log(`  - ${file.replace(process.cwd() + '/', '')}`);
  });
} else if (modifiedFiles.length > 20) {
  console.log(`Modified ${modifiedFiles.length} files (too many to list)`);
}

console.log('\n✨ Color replacement complete!\n');
