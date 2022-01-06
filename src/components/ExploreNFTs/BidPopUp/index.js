import React from 'react';
import {
  IconButton,
  Typography,
  Button,
  Divider
} from '@material-ui/core';
import closeIcon from '../../../assets/icons/black-close.svg';
import visaIcon from '../../../assets/icons/visa.png';
import './style.scss';

const BidPopUp = (props) => {
  const { handleClose } = props;

  return (
    <Typography component='div' className='popup-content bid-popup-content'>
      <Typography component='div' className='title-section'>
        <Typography variant='h1' component='h2' className='title'>NFT’s title text here</Typography>
        <IconButton onClick={() => handleClose(false)}>
          <img src={closeIcon} alt='closeIcon' />
        </IconButton>
      </Typography>
      <Typography className='author-title'>AUTHOR: LONIBOWCHER</Typography>
      <Typography className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
      <Typography variant='h1' component='h2' className='payment-method-title'>Payment Method:</Typography>
      <Typography component='div' className='payment-content'>
        <Typography component='div'>
          <img src={visaIcon} alt='visa-icon' />
          <Typography className='card-number'>**** **** **** 1242</Typography>
        </Typography>
        <Typography className='balance'>BALANCE:$ 10.00</Typography>
      </Typography>
      <Divider />
      <Typography component='div' className='btn-section'>
        <Button className='fill-btn'>Bid</Button>
        <Button className='fill-btn buy-now-btn'>Buy Now</Button>
      </Typography>

    </Typography>
  )
}

export default BidPopUp;