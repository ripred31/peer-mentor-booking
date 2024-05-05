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

  const popperSx = {
    "& .MuiPaper-root": {
      backgroundColor: "rgba(120, 120, 120, 0.2)"
    },
    "& .MuiCalendarPicker-root": {
      backgroundColor: "rgba(45, 85, 255, 0.4)"
    },
    "& .MuiPickersDay-dayWithMargin": {
      color: "rgb(229,228,226)",
      backgroundColor: "rgba(50, 136, 153)"
    },
    "& .MuiTabs-root": { backgroundColor: "rgba(120, 120, 120, 0.4)" }
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}