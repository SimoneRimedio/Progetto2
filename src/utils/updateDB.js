const prisma = require("../connection/connection");

const updateDatabase = async function updateDatabase(parsedData) {
    try {
      for (const data of parsedData) {
        await prisma.schedule.upsert({
          where: { NUMERO: data.NUMERO },
          update: {
            NUMERO: data.NUMERO,
            DURATA: data.DURATA,
            FREQUENZA: data.FREQUENZA,
            MAT_COD: data.MAT_COD,
            MAT_NOME: data.MAT_NOME,
            DOC_COGN: data.DOC_COGN,
            DOC_NOME: data.DOC_NOME,
            CLASSE: data.CLASSE,
            AULA: data.AULA,
            PERIODICIT_: data["PERIODICITÀ"],
            SPECIFICA: data.SPECIFICA,
            CO_DOC_: data["CO-DOC."],
            COEFF_: data["COEFF."],
            GIORNO: data.GIORNO,
            O_INIZIO: data["O.INIZIO"],
            ALUNNI: data.ALUNNI,
          },
          create: {
            NUMERO: data.NUMERO,
            DURATA: data.DURATA,
            FREQUENZA: data.FREQUENZA,
            MAT_COD: data.MAT_COD,
            MAT_NOME: data.MAT_NOME,
            DOC_COGN: data.DOC_COGN,
            DOC_NOME: data.DOC_NOME,
            CLASSE: data.CLASSE,
            AULA: data.AULA,
            PERIODICIT_: data["PERIODICITÀ"],
            SPECIFICA: data.SPECIFICA,
            CO_DOC_: data["CO-DOC."],
            COEFF_: data["COEFF."],
            GIORNO: data.GIORNO,
            O_INIZIO: data["O.INIZIO"],
            ALUNNI: data.ALUNNI,
          },
        });
      }

      console.log("Database aggiornato con successo!");
    } catch (error) {
      console.error(
        "Si è verificato un errore durante l'aggiornamento del database:",
        error
      );
    } finally {
      await prisma.$disconnect();
    }
  }

module.exports = updateDatabase;
