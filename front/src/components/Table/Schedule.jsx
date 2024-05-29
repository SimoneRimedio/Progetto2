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

  if (optionValue === "Docenti") {
    ris = "Il docente " + searchValue + " si trova in " + info.AULA;
  } else if (optionValue === "Classi") {
    ris = "La classe " + searchValue + " si trova in " + info.AULA;
  } else if (optionValue === "Aule") {
    ris = "Nell'aula " + searchValue + " si trova la classe " + info.CLASSE;
  }

  const [coloriMaterie] = useState({});

  return (
    <div className="p-4">
      <p className="bg-white text-gray-800 text-lg font-medium p-4 rounded-md shadow-sm text-center mx-4 w-auto">
        {ris}
      </p>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2"></th>
              {giorniSettimana.map((giorno, index) => (
                <th key={index} className="border border-gray-500 px-4 py-2">{giorno}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {oraInizio.map((ora, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-4 py-2 whitespace-pre">{`${ora}\n${oraFine[index]}`}</td>
                {giorniSettimana.map((giorno, dayIndex) => {
                  const aula = data[giorno][oraInizio[index]]?.AULA || '';
                  const doc = data[giorno][oraInizio[index]]?.DOC_COGN || '';
                  const mat = data[giorno][oraInizio[index]]?.MAT_NOME || '';
                  const classe = data[giorno][oraInizio[index]]?.CLASSE || '';
                  const coloreMateria = coloriMaterie[mat] || 'white';

                  return (
                    <td key={dayIndex} className="border border-gray-500 px-4 py-2" style={{ backgroundColor: coloreMateria }}>
                      <div className="mb-1 font-bold">{mat}</div>
                      <div className="mb-1">{doc}</div>
                      <div className="mb-1">{aula.replace(/[<>]/g, '')}</div>
                      <div className="italic">{classe.replace(/[<>]/g, '').replace(/ALT-REL|ALTERNATIVA/g, ' ')}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabellaOrario;
