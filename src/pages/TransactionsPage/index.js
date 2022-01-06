import React from 'react';
import {
  Typography
} from '@material-ui/core';
import Main from '../../components/Transactions/Main';
import './style.scss';

const TransactionsPage = () => {
  return (
    <Typography component='div' className='transaction-page'>
      <Main />
    </Typography>
  )
}

export default TransactionsPage;