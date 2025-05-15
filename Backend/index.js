const fs = require('fs'); // Importiert das Node.js-Modul zum Lesen und Schreiben von Dateien
const bibtexParse = require('@orcid/bibtex-parse-js'); // Importiert die BibTeX-Parser-Bibliothek

/**
 * Konvertiert eine BibTeX-Datei in eine JSON-Datei
 * @param {string} inputFile - Pfad zur BibTeX-Datei (Eingabe)
 * @param {string} outputFile - Pfad zur JSON-Datei (Ausgabe)
 */
function convertBibtexToJson(inputFile, outputFile) {
    try {
        // Liest die gesamte BibTeX-Datei als Text (UTF-8)
        const bibtexStr = fs.readFileSync(inputFile, 'utf8');

        // Parst den BibTeX-Text in ein JavaScript-Objekt
        const parsed = bibtexParse.toJSON(bibtexStr);

        // Speichert das Ergebnis als formatiertes JSON in die Ausgabedatei
        fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));

        // Zeigt eine Erfolgsmeldung mit dem Dateinamen
        console.log('✅ JSON generiert in :', outputFile);
    } catch (error) {
        // Zeigt die Fehlermeldung, wenn ein Fehler auftritt
        console.error('❌ Fehler:', error);
    }
}

// Exportiert die Funktion, damit sie von anderen Dateien verwendet werden kann
module.exports = { convertBibtexToJson };

