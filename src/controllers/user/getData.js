const prisma = require("../../connection/connection");
const days = require("../../public/days.json");

const getData = async (req, res) => {
  try {
    const findLessonInfo = (name, hour, day, filter) => 
      prisma.schedule.findFirst({
        where: {
          [filter]: name,
          GIORNO: day,
          O_INIZIO: hour
        },
        select: {
          AULA: true,
          CLASSE: true,
          DOC_COGN: true,
          MAT_NOME: true,
        },
      });

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
      throw new Error("Invalid type.");
    }

    res.json(data);
  } catch (error) {
    console.error("Error while searching:", error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = getData;
