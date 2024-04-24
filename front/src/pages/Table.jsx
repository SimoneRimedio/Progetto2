import Docente from '../components/Card/Card';
import Navbar from '../components/Header/Navbar';
import Table from '../components/Table/Schedule';

const SchedulingTable = () => {
  const professore = {
    nome: 'Mark',
    cognome: 'Zuckerberg',
    email: 'marco.farina@jcmaxwell.it',
    foto: '',
    materia: 'Informatica',
    stato: 'attivo',
  };
  return (
    <div className="bg-white dark:bg-dark font-display">
      <Navbar />
      <div className="flex flex-col items-center min-h-screen justify-center">
        <h1 className="mb-8 text-xl">Il docente <strong>{professore.nome} {professore.cognome}</strong>   si trova in aula <strong>12/T</strong></h1>
        <div className="flex items-start rounded-lg border border-gray-300 p-10 space-x-10"> {/* Modifica la classe flex e aggiungi items-start per allineare gli elementi a sinistra */}
          <Docente
            nome={professore.nome}
            cognome={professore.cognome}
            email={professore.email}
            foto={professore.foto}
            materia={professore.materia}
            stato={professore.stato}
            className="mr-4" // Aggiungi una classe di margine a destra per separare dalla tabella
          />
          <Table />
        </div>
      </div>
    </div>
  );
};

export default SchedulingTable;
