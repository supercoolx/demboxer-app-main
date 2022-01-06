import React, { useState } from 'react';
import {
  Typography
} from '@material-ui/core';
import CustomTabs from '../../components/CustomTabs';
import AddPayment from '../../components/Settings/AddPayment';
import ManagePayment from '../../components/Settings/ManagePayment';

const PaymentMethodPage = () => {
  const [pageTitle, setPageTitle] = useState('Add New Payment Method');
  const menuList = ['Add New Payment Method', 'Manage Payment Methods'];

  /**
   * Set page title
   * @param {String} index 
   */
  const handleBtnClick = (index) => {
    console.log(index);
    setPageTitle(index);
  }

  return (
    <Typography component='div'>
      <CustomTabs menuList={menuList} pageTitle={pageTitle} handleBtnClick={handleBtnClick} />
      {pageTitle === 'Add New Payment Method' && <AddPayment />}
      {pageTitle === 'Manage Payment Methods' && <ManagePayment />}
    </Typography>
  )
}

export default PaymentMethodPage;