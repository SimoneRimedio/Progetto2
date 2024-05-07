const parseFileData = require("../../utils/parseCSV");
const updateDatabase = require("../../utils/updateDB");

const dbUpdate = (req, res) => {
  const fileData = req.file.path;

  if (!fileData) {
    return res.status(400).send("File non fornito.");
  }

  parseFileData(fileData)
    .then((parsedData) => {
      updateDatabase(parsedData);
      res.status(200).send("File caricato e elaborato con successo.");
    })
    .catch((error) => {
      console.error(
        "Si è verificato un errore durante l'analisi del file CSV:",
        error
      );
      res
        .status(500)
        .send("Si è verificato un errore durante l'analisi del file CSV.");
    });
  }
module.exports = dbUpdate;
