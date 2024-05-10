import React from 'react';
import Docente from '../components/Card/Card';
import Navbar from '../components/Header/Navbar';
import Table from '../components/Table/Schedule';
import ImageOpacity from '../components/DragDrop/imageOpacity';
import useFetch from '../hooks/useFetch';



const SchedulingTable = () => {
  const data = async () => {
    const cacca = '5A INFO';
  
  const res = await useFetch({url: `http://localhost:3000/schedule?name=5A INFO&type=1`})
  console.log(res);

  return res;
  }
  
  data();
  return (
    <div className="bg-white dark:bg-dark font-display">
      <Navbar />
      <ImageOpacity />

      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex justify-center space-x-10">
          <div className="flex items-start rounded-lg border border-gray-300 p-10 space-x-10"> {/* Modifica la classe flex e aggiungi items-start per allineare gli elementi a sinistra */}
            <Table />
          </div>
        </div>
      </div>
    </div>

  );
};

export default SchedulingTable;
