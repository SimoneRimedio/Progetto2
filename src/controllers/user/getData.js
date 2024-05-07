const prisma = require("../../connection/connection");
const days = require("../../public/days.json");

const getData = async (req, res) => {
  try {
    const findLessonInfo = async (name, hour, day, filter) => {
      const [hourStart, minutesStart] = hour.split('h');
      const startHour = parseInt(hourStart);
      const startMinutes = parseInt(minutesStart);

      let duration = await prisma.schedule.findFirst({
        where: {
          [filter]: name,
          GIORNO: day,
          O_INIZIO: hour
        },
        select: {
          DURATA: true
        },
      });

      if (!duration) {
        throw new Error("Lesson not found.");
      }

      const endHour = startHour + duration.DURATA;
      const endMinutes = startMinutes;
      const endTime = `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;

      return await prisma.schedule.findFirst({
        where: {
          [filter]: name,
          GIORNO: day,
          O_INIZIO: {
            gte: hour,
            lt: endTime
          }
        },
        select: {
          AULA: true,
          CLASSE: true,
          DOC_COGN: true,
          MAT_NOME: true,
        },
      });
    };

    const name = req.query.name;
    const type = req.query.type;

    const date = new Date();
    const hour = `${date.getHours().toString().padStart(2, "0")}h00`;
    const day = days[date.getDay()];

    let data;

    if (type === "0") {
      data = await findLessonInfo(name, hour, day, "DOC_COGN");
    } else if (type === "1") {
      data = await findLessonInfo(name, hour, day, "CLASSE");
    } else if (type === "2") {
      data = await findLessonInfo(name, hour, day, "AULA");
    } else {
      throw new Error("Tipo non valido.");
    }

    res.json(data);
  } catch (error) {
    console.error("Errore durante la ricerca:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = getData;
