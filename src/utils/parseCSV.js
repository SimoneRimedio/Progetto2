const fs = require('fs');
const csv = require('csv-parser');
const { DateTime } = require('luxon');

function splitAndParseRecords(inputFilePath) {
    return new Promise((resolve, reject) => {
        const rows = [];

        // Leggi il file CSV di input
        fs.createReadStream(inputFilePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                const parsedData = rows.flatMap(row => {
                    const duration = row['DURATA'];
                    const [durationHours, durationMinutes] = duration.split('h').map(Number);
                    const totalDurationMinutes = durationHours * 60 + durationMinutes;

                    if (totalDurationMinutes >= 120) {
                        const numSplits = Math.floor(totalDurationMinutes / 60);
                        const startTime = DateTime.fromFormat(row['O.INIZIO'], 'H\'h\'mm');

                        const splitRows = [];
                        for (let i = 0; i < numSplits; i++) {
                            const newRow = { ...row };
                            const uniqueId = `${row['NUMERO']}.${i + 1}`;
                            newRow['NUMERO'] = uniqueId;
                            newRow['DURATA'] = '1h00';
                            const newStartTime = startTime.plus({ minutes: i * 55 });
                            newRow['O.INIZIO'] = newStartTime.toFormat('HH\'h\'mm'); // Modifica il formato dell'orario
                            splitRows.push(newRow);
                        }
                        return splitRows;
                    } else {
                        return [row];
                    }
                });

                resolve(parsedData);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = splitAndParseRecords;
