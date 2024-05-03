import React from 'react';
import Docente from '../components/Card/Card';
import Navbar from '../components/Header/Navbar';
import Table from '../components/Table/Schedule';
import ImageOpacity from '../components/DragDrop/imageOpacity';

const SchedulingTable = () => {
  const professori = [
    {
      nome: 'Mark',
      cognome: 'Zuckerberg',
      materia: 'Informatica',
      stato: 'attivo',
    },
    {
      nome: 'Marco',
      cognome: 'Giordano',
      materia: 'Matematica',
      stato: 'fuori orario',
    },
    {
      nome: 'Marta',
      cognome: 'Meledandri',
      materia: 'Palle',
      stato: 'inattivo',
    },
    // Aggiungi altri professori se necessario
  ];

  return (
    <div className="bg-white dark:bg-dark font-display">
      <Navbar />
      <ImageOpacity />

      <div className="flex flex-col items-center min-h-screen justify-center">

        {professori.length > 1 ? (
          <h2 className="text-3xl font-semibold text-600 mb-4">I docenti si trovano in 2/2</h2>
        ) : (
          <h2 className="text-3xl font-semibold text-600 mb-4">Il docente si trova in 2/2</h2>
        )}


        <div className="flex justify-center space-x-10">
          <div className="flex items-start rounded-lg border border-gray-300 p-10 space-x-10"> {/* Modifica la classe flex e aggiungi items-start per allineare gli elementi a sinistra */}


            {professori.map((professore, index) => (

              <Docente
                key={index}
                nome={professore.nome}
                cognome={professore.cognome}
                email={professore.email}
                foto={professore.foto}
                materia={professore.materia}
                stato={professore.stato}
                className="mr-4" // Aggiungi una classe di margine a destra per separare dalla tabella
              />
            ))}

            <Table />
          </div>

        </div>
      </div>
    </div>

  );
};

export default SchedulingTable;
