import React, { useState } from 'react';

const OrarioTabella = () => {
  // Array per rappresentare i giorni della settimana
  const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];

  // Inizializzo uno state per tenere traccia delle materie
  const [orario, setOrario] = useState([
    ['', '', '', '', ''], // Ogni elemento rappresenta una riga (orario per un giorno)
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  // Funzione per aggiungere una materia all'orario
  const aggiungiMateria = (giornoIndex, oraIndex, materia) => {
    const newOrario = [...orario];
    newOrario[oraIndex][giornoIndex] = materia;
    setOrario(newOrario);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <table className="table-auto border border-gray-500 mx-auto"> {/* Aggiunto mx-auto per centrare la tabella */}
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Ora</th>
            {giorniSettimana.map((giorno, index) => (
              <th key={index} className="border border-gray-500 px-4 py-2">{giorno}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orario.map((ora, oraIndex) => (
            <tr key={oraIndex}>
              <td className="border border-gray-500 px-4 py-2">Ora {oraIndex + 1}</td>
              {ora.map((materia, giornoIndex) => (
                <td key={giornoIndex} className="border border-gray-500 px-4 py-2 cursor-pointer" onClick={() => aggiungiMateria(giornoIndex, oraIndex, 'Nuova Materia')}>
                  {materia}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrarioTabella;
