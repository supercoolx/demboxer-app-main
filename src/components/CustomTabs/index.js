import React from 'react';
import {
  Button,
  Typography
} from '@material-ui/core';
import './style.scss';

const CustomTabs = (props) => {
  const { menuList, pageTitle, handleBtnClick } = props;

  return (
    <Typography component='div' className='tabs-list'>
      {
        menuList && menuList.length > 0 && menuList.map((item, i) => (
          <Button className={pageTitle === item ? 'active' : 'item'} onClick={() => handleBtnClick(item)} key={i}>{item}</Button>
        ))
      }
    </Typography>
  )
}

export default CustomTabs;