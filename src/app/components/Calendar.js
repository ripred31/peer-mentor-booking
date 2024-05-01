'use client'

import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar({ onChange }) {

  const handleDateChange = (newValue) => {
    console.log('calendar component: ', newValue.toISOString())
    if (newValue && newValue[0]) {
      onChange(newValue[0].toISOString());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}