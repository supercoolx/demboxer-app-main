import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Checkbox,
  Button
} from '@material-ui/core';
import tableOrderIcon from '../../../assets/icons/tableOrder.svg';
import './style.scss';

const TitlePopup = (props) => {
  const { handleClose } = props;
  const { handleSubmit, control } = useForm();

  /**
   * Filter data by a submit button click
   * @param {Object} data
  */
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    handleClose();
  }; // your form submit function which will invoke after successful validation

  return (
    <Typography component='div' className='popup-content title-popup'>
      <Typography component='div' className='title-block'>
        <Typography variant='h1' component='h2' className='title'>Transaction Title</Typography>
        <img src={tableOrderIcon} alt='closeIcon' />
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='custom-check-box'>
          <Controller
            name="recent"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Bid for + (NFT title name)</Typography>
        </label>
        <label className='custom-check-box'>
          <Controller
            name="priceUp"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Offer received</Typography>
        </label>
        <label className='custom-check-box'>
          <Controller
            name="priceDown"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>Unsuccessful Bid Refund</Typography>
        </label>
        <label className='custom-check-box'>
          <Controller
            name="popular"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
          />
          <Typography component='p'>NFT Sale</Typography>
        </label>
        <Typography component='div' className='submit-btn-section'>
          <Button variant='contained' type='submit' className='fill-btn'>Apply</Button>
        </Typography>
      </form>
    </Typography>
  )
}

export default TitlePopup;