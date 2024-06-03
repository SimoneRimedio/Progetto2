import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Table from '../components/Table/Schedule';
import Card from '../components/Card/Card';
import ImageOpacity from '../components/DragDrop/imageOpacity';
import useFetch from '../hooks/useFetch';

const Homepage = () => {
  // Definisci uno stato per memorizzare i dati ottenuti dalla chiamata API
  let [scheduleData, setScheduleData] = useState(null);
  let [infoData, setInfoData] = useState(null);

  let classi = [
    '1A BIO',
    '1A ENE',
    '1B LES',
    '2A BIO',
    '2A ENE',
    '2A LSA',
    '3A BIO',
    '3A ENE',
    '3A LSA',
    '3B INFO',
    '3A TELE',
    '4A ENE',
    '4A INFO',
    '4A LSA',
    '5A BIO',
    '5A LSA',
    '5A TELE',
    '5A LES',
    '4B LES',
    '1A IT',
    '1B IT',
    '2A IT',
    '2B IT',
    '2C IT',
    '5A INFO',
    '1D IT',
    '3B LES',
    '1C IT',
    '5B LES',
    '5A ENE',
    '5B INFO',
    '4A LES',
    '1B LSA',
    '4A BIO',
    '5C LES',
    '2B LSA',
    '2D IT',
    '5B BIO',
    '5B TELE',
    '3A LES',
    '3C LES',
    '3A INFO',
    '2C LES',
    '1A LSA',
    '1A LES',
    '1C LES',
    '2B LES',
    '2A LES'
  ];

  useEffect(() => {
    let fetchData = async () => {
      try {
        // Seleziona casualmente un elemento dall'array classi
        let randomClass = classi[Math.floor(Math.random() * classi.length)];

        // Esegui la chiamata API utilizzando l'elemento selezionato come tipo
        let scheduleRes = await useFetch({ url: `http://localhost:3000/schedule?name=${randomClass}&type=1` });
        let infoRes = await useFetch({ url: `http://localhost:3000/info?name=${randomClass}&type=1` });
        if (infoRes.data == null) {
          setInfoData('null');
        } else {
          setInfoData(infoRes.data);
        }
        // Aggiorna lo stato con i dati ottenuti dalla chiamata API
        setScheduleData(scheduleRes.data);

        console.log(infoData);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchData(); // Esegui la funzione di fetch dei dati quando il componente monta
  }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire l'effetto solo una volta

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex justify-center space-x-10">
          <div className="flex items-start rounded-lg border mt-20 p-10 space-x-10">
            {scheduleData && <Table data={scheduleData} info={infoData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
