const { createReadStream } = require('fs');
const csv = require('csv-parser');
const prisma = require("../../connection/connection");

const parseFileData = (fileData) => {
    return new Promise((resolve, reject) => {
        const parsedData = [];
        
        if (!fileData) {
            return reject('File non valido o mancante.');
        }

        createReadStream(fileData)
            .pipe(csv({ separator: ';' })) 
            .on('data', (data) => parsedData.push(data))
            .on('end', () => {
                resolve(parsedData);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const dbUpdate = (req, res) => {
    const fileData = req.file.path;

    if (!fileData) {
        return res.status(400).send('File non fornito.');
    }

    parseFileData(fileData)
        .then((parsedData) => {
            updateDatabase(parsedData);
            res.status(200).send('File caricato e elaborato con successo.');
        })
        .catch((error) => {
            console.error('Si è verificato un errore durante l\'analisi del file CSV:', error);
            res.status(500).send('Si è verificato un errore durante l\'analisi del file CSV.');
        });

    async function updateDatabase(parsedData) {
        try {
               for (const data of parsedData) {
                await prisma.schedule.upsert({
                    where: { NUMERO: data.NUMERO },
                    update: data,
                    create: data,
                });
            }

            console.log('Database aggiornato con successo!');
        } catch (error) {
            console.error('Si è verificato un errore durante l\'aggiornamento del database:', error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

module.exports = dbUpdate;
