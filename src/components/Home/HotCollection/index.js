import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Button
} from '@material-ui/core';

import './style.scss';
import gallery1Img from '../../../assets/imgs/galleryimage1.png';
import list1Img from '../../../assets/imgs/list1.png';
import userImg from '../../../assets/imgs/user.png';

const HotCollection = () => {
  const GalleryData = [
    {id: 1, bigImage: gallery1Img, imageList1: list1Img, imageList2: list1Img, imageList3: list1Img, title: 'demboxer 1', userImg: userImg, name: 'Tyrensse Lyttle', itemNum: 28 },
    {id: 2, bigImage: gallery1Img, imageList1: list1Img, imageList2: list1Img, imageList3: list1Img, title: 'demboxer 2', userImg: userImg, name: 'Tyrensse Lyttle', itemNum: 28 },
    {id: 3, bigImage: gallery1Img, imageList1: list1Img, imageList2: list1Img, imageList3: list1Img, title: 'demboxer 3', userImg: userImg, name: 'Tyrensse Lyttle', itemNum: 28 },
  ]
  return (
    <Typography component='div' className='hot-collection'>
      <Container>
        <Typography variant='h1' component='h2' className='title'>Hot collections to watch</Typography>
        <Grid container spacing={2} className='gallery-section'>
          {
            GalleryData && GalleryData.map((gallery, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={i}
                className='gallery-item'
              >
                <img src={gallery.bigImage} alt='img' />
                <Grid container spacing={1} className='image-list'>
                  <Grid item xs={4}>
                    <img src={gallery.imageList1} alt='listimage' />
                  </Grid>
                  <Grid item xs={4}>
                    <img src={gallery.imageList1} alt='listimage' />
                  </Grid>
                  <Grid item xs={4}>
                    <img src={gallery.imageList1} alt='listimage' />
                  </Grid>
                </Grid>
                <Typography variant='h1' component='h2' className='title'>{gallery.title}</Typography>
                <Typography component='div' className='user-section'>
                  <Typography component='div' className='user-image-section'>
                    <img src={gallery.userImg} alt='user-img' />
                    <Typography component='p'>By {gallery.name}</Typography>
                  </Typography>
                  <Button variant='contained'>{gallery.itemNum} ITEMS</Button>
                </Typography>
              </Grid>
            ))
          }
          
        </Grid>
      </Container>
    </Typography>
  )
}

export default HotCollection;