const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Check if the command line arguments are provided correctly
if (process.argv.length !== 4) {
    console.log('Usage: node obfuscate.js <inputFilePath> <outputFilePath>');
    process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

// Read the JavaScript code from the input file
fs.readFile(inputFilePath, 'utf-8', (err, code) => {
    if (err) {
        console.error(`Error reading input file: ${err.message}`);
        process.exit(1);
    }

    // Obfuscate the code
    const obfuscatedResult = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        stringArray: true,
        stringArrayThreshold: 0.75
    });

    // Get the obfuscated code as a string
    const obfuscatedCode = obfuscatedResult.getObfuscatedCode();

    //console.log(obfuscatedCode);

    // Convert the obfuscated code to a Buffer
    const obfuscatedBuffer = Buffer.from(obfuscatedCode);

    // Write the obfuscated code buffer to the output file
    fs.writeFile(outputFilePath, obfuscatedBuffer, (err) => {
        if (err) {
            console.error(`Error writing obfuscated code to output file: ${err.message}`);
            process.exit(1);
        }
        console.log(`JavaScript code obfuscated and saved to ${outputFilePath}`);
    });
});
