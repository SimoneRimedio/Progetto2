import React, { useState, useEffect } from 'react';

const TabellaOrario = ({ data, info }) => {
  console.log('Info:', info);
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

  // Ottenere il valore del parametro 'search'
  let searchValue = urlParams.get('search');
  console.log('Valore del parametro "search":', searchValue);

  // Ottenere il valore del parametro 'option'
  let optionValue = urlParams.get('option');
  console.log('Valore del parametro "option":', optionValue);

  if (optionValue == "Docenti") {
    ris = "Il docente " + searchValue + " si trova in " + info.AULA;
  } else if (optionValue == "Classi") {
    ris = "La classe " + searchValue + " si trova in " + info.AULA;
  } else if (optionValue == "Aule") {
    ris = "Nell'aula " + searchValue + " si trova la classe " + info.CLASSE;
  }

  const [coloriMaterie, setColoriMaterie] = useState({});

  useEffect(() => {
    const generateColorMap = () => {
      const colorMap = {};
      const materie = new Set();

      // Scansiona tutti i giorni e ore per ottenere tutte le materie
      giorniSettimana.forEach((giorno) => {
        oraInizio.forEach((ora) => {
          const mat = data[giorno][ora]?.MAT_NOME;
          if (mat) {
            materie.add(mat);
          }
        });
      });

      // Assegna un colore casuale a ciascuna materia
      materie.forEach((materia) => {
        colorMap[materia] = getRandomColor();
      });

      return colorMap;
    };

    setColoriMaterie(generateColorMap());
  }, [data, giorniSettimana, oraInizio]);

  const getRandomColor = () => {
    // Genera un colore casuale in formato esadecimale
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div>
      <p>{ris}</p>
      <table className="border border-gray-500 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-500"></th>
            {giorniSettimana.map((giorno, index) => (
              <th key={index} className="border border-gray-500">{giorno}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {oraInizio.map((ora, index) => (
            <tr key={index}>
              <td className="border border-gray-500 py-2 px-2">{`${ora} \n ${oraFine[index]}`}</td>
              {giorniSettimana.map((giorno, dayIndex) => {
                const aula = data[giorno][oraInizio[index]]?.AULA || '-';
                const doc = data[giorno][oraInizio[index]]?.DOC_COGN || '-';
                const mat = data[giorno][oraInizio[index]]?.MAT_NOME || '-';
                const classe = data[giorno][oraInizio[index]]?.CLASSE || '-';
                const coloreMateria = coloriMaterie[mat] || 'white';
                
                return (
                  <td key={dayIndex} className="border border-gray-500 py-2 px-2" style={{ backgroundColor: coloreMateria }}>
                    <div className="mb-1"><strong>{mat}</strong>, {doc}</div>
                    <div className="mb-1">{aula.replace(/[<>]/g, '')}</div>
                    <div className="mb-1"><italic>{classe.replace(/[<>]/g, '').replace(/ALT-REL|ALTERNATIVA/g, ' ')}</italic></div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabellaOrario;
