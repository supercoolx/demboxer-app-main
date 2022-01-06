import React, { useContext, useEffect, useState } from 'react';
import {
  useHistory
} from 'react-router-dom';
import notificationImg from '../../assets/icons/notification.svg';
import {
  Container,
  Typography,
  Button,
  Badge
} from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { useWindowSize } from '../../hooks/useWindowSize'

import dollarImg from '../../assets/icons/dollar.svg';
import boxingImg from '../../assets/icons/boxing.svg';
import searchImg from '../../assets/imgs/search.png';
import logoImg from '../../assets/imgs/logo.png';
import './style.scss';
import { LoginUser } from '../../global/AppContext';

const Header = () => {
  const [loginUser, setLoginUser] = useContext(LoginUser);
  const [actvieBtn, setActiveBtn] = useState(null);
  const [isDropDown, setIsDropDown] = useState(false);
  const history = useHistory();
  const windowSize = useWindowSize()
  const auth = loginUser || localStorage.getItem("demboxer_token", null);

  // user dumy data
  const user = {
    photo: 'assets/imgs/user-photo.png',
    metaIndex: '7.00698',
    type: 'ETH'
  }

  useEffect(() => {
    document.addEventListener("click", closeSelect);
    return () => document.removeEventListener("click", closeSelect)
  }, [])

  /**
   * Close logout dropdown by a click
   * @param {Event} e
   */
  const closeSelect = (e) => {
    if (e.target.closest(`.profile-content`)) return;
    setIsDropDown(false);
  }

  useEffect(() => {
    return history.listen((location) => {
      setActiveBtn(location.pathname);
    })
  }, [history])

  /**
   * Go to url by a click
   * @param {String} url
   */
  const linkTo = (url) => {
    history.push(url);
  }

  const logout = () => {
    setLoginUser(null);
    localStorage.clear();
    history.push('/login');
  }

  return (
    <div className='header'>
      <Container className='container'>
        <Typography component='div' className='header-content'>
          <Typography component='div' className='logo-section'>
            <Typography component='div' className='logo-icon-list' onClick={() => linkTo('/')}>
              <img src={dollarImg} aria-hidden alt='dollar image' />
              <img src={boxingImg} aria-hidden alt='boxing image' />
            </Typography>
            <Typography
              component='div'
              className='header-logo'
              onClick={() => linkTo('/')}
              style={{ backgroundImage: `url(${logoImg})` }}
            />
            <Typography component='div' className='divider' />
          </Typography>
          <Typography component='div' className='action-section'>
            {
              windowSize.width > 576 && (
                <Typography component='div' className='search-block'>
                  <input type='text' placeholder='Search' className='custom-input' />
                  <img src={searchImg} aria-hidden alt='search image' />
                </Typography>
              )
            }
            <Badge badgeContent=' ' className='bage'>
              <img src={notificationImg} aria-hidden alt='notification-image' />
            </Badge>
            {
              auth ? (
                <Typography component='div' className='user-profile'>
                  <Typography component='div' className='profile-content' onClick={() => setIsDropDown(true)}>
                    <Typography component='div' className='photo' style={{ backgroundImage: `url(${user?.photo})` }} />
                    <Typography className='meta-index'>{user?.metaIndex} <Typography component='span' className='type'>{user?.type}</Typography></Typography>
                  </Typography>
                  {
                    isDropDown && (
                      <Typography component='div' className='logout-dropdown' onClick={logout}>
                        <ExitToAppRoundedIcon />
                        <Typography>Log out</Typography>
                      </Typography>
                    )
                  }

                </Typography>
              ) : (
                <>
                  <Button
                    onClick={() => linkTo('login')}
                    className={(actvieBtn === '/login' || window.location.pathname === '/login') ? 'fill-btn login' : 'white-btn login'}
                  >Login</Button>
                  <Button
                    onClick={() => linkTo('register')}
                    className={(actvieBtn === '/register' || window.location.pathname === '/register') ? 'fill-btn register' : 'white-btn register'}
                  >Register</Button>
                </>
              )
            }

          </Typography>
        </Typography>
        {
          windowSize.width < 576 && (
            <Typography component='div' className='search-block mobile-search-block'>
              <input type='text' placeholder='Search' className='custom-input' />
              <img src={searchImg} aria-hidden alt='search image' />
            </Typography>
          )
        }
      </Container >
    </div >
  )
}

export default Header;