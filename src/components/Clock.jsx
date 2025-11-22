import React, { useState, useEffect } from 'react';

function Clock() {
  // Initialize state for time and date
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  // Update time and date every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      
      // Format time as HH:mm:ss
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Format date as Mon DD (e.g., "Mon 22")
      const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' });

      setTime(formattedTime);
      setDate(formattedDate);
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock-container">
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
  );
}

export default Clock;
