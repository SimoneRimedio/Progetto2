

import React, { useState } from 'react';

const OrarioTabella = () => {
  // Array per rappresentare i giorni della settimana
  const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];

  // Inizializzo uno state per tenere traccia delle materie e del giorno corrente
  const [orario] = useState([
    ['', '', '', '', ''], // Ogni elemento rappresenta una riga (orario per un giorno)
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [giornoCorrente, setGiornoCorrente] = useState(0);

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

  // Funzione per andare al giorno successivo
  const goToNextDay = () => {
    setGiornoCorrente((prevGiorno) => (prevGiorno + 1) % giorniSettimana.length);
  };

  // Funzione per andare al giorno precedente
  const goToPreviousDay = () => {
    setGiornoCorrente((prevGiorno) => (prevGiorno - 1 + giorniSettimana.length) % giorniSettimana.length);
  };

  return (
    <div>
      {/* Tabella per dispositivi mobili */}
      <div className="sm:hidden"> {/* Nasconde la tabella su schermi di dimensioni pari o superiori a sm (640px) */}
        <div>
          <div className="flex justify-between mb-4">
            <button onClick={goToPreviousDay} className="border border-gray-500 px-4 py-2 cursor-pointer">⭠</button>
            <button onClick={goToNextDay} className="border border-gray-500 px-4 py-2 cursor-pointer">⭢</button>
          </div>
          <table className="table-auto border border-gray-500">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">Ora</th>
                <th className="border border-gray-500 px-4 py-2">{giorniSettimana[giornoCorrente]}</th>
              </tr>
            </thead>
            <tbody>
              {oraInizio.map((orarioInizio, oraIndex) => (
                <tr key={oraIndex}>
                  <td className="border border-gray-500 px-4 py-2">{orarioInizio}<br />{oraFine[oraIndex]}</td>
                  <td className="border border-gray-500 px-4 py-2 cursor-pointer">{orario[giornoCorrente][oraIndex]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabella per dispositivi di dimensioni superiori a sm (640px) */}
      <div className="hidden sm:block">
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
      </div>
    </div>
  );
};

export default OrarioTabella;
