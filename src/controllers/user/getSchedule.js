const prisma = require("../../connection/connection");

const getSchedule = async (req, res) => {
  async function getScheduleMatrix(name) {
    try {
      const schedule = await prisma.schedule.findMany({
        where: {
          DOC_COGN: name,
        },
        select: {
          GIORNO: true,
          O_INIZIO: true,
          AULA: true,
          CLASSE: true,
          DOC_COGN: true,
        },
      });

      // Definisci la matrice in base al numero di ore e giorni di lezione
      const matrix = Array.from({ length: 9 }, () => Array(7).fill(null));

      // Popola la matrice con i dati recuperati dal database
      schedule.forEach((lesson) => {
        const giornoIndex = getGiornoIndex(lesson.GIORNO);
        const oraIndex = getOraIndex(lesson.O_INIZIO);
        if (giornoIndex !== -1 && oraIndex !== -1) {
          matrix[oraIndex][giornoIndex] = {
            AULA: lesson.AULA,
            CLASSE: lesson.CLASSE,
            DOC_COGN: lesson.DOC_COGN,
          };
        }
      });

      return matrix;
    } catch (error) {
      console.error("Errore durante il recupero delle lezioni:", error);
      throw error;
    }
  }

  const name = req.query.name;
  const type = req.query.type;
  const schedulesMatrix = await getScheduleMatrix(name);
  res.json(schedulesMatrix);
};

module.exports = getSchedule;
