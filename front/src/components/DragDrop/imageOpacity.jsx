import React, { useState, useEffect } from 'react';

const InactivityImage = ({ imageUrl }) => {
  const [opacity, setOpacity] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Funzione per gestire l'inattività dell'utente
  const handleInactivity = () => {
    const currentTime = Date.now();
    const inactivityTime = currentTime - lastActivity;
    // Aumenta gradualmente l'opacità in base al tempo di inattività
    setOpacity(Math.min(inactivityTime / (1000 * 60 * 1), 1)); // Opacità massima dopo 5 minuti di inattività
  };

  // Aggiorna lo stato del tempo trascorso a intervalli regolari
  useEffect(() => {
    const timer = setInterval(() => {
      handleInactivity();
    }, 1000); // Controllo ogni secondo
    return () => clearInterval(timer);
  }, [lastActivity]);

  // Gestisce l'attività dell'utente
  const handleActivity = () => {
    setLastActivity(Date.now());
    setOpacity(0); // Ripristina l'opacità quando l'utente si muove
  };

  return (
    <div style={{ opacity, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} onMouseMove={handleActivity}>
      <img src={'https://cdn.create.vista.com/api/media/small/54520059/stock-photo-man-standing-behind-frosted-glass'} alt="Inactivity Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    </div>
  );
};

export default InactivityImage;
