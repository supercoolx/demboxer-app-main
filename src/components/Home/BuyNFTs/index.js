import React from 'react';
import {
  Typography,
  Container,
  Button,
  Grid,
  IconButton
} from '@material-ui/core';

// import backgroundImg from '../../assets/imgs/buyNFTs-background.png';
import userImg from '../../../assets/imgs/user.png';
import rectangleImg from '../../../assets/imgs/rectangle.png';
import leftArrowImg from '../../../assets/icons/leftarrow.svg';

import './style.scss';

const BuyNFTs = () => {
  return (
    <Typography component='div' className='buy-nfts'>
      <Container>
        <Typography component='div' className='component-header-section'>
          <Typography component='span'>Seamlessly Explore & Collect Exlusive nfts.</Typography>
          <Typography variant='h1' component='h2' className='title'>NFTs made easy</Typography>
          <Button variant='contained' className='white-btn'>Start</Button>
        </Typography>
        <Grid container spacing={3} className='content'>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className='player-section'
          >
            <Typography component='div'>
              <iframe width="100%" height="100%" title="frame page" src="https://www.youtube.com/embed/TKfS5zVfGBc"></iframe>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className='cash-section'
          >
            <Typography component='div'>
              <Typography variant='h1' component='h2' className='title'>buy NFTs with cash</Typography>

              {/* USER PRICE SECTION */}
              <Typography component='div' className='user-price-section'>
                <Typography component='div' className='user-price'>
                  <img src={userImg} alt='enrico-cole' />
                  <Typography component='div'>
                    <Typography component='p'>Creator</Typography>
                    <Typography component='p'>Enrico Cole</Typography>
                  </Typography>
                </Typography>
                <Typography component='div' className='user-price'>
                  <img src={rectangleImg} alt='rectangle' />
                  <Typography component='div'>
                    <Typography component='p'>Instant price</Typography>
                    <Typography component='p'>3.5 ETH</Typography>
                  </Typography>
                </Typography>
              </Typography>
              {/* USER PRICE SECTION END */}

              {/* CURRENT BID SECTION */}
              <Typography component='div' className='current-bid'>
                <Typography component='p' className='title'>Current Bid</Typography>
                <Typography variant='h1' component='h2' className='eth-title'>1.00 ETH</Typography>
                <Typography component='p' className='price'>$3,618.36</Typography>
                <Typography component='p' className='title'>Auction ending in</Typography>
                <Typography component='div' className='time-section'>
                  <Typography component='div'>
                    <Typography variant='h1' component='h2'>19</Typography>
                    <Typography component='p'>Hrs</Typography>
                  </Typography>
                  <Typography component='div'>
                    <Typography variant='h1' component='h2'>24</Typography>
                    <Typography component='p'>mins</Typography>
                  </Typography>
                  <Typography component='div'>
                    <Typography variant='h1' component='h2'>19</Typography>
                    <Typography component='p'>secs</Typography>
                  </Typography>
                </Typography>
              </Typography>
              {/* CURRENT BID SECTION END */}

              <Button variant='contained' className='fill-btn'>Place a bid</Button>
              <Button variant='contained' className='white-btn'>View item</Button>

              <Typography component='div' className='arrow-section'>
                <IconButton aria-label="delete" size="small">
                  <img src={leftArrowImg} alt='left arrow' />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <img src={leftArrowImg} alt='left arrow' />
                </IconButton>
              </Typography>

            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}

export default BuyNFTs;
