const prisma = require("../../connection/connection");

const days = [
    'lunedì',
    'martedì',
    'mercoledì',
    'giovedì',
    'venerdì',
    'sabato',
    'domenica'
];

const getData = async (req, res) => {
    try {
        const findLessonInfo = async (name, hour, day, filter) => {
            return await prisma.schedule.findFirst({
                where: {
                    [filter]: name,
                    O_INIZIO: hour,
                    GIORNO: day
                },
                select: {
                    AULA: true,
                    CLASSE: true,
                    DOC_COGN: true,
                    MAT_NOME: true
                }
            });
        };

        const name = req.query.name;
        const type = req.query.type;

        const date = new Date();
        const hour = `${date.getHours().toString().padStart(2, '0')}h00`;
        const day = days[date.getDay()];

        let data;

        if (type === '0') {
            data = await findLessonInfo(name, hour, day, 'DOC_COGN');
        } else if (type === '1') {
            data = await findLessonInfo(name, hour, day, 'CLASSE');
        } else if (type === '2') {
            data = await findLessonInfo(name, hour, day, 'AULA');
        } else {
            throw new Error('Tipo non valido.');
        }

        console.log(data);
        return data;
    } catch (error) {
        console.error('Errore durante la ricerca:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = getData;
