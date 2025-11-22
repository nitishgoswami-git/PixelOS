import React, { useState, useEffect } from 'react';

function Middle() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

  return (
    <div className="text-white font-mono text-lg select-none">
      {formattedTime}
    </div>
  );
}

export default Middle;
