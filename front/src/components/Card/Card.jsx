import React from 'react';

const Docente = ({ nome, cognome, email, foto, materia, stato }) => {
  // Funzione per generare il colore del testo dello stato in base allo stato fornito
  const generaColoreStato = (stato) => {
    switch (stato) {
      case 'attivo':
        return 'green'; // Verde per lo stato attivo
      case 'inattivo':
        return 'orange'; // Arancione per lo stato inattivo
      case 'fuori orario':
        return 'red'; // Rosso per lo stato fuori orario
      default:
        return 'black'; // Nero per qualsiasi altro stato
    }
  };

  // Applica il colore del testo dello stato
  const coloreStato = generaColoreStato(stato);

  // Controlla se è stata fornita un'immagine del professore, altrimenti utilizza un'immagine predefinita
  const fotoProfessore = foto ? foto : 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg';

  // Funzione per generare un colore casuale in formato esadecimale
  const generaColoreCasuale = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Genera un colore casuale per la materia
  const coloreMateria = generaColoreCasuale();


  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 cursor-pointer">
      <img className="w-24 h-24 rounded-full mb-4" src={fotoProfessore} alt={`${nome} ${cognome}`} />
      <div className="text-center">
        <h2 className="text-lg font-semibold">{`${nome} ${cognome}`}</h2>
        <p className="text-sm font-medium" style={{ color: coloreMateria, textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>{materia}</p> {/* Aggiunto contorno al testo */}
        <p className="text-gray-500 text-sm">{email}</p>
        <br></br>
        <p className="text-sm" style={{ color: coloreStato }}>Stato: <strong> {stato}</strong></p> {/* Applica il colore del testo dello stato */}
      </div>
    </div>
  );
};

export default Docente;
