import React from 'react';

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

  return (
    <div>
      <p>La classe {info.CLASSE} si trova in {info.AULA}</p>
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
                return (
                  <td key={dayIndex} className="border border-gray-500 py-2 px-2">
                    <div className="mb-1">{aula}</div>
                    <div className="mb-1">{mat}</div>
                    <div>{doc}</div>
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
