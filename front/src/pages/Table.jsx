import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Table from '../components/Table/Schedule';
import ImageOpacity from '../components/DragDrop/imageOpacity';
import useFetch from '../hooks/useFetch';

const SchedulingTable = () => {
  // Definisci uno stato per memorizzare i dati ottenuti dalla chiamata API
  let [scheduleData, setScheduleData] = useState(null);
  let [infoData, setInfoData] = useState(null);

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  // Ottenere il valore del parametro 'search'
  let searchValue = urlParams.get('search');

  // Ottenere il valore del parametro 'option'
  let optionValue = urlParams.get('option');

  if (optionValue == "Docenti") {
    optionValue = 0;
  } else if (optionValue == "Classi") {
    optionValue = 1;
  } else if (optionValue == "Aule") {
    optionValue = 2;
  }


  useEffect(() => {
    let fetchData = async () => {
      try {
        let scheduleRes = await useFetch({ url: `http://localhost:3000/schedule?name=${searchValue}&type=${optionValue}` });
        let infoRes = await useFetch({ url: `http://localhost:3000/info?name=${searchValue}&type=${optionValue}` });
        if (infoRes.data == null) {
          setInfoData('null');
        } else {
          setInfoData(infoRes.data);
        }
        // Aggiorna lo stato con i dati ottenuti dalla chiamata API
        setScheduleData(scheduleRes.data);

      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchData(); // Esegui la funzione di fetch dei dati quando il componente monta
  }); // Aggiungi inputValue come dipendenza affinché l'effetto venga eseguito quando il parametro cambia

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex justify-center space-x-10">
          <div className="flex items-start rounded-lg border mt-20 p-10 space-x-10">
            {/* Renderizza il componente Table solo se i dati sono disponibili */}
            {scheduleData && <Table data={scheduleData} info={infoData} />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchedulingTable;
