#!/usr/bin/env node
/**
 * Replace standard Tailwind colors with brand-approved colors
 * This handles orange-*, yellow-*, and other default Tailwind colors
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Map standard Tailwind colors to brand colors
const replacements = [
  // Orange shades → Red shades
  { from: /tw-bg-orange-50/g, to: 'tw-bg-red-signal/10' },
  { from: /tw-border-orange-50/g, to: 'tw-border-red-signal/10' },
  { from: /tw-bg-orange-100/g, to: 'tw-bg-red-signal/20' },
  { from: /tw-bg-orange-200/g, to: 'tw-bg-red-signal/30' },
  { from: /tw-border-orange-200/g, to: 'tw-border-red-signal/30' },
  { from: /tw-bg-orange-300/g, to: 'tw-bg-red-signal' },
  { from: /tw-bg-orange-400/g, to: 'tw-bg-red' },
  { from: /tw-bg-orange-500/g, to: 'tw-bg-red' },
  { from: /tw-bg-orange-600/g, to: 'tw-bg-red' },
  { from: /tw-bg-orange-700/g, to: 'tw-bg-red-crimson' },
  { from: /tw-bg-orange-800/g, to: 'tw-bg-red-dark' },
  { from: /tw-bg-orange-900/g, to: 'tw-bg-red-maroon' },

  { from: /tw-text-orange-50/g, to: 'tw-text-red-signal/10' },
  { from: /tw-text-orange-100/g, to: 'tw-text-red-signal/20' },
  { from: /tw-text-orange-200/g, to: 'tw-text-red-signal/30' },
  { from: /tw-text-orange-300/g, to: 'tw-text-red-signal' },
  { from: /tw-text-orange-400/g, to: 'tw-text-red' },
  { from: /tw-text-orange-500/g, to: 'tw-text-red' },
  { from: /tw-text-orange-600/g, to: 'tw-text-red' },
  { from: /tw-text-orange-700/g, to: 'tw-text-red-crimson' },
  { from: /tw-text-orange-800/g, to: 'tw-text-red-dark' },
  { from: /tw-text-orange-900/g, to: 'tw-text-red-maroon' },

  { from: /hover:tw-bg-orange-700/g, to: 'hover:tw-bg-red-crimson' },
  { from: /hover:tw-text-orange-800/g, to: 'hover:tw-text-red-dark' },

  // Yellow shades → Gold shades
  { from: /tw-bg-yellow-50/g, to: 'tw-bg-gold-light/20' },
  { from: /tw-bg-yellow-100/g, to: 'tw-bg-gold-light/30' },
  { from: /tw-bg-yellow-200/g, to: 'tw-bg-gold-light' },
  { from: /tw-bg-yellow-300/g, to: 'tw-bg-gold-bright' },
  { from: /tw-bg-yellow-400/g, to: 'tw-bg-gold' },
  { from: /tw-bg-yellow-500/g, to: 'tw-bg-gold' },
  { from: /tw-bg-yellow-600/g, to: 'tw-bg-gold-rich' },
  { from: /tw-bg-yellow-700/g, to: 'tw-bg-gold-deep' },
  { from: /tw-bg-yellow-800/g, to: 'tw-bg-gold-deep' },

  { from: /tw-text-yellow-50/g, to: 'tw-text-gold-light/20' },
  { from: /tw-text-yellow-100/g, to: 'tw-text-gold-light/30' },
  { from: /tw-text-yellow-200/g, to: 'tw-text-gold-light' },
  { from: /tw-text-yellow-300/g, to: 'tw-text-gold-bright' },
  { from: /tw-text-yellow-400/g, to: 'tw-text-gold' },
  { from: /tw-text-yellow-500/g, to: 'tw-text-gold' },
  { from: /tw-text-yellow-600/g, to: 'tw-text-gold-rich' },
  { from: /tw-text-yellow-700/g, to: 'tw-text-gold-deep' },
  { from: /tw-text-yellow-800/g, to: 'tw-text-gold-deep' },

  { from: /tw-border-yellow-500/g, to: 'tw-border-gold' },

  // Green shades → Gold shades (for success states)
  { from: /tw-bg-green-50/g, to: 'tw-bg-gold-light/20' },
  { from: /tw-bg-green-100/g, to: 'tw-bg-gold-light/30' },
  { from: /tw-bg-green-500/g, to: 'tw-bg-gold' },
  { from: /tw-bg-green-600/g, to: 'tw-bg-gold-rich' },
  { from: /tw-text-green-600/g, to: 'tw-text-gold' },
  { from: /tw-text-green-700/g, to: 'tw-text-gold-rich' },
  { from: /tw-text-green-800/g, to: 'tw-text-gold-deep' },

  // Blue shades → Navy shades
  { from: /tw-bg-blue-50/g, to: 'tw-bg-navy-sky/20' },
  { from: /tw-bg-blue-100/g, to: 'tw-bg-navy-sky/30' },
  { from: /tw-bg-blue-500/g, to: 'tw-bg-navy-ocean' },
  { from: /tw-bg-blue-600/g, to: 'tw-bg-navy-royal' },
  { from: /tw-bg-blue-700/g, to: 'tw-bg-navy' },

  { from: /tw-text-blue-50/g, to: 'tw-text-navy-sky/20' },
  { from: /tw-text-blue-100/g, to: 'tw-text-navy-sky' },
  { from: /tw-text-blue-500/g, to: 'tw-text-navy-ocean' },
  { from: /tw-text-blue-600/g, to: 'tw-text-navy-royal' },
  { from: /tw-text-blue-700/g, to: 'tw-text-navy' },

  { from: /tw-border-blue-500/g, to: 'tw-border-navy-ocean' },
  { from: /tw-border-blue-600/g, to: 'tw-border-navy-royal' },

  // Purple/Indigo → Navy shades
  { from: /tw-bg-purple-50/g, to: 'tw-bg-navy-sky/20' },
  { from: /tw-bg-purple-500/g, to: 'tw-bg-navy-royal' },
  { from: /tw-bg-purple-600/g, to: 'tw-bg-navy' },
  { from: /tw-text-purple-600/g, to: 'tw-text-navy' },

  { from: /tw-bg-indigo-50/g, to: 'tw-bg-navy-sky/20' },
  { from: /tw-bg-indigo-500/g, to: 'tw-bg-navy-royal' },
  { from: /tw-bg-indigo-600/g, to: 'tw-bg-navy' },
  { from: /tw-text-indigo-600/g, to: 'tw-text-navy' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  replacements.forEach(({ from, to }) => {
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
  const files = execSync(
    `find ${dir} -type f \\( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \\) ! -path "*/node_modules/*" ! -path "*/.next/*"`,
    { encoding: 'utf8' }
  )
    .trim()
    .split('\n')
    .filter(Boolean);

  let modifiedCount = 0;
  const modifiedFiles = [];

  files.forEach((file) => {
    if (processFile(file)) {
      modifiedCount++;
      modifiedFiles.push(file);
    }
  });

  return { modifiedCount, modifiedFiles };
}

// Main execution
console.log('🎨 Replacing standard Tailwind colors with brand colors...\n');

const srcDir = path.join(process.cwd(), 'src');
const { modifiedCount, modifiedFiles } = findAndReplaceInDirectory(srcDir);

console.log(`\n✅ Updated ${modifiedCount} files\n`);

if (modifiedFiles.length > 0 && modifiedFiles.length <= 20) {
  console.log('Modified files:');
  modifiedFiles.forEach((file) => {
    console.log(`  - ${file.replace(process.cwd() + '/', '')}`);
  });
} else if (modifiedFiles.length > 20) {
  console.log(`Modified ${modifiedFiles.length} files (too many to list)`);
}

console.log('\n✨ Complete!\n');
