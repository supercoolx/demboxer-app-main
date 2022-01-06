import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Dialog
} from '@material-ui/core';

import Item from '../Item';
import FilterPopUp from '../FilterPopUp';
import BidPopUp from '../BidPopUp';
import { exploreNFTsData } from '../../../dumy/data';

import filterImage from '../../../assets/icons/filter.svg';
import './style.scss';

const Main = () => {
  const [data, setData] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBidOpen, setIsBidOpen] = useState(false);

  useEffect(() => {
    setData(exploreNFTsData);
  }, [])

  /**
   * Open PopUp by a button click
   * @param {Boolean} isFilter
  */
  const handleOpen = (isFilter) => {
    if (isFilter) setIsFilterOpen(true);
    else setIsBidOpen(true);
  }

  /**
   * Close PopUp by a close icon click
   * @param {Boolean} isFilter
  */
  const handleClose = (isFilter) => {
    if (isFilter) setIsFilterOpen(false);
    else setIsBidOpen(false);
  }

  return (
    <>
      <Typography component='div' className='explore-NFTs'>
        <Button className='filter-btn-section' onClick={() =>handleOpen(true)}>
          <img src={filterImage} alt='filter' />
          <Typography component='span'>Filter</Typography>
        </Button>
        <Grid container spacing={4}>
          {
            data && data.length > 0 && data.map((item, i) => (
              <Item item={item} handleOpen={handleOpen} key={i} />
            ))
          }
        </Grid>
      </Typography>

      {/* FILTER POPUP */}
      <Dialog
        onClose={() =>handleClose(true)}
        aria-labelledby="customized-dialog-title"
        open={isFilterOpen}
        className='customize-popup'
      >
        <FilterPopUp
          handleClose={handleClose}
        />
      </Dialog>
      {/* FILTER POPUP END */}

      {/* BID POPUP */}
      <Dialog
        onClose={() =>handleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={isBidOpen}
        className='customize-popup'
      >
        <BidPopUp
          handleClose={handleClose}
        />
      </Dialog>
      {/* BID POPUP END */}

    </>
  )
}

export default Main;