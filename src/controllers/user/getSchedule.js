import prisma from "../../connection/connection.js";

const getSchedule = async (req, res) => {
  try {
    const findScheduleInfo = async (name, filter) => {
      return await prisma.schedule.findMany({
        where: {
          [filter]: name,
        },
        select: {
          O_INIZIO: true,
          GIORNO: true,
          AULA: true,
          CLASSE: true,
          MAT_NOME: true,
          DURATA: true,
          DOC_COGN: true,
        },
      });
    };

    let name = req.query.name;
    if (name.includes("%20")) {
      name = name.replace(/%20/g, " ");
    }
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

    schedule.forEach((lesson) => {
      const giorno = lesson.GIORNO.toLowerCase();
      if (!scheduleMatrix[giorno]) {
        scheduleMatrix[giorno] = {};
      }
      const ora = lesson.O_INIZIO;

      scheduleMatrix[giorno][ora] = {
        AULA: lesson.AULA,
        CLASSE: lesson.CLASSE,
        MAT_NOME: lesson.MAT_NOME,
        DOC_COGN: lesson.DOC_COGN,
      };
    });

    res.json(scheduleMatrix);
  } catch (error) {
    console.error("Errore durante la ricerca:", error);
    res.status(500).json({ error: error.message });
  }
};

export default getSchedule;
