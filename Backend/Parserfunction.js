// filepath: c:\wichtigtony\Testparser\TestParser\Backend\Parserfunction.js
const fs = require('fs');
const bibtexParse = require('bibtex-parse');

/**
 * Convert a BibTeX file to JSON using bibtex-parse.
 * @param {string} inputFile - The path to the input BibTeX file.
 * @param {string} outputFile - The path to the output JSON file.
 */
function convertBibtexToJson(inputFile, outputFile) {
    if (!fs.existsSync(inputFile)) {
        console.error('❌ Die Eingabedatei existiert nicht.');
        return;
    }
    try {
        const bibtexStr = fs.readFileSync(inputFile, 'utf8');
        const parsed = bibtexParse.entries(bibtexStr);
        fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
        console.log('✅ JSON-Datei erfolgreich erstellt:', outputFile);
    } catch (error) {
        console.error('❌ Fehler beim Parsen:', error.message);
    }
}

// Beispielaufruf:
convertBibtexToJson('TestParser/Backend/testfile.bibtex', 'TestParser/Backend/test.json');