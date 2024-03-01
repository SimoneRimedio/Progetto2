import React from 'react';
import { BsSearch } from 'react-icons/bs'; // Importa l'icona di ricerca da React Icons

function HomePage() {
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Cerca..."
        style={{ fontFamily: 'Poppins, sans-serif' }} // Aggiungi il font Poppins
      />
      <button>
        <BsSearch />
      </button>
    </div>
  );
}

export default HomePage;
