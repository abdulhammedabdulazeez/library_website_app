#!/usr/bin/env node
/**
 * Script to update library.html template with correct Vite asset paths
 * Reads the built assets and updates the template with hashed filenames
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../library_website_app/public/library/assets');
const templatePath = path.join(__dirname, '../library_website_app/www/library.html');

// Check if assets directory exists
if (!fs.existsSync(assetsDir)) {
  console.warn('⚠️  Assets directory not found. Skipping template update.');
  console.warn(`   Expected: ${assetsDir}`);
  process.exit(0);
}

// Check if template exists
if (!fs.existsSync(templatePath)) {
  console.warn('⚠️  Template not found. Skipping template update.');
  console.warn(`   Expected: ${templatePath}`);
  process.exit(0);
}

// Read built assets directory
const assets = fs.readdirSync(assetsDir);

// Find JS and CSS files
const jsFile = assets.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = assets.find(f => f.startsWith('index-') && f.endsWith('.css'));

if (!jsFile || !cssFile) {
  console.warn('⚠️  Could not find built assets. Skipping template update.');
  console.warn(`   Found files: ${assets.join(', ') || 'none'}`);
  process.exit(0);
}

// Read template
let template = fs.readFileSync(templatePath, 'utf8');

// Update JS file path (match any hashed filename)
const jsPattern = /src="\/assets\/library_website_app\/library\/assets\/index-[^"]+\.js"/;
if (jsPattern.test(template)) {
  template = template.replace(jsPattern, `src="/assets/library_website_app/library/assets/${jsFile}"`);
} else {
  console.warn('⚠️  Could not find JS asset pattern in template');
}

// Update CSS file path (match any hashed filename)
const cssPattern = /href="\/assets\/library_website_app\/library\/assets\/index-[^"]+\.css"/;
if (cssPattern.test(template)) {
  template = template.replace(cssPattern, `href="/assets/library_website_app/library/assets/${cssFile}"`);
} else {
  console.warn('⚠️  Could not find CSS asset pattern in template');
}

// Write updated template
fs.writeFileSync(templatePath, template, 'utf8');

console.log('✅ Updated library.html with asset paths:');
console.log(`   JS: ${jsFile}`);
console.log(`   CSS: ${cssFile}`);

