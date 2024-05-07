const prisma = require("../../connection/connection");

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
          DURATA: true,
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

    const scheduleArray = [];

    schedule.forEach(lesson => {
      const giorno = lesson.GIORNO.toLowerCase();
      const ora = lesson.O_INIZIO;
      const durata = parseInt(lesson.DURATA);

      // Aggiungi la lezione corrente all'array
      scheduleArray.push({
        day: giorno,
        hour: ora,
        lesson: {
          AULA: lesson.AULA,
          CLASSE: lesson.CLASSE,
          MAT_NOME: lesson.MAT_NOME
        }
      });

      // Se la durata è maggiore o uguale a due ore, aggiungi un'altra lezione all'array
      if (durata >= 2) {
        scheduleArray.push({
          day: giorno,
          hour: ora + " x2",
          lesson: {
            AULA: lesson.AULA,
            CLASSE: lesson.CLASSE,
            MAT_NOME: lesson.MAT_NOME
          }
        });
      }
    });

    res.json(scheduleArray);
  } catch (error) {
    console.error("Errore durante la ricerca:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = getSchedule;
