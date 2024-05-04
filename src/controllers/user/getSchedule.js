const prisma = require("../../connection/connection");
const days = require("../../public/days.json");

const getSchedule = async (req, res) => {
    async function getScheduleMatrix(name) {
        try {
            console.log(days);
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
      
          // Inizializza la matrice
          const hours = Array.from({ length: 9 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
          const matrix = hours.map(() => []);
      
          // Popola la matrice con le lezioni
          schedule.forEach(schedule => {
            const dayIndex = days.indexOf(schedule.GIORNO.toLowerCase());
            const hourIndex = hours.indexOf(schedule.O_INIZIO);
            if (dayIndex !== -1 && hourIndex !== -1) {
              matrix[hourIndex][dayIndex] = {
                AULA: schedule.AULA,
                CLASSE: schedule.CLASSE,
                DOC_COGN: schedule.DOC_COGN,
              };
            }
          });
      
          return matrix;
        } catch (error) {
          console.error('Errore durante il recupero delle lezioni:', error);
          throw error;
        }
      }

      const name = req.query.name;
      const type = req.query.type;
      const schedulesMatrix = await getScheduleMatrix(name);
      console.log(schedulesMatrix);
};

module.exports = getSchedule;
