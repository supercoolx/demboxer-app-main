import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  IconButton,
  Typography,
  Checkbox,
  Button
} from '@material-ui/core';
import closeIcon from '../../../assets/icons/close.svg';
import './style.scss';

const FilterPopUp = (props) => {
  const { handleClose } = props;
  const { handleSubmit, control } = useForm();

  /**
   * Filter data by a submit button click
   * @param {Object} data
  */
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    handleClose(true);
  }; // your form submit function which will invoke after successful validation

  return (
    <Typography component='div' className='popup-content'>
      <Typography component='div' className='title-section'>
        <Typography variant='h1' component='h2' className='title'>Filter</Typography>
        <IconButton onClick={() => handleClose(true)}>
          <img src={closeIcon} alt='closeIcon' />
        </IconButton>
      </Typography>
      <Typography className='sort-by'>sort by:</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='custom-check-box'>
          <Controller
            name="recent"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Most Recent</Typography>
        </label>
        <label className='custom-check-box'>
          <Controller
            name="priceUp"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Price (Going Up)</Typography>
        </label>
        <label className='custom-check-box'>
          <Controller
            name="priceDown"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Price (Going Down)</Typography>
        </label>
        <label className='custom-check-box'>
          <Controller
            name="popular"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Most Popular</Typography>
        </label>
        <Typography component='div' className='submit-btn-section'>
          <Button variant='contained' type='submit' className='fill-btn'>Apply</Button>
        </Typography>
      </form>
    </Typography>
  )
}

export default FilterPopUp;