const prisma = require("../../connection/connection");
const days = require("../../public/days.json");

const getSchedule = async (req, res) => {
  try {
    const findScheduleInfo = async (name, filter) => {
      return await prisma.schedule.findMany({
        where: {
          [filter]: name
        },
        select: {
          O_INIZIO: true,
          GIORNO: true,
          AULA: true,
          CLASSE: true,
          MAT_NOME: true,
        },
      });
    };

    const name = req.query.name;
    const type = req.query.type;

    let filter;
    if (type === "0") {
      filter = "DOC_COGN";
    } else if (type === "1") {
      filter = "CLASSE";
    } else if (type === "2") {
      filter = "AULA";
    } else {
      throw new Error("Tipo non valido.");
    }

    const schedule = await findScheduleInfo(name, filter);

    const scheduleMatrix = {};

    schedule.forEach(lesson => {
      const giorno = lesson.GIORNO.toLowerCase();
      if (!scheduleMatrix[giorno]) {
        scheduleMatrix[giorno] = {};
      }
      const ora = parseInt(lesson.O_INIZIO.split('h')[0], 10);
      const oraLabel = ora.toString().padStart(2, "0") + ":00";

      scheduleMatrix[giorno][oraLabel] = {
        AULA: lesson.AULA,
        CLASSE: lesson.CLASSE,
        MAT_NOME: lesson.MAT_NOME,
      };
    });

    res.json(scheduleMatrix);
  } catch (error) {
    console.error("Errore durante la ricerca:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = getSchedule;
