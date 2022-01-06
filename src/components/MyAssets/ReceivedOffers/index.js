import React from 'react';
import {
  Typography
} from '@material-ui/core';
import receivedOffersImage from '../../../assets/imgs/received-offers.png';
import './style.scss';

const ReceivedOffers = () => {
  return (
    <Typography component='div' className='received-offers'>
      <img src={receivedOffersImage} alt='receivedimage' />
      <Typography component='h2' className='title'>No offers yet</Typography>
      <Typography className='description'>This section is currently under development.</Typography>
    </Typography>
  )
}

export default ReceivedOffers;