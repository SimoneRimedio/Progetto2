const prisma = require("../../connection/connection");
const days = require("../../public/days.json");

const getData = async (req, res) => {
  try {
    const findLessonInfo = async (name, hour, day, filter) => {
      // Parse hour to get the hour and minutes
      const [hourStart, minutesStart] = hour.split('h');
      
      // Convert hourStart and minutesStart to numbers
      const startHour = parseInt(hourStart);
      const startMinutes = parseInt(minutesStart);
    
      // Calculate the end time considering the lesson duration
      const endHour = startHour + 2; // Assuming each lesson lasts for an hour
      const endMinutes = startMinutes;
    
      // Format end time
      const endTime = `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
    
      console.log(endTime);
      // Find lessons within the specified time range
      return await prisma.schedule.findFirst({
        where: {
          [filter]: name,
          GIORNO: day,
          O_INIZIO: {
            gte: hour,
            lt: endTime // Use end time to filter lessons that end after the specified hour
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
    const hour = "08h00"; //`${date.getHours().toString().padStart(2, "0")}h00`;
    const day = days[0];

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
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = getData;
