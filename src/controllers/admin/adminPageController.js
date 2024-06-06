import splitAndParseRecords from "../../utils/parseCSV.js";
import updateDatabase from "../../utils/updateDB.js";

const dbUpdate = (req, res) => {
  const fileData = req.file.path;

  if (!fileData) {
    return res.status(400).send("File non fornito.");
  }

  splitAndParseRecords(fileData)
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
};
export default dbUpdate;
