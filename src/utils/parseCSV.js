import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { DateTime } from 'luxon';

const allowedHours = [
    "08h00",
    "08h55",
    "10h00",
    "10h55",
    "12h00",
    "12h55",
    "14h10",
    "15h05",
];

function adjustToAllowedHour(timeStr) {
    const time = DateTime.fromFormat(timeStr, 'HH\'h\'mm');
    for (let i = allowedHours.length - 1; i >= 0; i--) {
        const allowedTime = DateTime.fromFormat(allowedHours[i], 'HH\'h\'mm');
        if (time >= allowedTime) {
            return allowedHours[i];
        }
    }
    return allowedHours[0];
}

function splitAndParseRecords(inputFilePath) {
    return new Promise((resolve, reject) => {
        const rows = [];

        createReadStream(inputFilePath)
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
                            let newStartTime = startTime.plus({ minutes: i * 55 });
                            const newStartTimeStr = newStartTime.toFormat('HH\'h\'mm'); 
                            newRow['O.INIZIO'] = adjustToAllowedHour(newStartTimeStr);
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

export default splitAndParseRecords;
