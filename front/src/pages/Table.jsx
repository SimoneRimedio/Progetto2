import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Table from '../components/Table/Schedule';
import ImageOpacity from '../components/DragDrop/imageOpacity';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

const SchedulingTable = () => {
  // Definisci uno stato per memorizzare i dati ottenuti dalla chiamata API
  const [scheduleData, setScheduleData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const { inputValue } = useParams();
  console.log('Valore inserito:', inputValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleRes = await useFetch({ url: `http://localhost:3000/schedule?name=5B TELE&type=1` });
        const infoRes = await useFetch({ url: `http://localhost:3000/info?name=5A TELE&type=1` });
        // Aggiorna lo stato con i dati ottenuti dalla chiamata API
        setScheduleData(scheduleRes.data);
        setInfoData(infoRes.data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchData(); // Esegui la funzione di fetch dei dati quando il componente monta
  }, [inputValue]); // Aggiungi inputValue come dipendenza affinché l'effetto venga eseguito quando il parametro cambia

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex justify-center space-x-10">
          <div className="flex items-start rounded-lg border mt-20 p-10 space-x-10">
            {/* Renderizza il componente Table solo se i dati sono disponibili */}
            {scheduleData && infoData && <Table data={scheduleData} info={infoData} />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchedulingTable;
