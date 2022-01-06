import React, { useState } from 'react';
import {
  Typography
} from '@material-ui/core';
import Repositries from '../../components/Developers/Repositries';
import CustomTabs from '../../components/CustomTabs';

const DevelopersPage = () => {
  const [pageTitle, setPageTitle] = useState('Repositories');
  const menuList = ['Repositories', 'Packages', 'People', 'Projects'];

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
      {pageTitle === 'Repositories' && <Repositries />}
    </Typography>
  )
}

export default DevelopersPage;