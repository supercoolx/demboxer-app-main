import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './style.scss';
import { Typography } from '@material-ui/core';
import { parseWithOptions } from 'date-fns/fp';

export const PhoneNumber = (props) => {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState(props.defaultValue);

  const handleChange = (value) => {
    setValue(value);
    props.onDateValue(value);
  } 

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue])

  return (
    <Typography component='div' className='phone-input-container'>
      <label>Mobile Number</label>
      <PhoneInput
        placeholder='Enter phone number'
        className='phone-input'
        country="us"
        value={value}
        onChange={handleChange}
      />
    </Typography>
  )
}