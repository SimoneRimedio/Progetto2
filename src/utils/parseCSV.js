const { createReadStream } = require("fs");
const csv = require("csv-parser");

const parseFileData = (fileData) => {
    return new Promise((resolve, reject) => {
      const parsedData = [];
  
      if (!fileData) {
        return reject("File non valido o mancante.");
      }
  
      createReadStream(fileData)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => parsedData.push(data))
        .on("end", () => {
          resolve(parsedData);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  };

  module.exports = parseFileData;