import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dollarImg from '../../assets/icons/dollar.svg';
import boxingImg from '../../assets/icons/boxing.svg';
import './style.scss';
import MailChimpForm from './MailChimpForm';


const Footer = () => {
  const history = useHistory();
  const [cookie, setCookie] = useState(false);

  /**
   * Go to url by a click
   * @param {String} url
  */
  const linkTo = (url) => {
    history.push(url)
  }

  const cookieAccept = () => {
    setCookie(true);
  }

  return (
    <div className='footer'>
      <Container className='container'>
        <Grid container>

          {/* LOGO SECTION */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className='logo-section'
          >
            <Typography component='div' className='logo-icon-list' onClick={() => linkTo('/')}>
              <img src={dollarImg} aria-hidden alt='dollar image' />
              <img src={boxingImg} aria-hidden alt='boxing image' />
              <Typography component='span'>Demboxer</Typography>
            </Typography>
            <Typography component='div' className='description'>
            NFTs made easy.
            </Typography>
          </Grid>
          {/* LOGO SECTION END */}

          {/* MARKET SECTION */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className='menu-section'
          >
            <Typography component='div'>
              <Typography
                component='span'
                className='title'
              >
                Crypter.
              </Typography>
              <Typography component='div' className='menu-list'>
                <Link to='/about' className={window.location.pathname === '/' ? 'active' : 'item'}>Discover</Link>
                <Link to='/log-in' className={window.location.pathname === '/' ? 'active' : 'item'}>Connect wallet</Link>
                <Link to='/register' className={window.location.pathname === '/' ? 'active' : 'item'}>Create item</Link>
              </Typography>
            </Typography>
          </Grid>
          {/* MARKET SECTION END */}

          {/* INFO SECTION */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className='menu-section'
          >
            <Typography component='div'>
              <Typography
                component='span'
                className='title'
              >
                Info
              </Typography>
              <Typography component='div' className='menu-list'>
                <Link to='/marketplace' className={window.location.pathname === '/' ? 'active' : 'item'}>Download</Link>
                <Link to='/wallet' className={window.location.pathname === '/' ? 'active' : 'item'}>Demos</Link>
                <Link to='/discover' className={window.location.pathname === '/' ? 'active' : 'item'}>Support</Link>
              </Typography>
            </Typography>

          </Grid>
          {/* INFO SECTION END */}

          {/* STAY CONNECTED SECTION */}
          <MailChimpForm />
          {/* STAY CONNECTED SECTION END */}

        </Grid>
        <Typography component='div' className='divider' />
        <Typography component='div' className='copylight-section'>
          <Typography component='span' className='copylight'>Copyright (c) 2021 Demboxer LLC. All right reserved</Typography>
          {
            !cookie && (
              <Typography component='span' className='cookies-bar'>
                We use cookies for better services.
                <Typography component='span' className='accept' onClick={cookieAccept}>Accept</Typography>
              </Typography>
            )
          }
        </Typography>
      </Container>
    </div>
  )
}

export default Footer;