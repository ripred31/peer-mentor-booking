import React, { useState } from 'react';

const TimeSelect = ({ onChange }) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  const handleHourChange = (e) => setHours(e.target.value);
  const handleMinuteChange = (e) => setMinutes(e.target.value);

  return (
    <div>
      <select value={hours} onChange={handleHourChange}>
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i.toString().padStart(2, '0')}>
            {i.toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      :
      <select value={minutes} onChange={handleMinuteChange}>
        {Array.from({ length: 4 }, (_, i) => (
          <option key={i} value={(i * 15).toString().padStart(2, '0')}>
            {(i * 15).toString().padStart(2, '0')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelect;
