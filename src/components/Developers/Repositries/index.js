import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Link
} from '@material-ui/core';
import { repositories } from '../../../dumy/data';
import linkIcon from '../../../assets/icons/git-link.svg';
import skillIcon from '../../../assets/icons/git-skill.svg';
import starIcon from '../../../assets/icons/git-star.svg';
import fileIcon from '../../../assets/icons/file.svg';
import './style.scss';

const Repositries = () => {
  const [repoData, setRepoData] = useState([]);

  useEffect(() => {
    setRepoData(repositories)
  }, [])

  return (
    <Typography component='div' className='repositories'>
      <Grid container spacing={4}>
        {
          repoData && repoData.length > 0 && repoData.map((item, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className='repositories-item'
              key={i}
            >
              <Typography component='div'>
                <Typography component='div' className='git-file'>
                  <img src={fileIcon} alt='file' />
                  {/* <Typography className='name'>{item?.name}</Typography> */}
                  <Link href="#" target='_blank'>{item?.name}</Link>
                </Typography>
                <Typography className='description'>{item.description}</Typography>
                <Typography component='div' className='detail'>
                  <Typography component='div' className='skill'>
                    <img src={skillIcon} alt='skill' />
                    <Typography>{item.skill}</Typography>
                  </Typography>
                  <Typography component='div' className='star'>
                    <img src={starIcon} alt='star' />
                    <Typography>{item.star}</Typography>
                  </Typography>
                  <Typography component='div' className='link'>
                    <img src={linkIcon} alt='link' />
                    <Typography>{item.link}</Typography>
                  </Typography>
                </Typography>
              </Typography>
            </Grid>
          ))
        }

      </Grid>
    </Typography>
  )
}

export default Repositries;