// by nancy
import React, { useState } from 'react';
import  './index.css';
import './decisions-events.css';
const DateDropdown = () => {
  const [date, setDate] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);

  const handleDateChange = (e) => {
    const [day, month, year] = e.target.value.split('/');
    setDate(`${day}/${month}/${year}`);
  };

  const generateOptions = () => {
    const options = [];
    for (let y of years) {
      for (let m of months) {
        for (let d of days) {
          options.push(`${d}/${m}/${y}`);
        }
      }
    }
    return options;
  };

  return (
    <div>
    <select value={date} onChange={handleDateChange} style={{ 
      width: '198px', 
      height: '46px', 
      left: '273px', 
      padding: '10px 16px', 
      gap: '0px', 
      borderRadius: '12px 12px 12px 12px', 
      border: '1px solid var(--Echo-colors-Grey-300, #C9C9C9)', 
      justifyContent: 'space-between', 
    
    }}>
      <option value="">يوم/شهر/سنة</option>
      {generateOptions().map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  

  
  );
};

export default DateDropdown;
