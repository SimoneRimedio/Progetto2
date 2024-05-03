const prisma = require("../../connection/connection");
const url = require("url");

const getAutoComplete = (req, res) => {

async function autoComplete(string) {
    const schedules = await prisma.schedule.findMany({
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
      orderBy: {
        DOC_COGN: 'asc',
      },
    });
    
    console.log(schedules);
  }
  
  const urlParams = url.parse(req.body.url, true).query;
  const string = urlParams.searchFor;
  
 autoComplete(string)
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
module.exports = getAutoComplete;