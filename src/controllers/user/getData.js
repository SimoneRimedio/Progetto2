import { schedule, $disconnect } from "../../connection/connection";
import days from "../../public/days.json";

const getData = async (req, res) => {
  try {
    const findLessonInfo = (name, hour, day, filter) => 
      schedule.findFirst({
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
    
    const day = days[date.getDay()-1];
    console.log(currentHour, currentMinutes, nearestHour);

    if (!allowedHours.includes(nearestHour)) {
      throw new Error("Invalid hour.");
    }


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

    console.log(name,nearestHour,day,filter);
    const data = await findLessonInfo(name, nearestHour, day, filter);

    res.json(data);
  } catch (error) {
    console.error("Error while searching:", error.message);
    throw error;
  } finally {
    await $disconnect();
  }
};

export default getData;
