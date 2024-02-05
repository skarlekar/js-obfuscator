const fs = require('fs');
const UglifyJS = require('uglify-js');

// Check if the correct number of command-line arguments is provided
if (process.argv.length !== 4) {
    console.error('Usage: node obfuscate.js <inputFileName> <outputFileName>');
    process.exit(1);
}

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];

// Read the HTML file
let html = fs.readFileSync(inputFileName, 'utf-8');

// Extract JavaScript code from the HTML
const scriptRegex = /<script>([\s\S]*?)<\/script>/gm;
let match;
let allJavaScriptCode = '';

while ((match = scriptRegex.exec(html)) !== null) {
    allJavaScriptCode += match[1];
}

// Obfuscate the JavaScript code
const obfuscatedCode = UglifyJS.minify(allJavaScriptCode, { mangle: true }).code;

// Replace the original JavaScript code with the obfuscated code in the HTML
html = html.replace(allJavaScriptCode, obfuscatedCode);

// Save the obfuscated HTML to a new file
fs.writeFileSync(outputFileName, html);

console.log(`JavaScript code obfuscated and saved to ${outputFileName}`);

