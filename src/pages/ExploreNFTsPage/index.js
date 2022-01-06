import React from 'react';
import { Typography } from '@material-ui/core';
import Main from '../../components/ExploreNFTs/Main';
import './style.scss';

const ExploreNFTsPage = () => {
  return (
    <Typography component='div' className='explore-NFTs-page'>
      <Main />
    </Typography>
  )
}

export default ExploreNFTsPage;