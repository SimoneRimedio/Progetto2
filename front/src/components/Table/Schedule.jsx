import React, { useState } from 'react';

const OrarioTabella = () => {
  // Array per rappresentare i giorni della settimana
  const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];

  // Inizializzo uno state per tenere traccia delle materie
  const [orario] = useState([
    ['', '', '', '', ''], // Ogni elemento rappresenta una riga (orario per un giorno)
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  // Array degli orari di inizio
  const oraInizio = [
    '8:00',
    '8:55',
    '10:00',
    '10:55',
    '12:00',
    '12:55',
    '14:10',
    '15:05'
  ];

  // Array degli orari di fine
  const oraFine = [
    '8:55',
    '9:50',
    '10:55',
    '11:50',
    '12:55',
    '13:50',
    '15:05',
    '16:00'
  ];



  return (
    <table className="table-auto border border-gray-500"> {/* Rimuovo mx-auto per centrare la tabella */}
      <thead>
        <tr>
          <th className="border border-gray-500 px-4 py-2">Ora</th>
          {giorniSettimana.map((giorno, index) => (
            <th key={index} className="border border-gray-500 px-4 py-2">{giorno}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {oraInizio.map((orarioInizio, oraIndex) => (
          <tr key={oraIndex}>
            <td className="border border-gray-500 px-4 py-2">{orarioInizio}<br></br>{oraFine[oraIndex]}</td>
            {orario.map((materia, giornoIndex) => (
              <td key={giornoIndex} className="border border-gray-500 px-4 py-2 cursor-pointer w-48"> {/* Aggiungi la classe w-48 per aumentare la larghezza */}
                {materia}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default OrarioTabella;
