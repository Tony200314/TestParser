const fs = require('fs');
const axios = require('axios');

/**
 * Convert a BibTeX file to JSON by sending it to JabRef.
 * @param {string} inputFile - The path to the input BibTeX file.
 * @param {string} outputFile - The path to the output JSON file.
 * @param {string} jabrefUrl - The URL of the JabRef API endpoint.
 */
async function convertBibtexToJson(inputFile, outputFile, jabrefUrl) {
    try {
        // Check if the input file exists
        if (!fs.existsSync(inputFile)) {
            throw new Error('Die Eingabedatei existiert nicht.');
        }

        // Read the BibTeX file
        const bibtexStr = fs.readFileSync(inputFile, 'utf8');
        console.log('📂 BibTeX-Datei erfolgreich eingelesen.');

        // Send the BibTeX data to JabRef
        console.log('📤 Sende Daten an JabRef...');
        const response = await axios.post(jabrefUrl, { bibtex: bibtexStr }, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Check if the response is valid
        if (response.status !== 200) {
            throw new Error(`Fehler bei der Anfrage: ${response.statusText}`);
        }

        console.log('📥 Antwort von JabRef erhalten.');

        // Write the JSON response to the output file
        fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2));
        console.log('✅ JSON-Datei erfolgreich erstellt:', outputFile);
    } catch (error) {
        console.error('❌ Fehler:', error.message);
    }
}
