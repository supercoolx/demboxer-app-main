import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Dialog
} from '@material-ui/core';

import Item from '../../ExploreNFTs/Item';
import BidPopUp from '../../ExploreNFTs/BidPopUp';
import { myAssetsData } from '../../../dumy/data';
import './style.scss';

const MyAssets = () => {
  const [data, setData] = useState([]);
  const [isBidOpen, setIsBidOpen] = useState(false);

  useEffect(() => {
    setData(myAssetsData);
  }, [])

  const handleOpen = () => {
    setIsBidOpen(true);
  }

  const handleClose = () => {
    setIsBidOpen(false);
  }


  return (
    <Typography component='div' className='my-assets'>
      <Grid container spacing={4}>
        {
          data && data.length > 0 && data.map((item, i) => (
            <Item item={item} handleOpen={handleOpen} key={i} />
          ))
        }
      </Grid>
      {/* BID POPUP */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isBidOpen}
        className='customize-popup'
      >
        <BidPopUp
          handleClose={handleClose}
        />
      </Dialog>
      {/* BID POPUP END */}
    </Typography>
  )
}

export default MyAssets;