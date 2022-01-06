import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Button,
  Divider,
  Grid,
  Collapse
} from '@material-ui/core';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';

import moreIcon from '../../../assets/icons/more.svg';
import './style.scss';

const Item = (props) => {
  const { item, handleOpen } = props;
  const [isShowDetail, setIsShowDetail] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4} className='explore-item'>
      <Typography component='div'>
        <img src={item?.url} alt='item' />
        <Typography component='div' className='title-section'>
          <Typography component='span'>{item?.title}</Typography>
          <IconButton aria-label="delete" size="small">
            <img src={moreIcon} alt='read-more' />
          </IconButton>
        </Typography>
        <Typography component='p' className='description'>{item?.description}</Typography>
        <Divider />
        <Collapse in={isShowDetail}>
          <>
            <Button className='btn-text' onClick={() => setIsShowDetail(false)}>Hide Details <ExpandLessRoundedIcon /></Button>
            <Typography component='div' className='details-section'>
              <Typography>ABOUT:</Typography>
              <Typography>Lorem ipsum dolor</Typography>
            </Typography>
            <Typography component='div' className='details-section'>
              <Typography>Buy Price:</Typography>
              <Typography>$ 1, 234.00</Typography>
            </Typography>
            <Typography component='div' className='details-section'>
              <Typography>Last Bid Price (USD):</Typography>
              <Typography>$ 1, 745.00</Typography>
            </Typography>
            <Typography component='div' className='details-section'>
              <Typography>Narketplace:</Typography>
              <Typography>lorem ipsum</Typography>
            </Typography>
            <Typography component='div' className='btn-section'>
              <Button className='fill-btn' onClick={() => handleOpen(false)}>Bid</Button>
            </Typography>
          </>
        </Collapse>
        { !isShowDetail && <Button className='btn-text' onClick={() => setIsShowDetail(true)}>View Details</Button> }
      </Typography>
    </Grid>

  )
}

export default Item;