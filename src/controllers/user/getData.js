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
    const currentHour = date.getHours();
    const currentMinutes = date.getMinutes();
    
    const currentTotalMinutes = currentHour * 60 + currentMinutes;
    const allowedHours = ["08h00", "08h55", "10h00", "10h55", "12h00", "12h55", "14h10", "15h05"];
    let nearestHour = allowedHours[0];
    let nearestMinutes = 8 * 60;

    for (const allowedHour of allowedHours) {
      const [hour, minutes] = allowedHour.split("h");
      const totalMinutes = parseInt(hour) * 60 + parseInt(minutes);
      if (totalMinutes <= currentTotalMinutes && totalMinutes > nearestMinutes) {
        nearestHour = allowedHour;
        nearestMinutes = totalMinutes;
      }
    }
    
    const day = days[date.getDay()];
    console.log(currentHour, currentMinutes, nearestHour);

    if (!allowedHours.includes(nearestHour)) {
      throw new Error("Invalid hour.");
    }

    let data;

    if (type === "0") {
      data = await findLessonInfo(name, nearestHour, day, "DOC_COGN");
    } else if (type === "1") {
      data = await findLessonInfo(name, nearestHour, day, "CLASSE");
    } else if (type === "2") {
      data = await findLessonInfo(name, nearestHour, day, "AULA");
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
