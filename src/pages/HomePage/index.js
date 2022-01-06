import React from 'react';
import { Typography } from '@material-ui/core'
import BuyNFTs from '../../components/Home/BuyNFTs';
import HotCollection from '../../components/Home/HotCollection';
import './style.scss';

const Home = () => {
  return (
    <Typography component='div' className='home-page'>
      <BuyNFTs />
      <HotCollection />
    </Typography>
  )
}

export default Home;