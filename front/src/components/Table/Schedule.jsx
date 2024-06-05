import React, { useState, useEffect } from 'react';

const TabellaOrario = ({ data, info }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [giornoCorrente, setGiornoCorrente] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const giorniSettimana = Object.keys(data);
  const oraInizio = [
    '08h00',
    '08h55',
    '10h00',
    '10h55',
    '12h00',
    '12h55',
    '14h10',
    '15h05'
  ];
  const oraFine = [
    '08h55',
    '09h50',
    '10h55',
    '11h50',
    '12h55',
    '13h50',
    '15h05',
    '16h00'
  ];

  let ris;
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  let searchValue = urlParams.get('search');
  let optionValue = urlParams.get('option');

  if (info.AULA == null || info.CLASSE == null) {
    if (optionValue === "Docenti") {
      ris = "Il docente " + searchValue + " è inattivo";
    } else if (optionValue === "Classi") {
      ris = "La classe " + searchValue + " è inattiva";
    } else if (optionValue === "Aule") {
      ris = "Nell'aula " + searchValue + " non c'è nessuno";
    }
  } else {
    if (optionValue === "Docenti") {
      ris = "Il docente " + searchValue + " si trova in " + info.AULA;
    } else if (optionValue === "Classi") {
      ris = "La classe " + searchValue + " si trova in " + info.AULA;
    } else if (optionValue === "Aule") {
      ris = "Nell'aula " + searchValue + " si trova la classe " + info.CLASSE;
    }
  }

  const [coloriMaterie] = useState({});

  const handlePreviousDay = () => {
    setGiornoCorrente((prevGiorno) => (prevGiorno > 0 ? prevGiorno - 1 : giorniSettimana.length - 1));
  };

  const handleNextDay = () => {
    setGiornoCorrente((prevGiorno) => (prevGiorno < giorniSettimana.length - 1 ? prevGiorno + 1 : 0));
  };

  const giorno = giorniSettimana[giornoCorrente];

  return (
    <div className="p-2">
      {ris && (
        <p className="bg-gray-100 text-gray-800 text-lg font-medium p-4 rounded-lg shadow-md text-center mx-2 w-auto">
          {ris}
        </p>
      )}
      {isMobile ? (
        <div>
          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePreviousDay} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">←</button>
            <h2 className="text-xl font-bold text-gray-800">{giorno}</h2>
            <button onClick={handleNextDay} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">→</button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-max bg-white border-collapse rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-gray-700">Orario</th>
                  <th className="border border-gray-200 px-4 py-2 text-gray-700">{giorno}</th>
                </tr>
              </thead>
              <tbody>
                {oraInizio.map((ora, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                    <td className="border border-gray-200 px-4 py-2 whitespace-pre text-gray-800 rounded-l-lg">{`${ora}\n${oraFine[index]}`}</td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800 rounded-r-lg">
                      {data[giorno][oraInizio[index]] && (
                        <>
                          <div className="mb-1 font-bold">{data[giorno][oraInizio[index]]?.MAT_NOME || ''}</div>
                          <div className="mb-1">{data[giorno][oraInizio[index]]?.DOC_COGN || ''}</div>
                          <div className="mb-1">{data[giorno][oraInizio[index]]?.AULA?.replace(/[<>]/g, '') || ''}</div>
                          <div className="italic">{data[giorno][oraInizio[index]]?.CLASSE?.replace(/[<>]/g, '').replace(/ALT-REL|ALTERNATIVA/g, ' ') || ''}</div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full min-w-max bg-white border-collapse rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-gray-700"></th>
                {giorniSettimana.map((giorno, index) => (
                  <th key={index} className="border border-gray-200 px-4 py-2 text-gray-700">{giorno}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {oraInizio.map((ora, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="border border-gray-200 px-4 py-2 whitespace-pre text-gray-800 rounded-l-lg">{`${ora}\n${oraFine[index]}`}</td>
                  {giorniSettimana.map((giorno, dayIndex) => {
                    const aula = data[giorno][oraInizio[index]]?.AULA || '';
                    const doc = data[giorno][oraInizio[index]]?.DOC_COGN || '';
                    const mat = data[giorno][oraInizio[index]]?.MAT_NOME || '';
                    const classe = data[giorno][oraInizio[index]]?.CLASSE || '';
                    const coloreMateria = coloriMaterie[mat] || 'bg-white';

                    return (
                      <td key={dayIndex} className={`border border-gray-100 px-4 py-2 ${coloreMateria} text-gray-800 rounded-r-lg`}>
                        {data[giorno][oraInizio[index]] && (
                          <>
                            <div className="mb-1 font-bold">{mat}</div>
                            <div className="mb-1">{doc}</div>
                            <div className="mb-1">{aula.replace(/[<>]/g, '')}</div>
                            <div className="italic">{classe.replace(/[<>]/g, '').replace(/ALT-REL|ALTERNATIVA/g, ' ')}</div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TabellaOrario;
