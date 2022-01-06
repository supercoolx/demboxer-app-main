import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';

import MyAssets from '../../components/MyAssets/MyAssets';
import SentBids from '../../components/MyAssets/SentBids';
import ReceivedOffers from '../../components/MyAssets/ReceivedOffers';
import CustomTabs from '../../components/CustomTabs';
import { PageTitle } from '../../global/AppContext';

const MyAssetsPage = () => {
  const [pageTitle, setPageTitle] = useContext(PageTitle);
  const menuList = ['My Assets', 'Sent Bids', 'Received Offers'];

  /**
   * Set page title
   * @param {String} index 
   */
  const handleBtnClick = (index) => {
    setPageTitle(index);
  }

  return (
    <Typography component='div'>
      <CustomTabs menuList={menuList} pageTitle={pageTitle} handleBtnClick={handleBtnClick} />
      {pageTitle === 'My Assets' && <MyAssets />}
      {pageTitle === 'Sent Bids' && <SentBids />}
      {pageTitle === 'Received Offers' && <ReceivedOffers />}
    </Typography>
  )
}

export default MyAssetsPage;