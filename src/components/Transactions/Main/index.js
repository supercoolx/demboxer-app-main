import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import {
  Typography,
  Button,
  Dialog
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import filterImage from '../../../assets/icons/filter.svg';
import tableOrderIcon from '../../../assets/icons/tableOrder.svg';
import { transactionData } from '../../../dumy/data';
import TitlePopUp from '../TitlePopUp';
import './style.scss';

const columns = [
  { id: 'funds', label: 'My Funds', width: 10, format: (value) => value.toFixed(2), isRightBorder: true },
  { id: 'totalEarnings', label: 'Total\u00a0Earnings', width: 13, format: (value) => value.toFixed(2), isRightBorder: true },
  { id: 'NFT', label: 'My NFT’s', width: 10, format: (value) => value.toFixed(2), isRightBorder: true },
  { id: 'index', label: '#', width: 5, isRightBorder: false },
  { id: 'title', label: 'Transaction\u00a0Title', width: 18, isRightBorder: false },
  { id: 'price', label: 'Last Bid Price (USD):', width: 17, format: (value) => value.toLocaleString('en-US'), isRightBorder: false },
  { id: 'transactionId', label: 'Transaction ID', width: 14, isRightBorder: false, isLink: true },
  { id: 'status', label: 'Status', width: 13, isRightBorder: false, isStatus: true }
];

const Main = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);

  /** status data **/
  const statusData = [
    { text: 'Confirmed', color: '#6DD400' },
    { text: 'Confirming', color: '#32C5FF' },
    { text: 'Pending', color: '#F7B500' },
    { text: 'Rejected', color: '#F03737' }
  ]

  useEffect(() => {
    setTransactions(transactionData);
  }, [])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Typography component='div' className='transactions'>
      <Typography component='div' className='header-section'>
        <Typography>All transactions</Typography>
        <Button className='filter-btn-section' onClick={handleOpen}>
          <img src={filterImage} alt='filter' />
          <Typography component='span'>Filter</Typography>
        </Button>
      </Typography>

      {/* TABLE SECTION */}
      <Typography component='div' className='transactions-table-section'>
        <Typography component='div' className='table-content-layout'>
          <Typography component='div' className='table-content'>
            <Typography component='div' className='table-head'>
              {columns.map((column) => (
                <Typography component='div'
                  key={column.id}
                  style={{ width: `${column.width}%` }}
                >
                  <Typography component='p'>{column.label}</Typography>
                  {column.id === 'title' && <img src={tableOrderIcon} alt='tableOrder' />}
                </Typography>
              ))}
            </Typography>

            {/* TABEL BODY */}
            <Typography component='div' className='table-body'>
              {transactions && transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                return (
                  <Typography component='div' className='table-row' key={i}>
                    {columns.map((column, j) => {
                      const value = row[column.id];
                      return (
                        <Typography component='div' key={j} style={{ width: `${column.width}%` }}>
                          {column.isRightBorder && (
                            <Typography component='div' className='right-border'>
                              <Typography>{`$${column.format(value)}`}</Typography>
                            </Typography>
                          )}
                          {column.isLink && <Link href={value} variant="body2">{value}</Link>}
                          {column.isStatus && (
                            <Typography component='div' className='status'>
                              <Typography component='div' style={{ background: statusData[value].color }} />
                              <Typography>{statusData[value].text}</Typography>
                            </Typography>
                          )}
                          {!column.isRightBorder && !column.isLink && !column.isStatus && (
                            <Typography>{column.format && typeof value === 'number' ? `$${column.format(value)}` : value}</Typography>
                          )}
                        </Typography>
                      );
                    })}
                  </Typography>
                );
              })}
            </Typography>
            {/* TABEL BODY END */}
          </Typography>
        </Typography>

        {/* TABLE SECTION */}

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className='pagination'
        />
      </Typography>
      {/* TABLE SECTION END */}

      {/* TITLE POPUP */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='customize-popup'
      >
        <TitlePopUp
          handleClose={handleClose}
        />
      </Dialog>
      {/* TITLE POPUP END */}

    </Typography>
  )
}

export default Main;