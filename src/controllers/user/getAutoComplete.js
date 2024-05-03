const prisma = require("../../connection/connection");
const url = require("url");

const getAutoComplete = async (req, res) => {
  const autoComplete = async (string) => {
    const distinctValues = await prisma.schedule.findMany({
      where: {
        OR: [
          {
            DOC_COGN: {
              startsWith: string,
            },
          },
          {
            CLASSE: {
              startsWith: string,
            },
          },
          {
            AULA: {
              startsWith: string,
            },
          },
        ],
      },
      select: {
        DOC_COGN: true,
        CLASSE: true,
        AULA: true,
      },
      distinct: ['DOC_COGN', 'CLASSE', 'AULA'], // Ottenere valori distinti
      take: 10, 
    });

    console.log(distinctValues);
    return distinctValues;
  };

  const string = req.query.searchFor;

  try {
    const result = await autoComplete(string);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = getAutoComplete;
