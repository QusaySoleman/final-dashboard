import React, { useState, forwardRef, useImperativeHandle } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ar from 'date-fns/locale/ar';
import 'react-datepicker/dist/react-datepicker.css';


registerLocale('ar', ar);

const DateDropdown = forwardRef((props, ref) => {
  const [startDate, setStartDate] = useState(null);

  useImperativeHandle(ref, () => ({
    resetDate() {
      setStartDate(null);
    },
    getDate() {
      return startDate;
    },
    setDate(date) {
      setStartDate(date);
    }
  }));

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          if (props.onDateChange) {
            props.onDateChange(date); // Call the onDateChange function
          }
        }}
        locale="ar"
        dateFormat="dd/MM/yyyy"
        placeholderText="يوم/شهر/سنة"
        calendarStartDay={6} // Optional: Start the week on Saturday
        customInput={
          <input
            style={{ 
              width: '198px', 
              height: '46px', 
              padding: '10px 16px', 
              borderRadius: '12px', 
              border: '1px solid var(--Echo-colors-Grey-300, #C9C9C9)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}
          />
        }
      />
      <span className="arrow" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
        ▼
      </span>
    </div>
  );
});

export default DateDropdown;
