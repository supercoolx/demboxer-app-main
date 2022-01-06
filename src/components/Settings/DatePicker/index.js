import 'date-fns';
import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './style.scss';
import { Typography } from '@material-ui/core';

export function DatePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(props.defaultValue);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onDateValue(date)
  };

  useEffect(() => {
    setSelectedDate(props.defaultValue)
  }, [props.defaultValue])

  return (
    <Typography component='div' className='custom-datePicker'>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <label className='date-label'>Date of Birth</label>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-inline"
					format="yyyy-MM-dd"
					variant="dialog"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </Typography>
    
  );
}
