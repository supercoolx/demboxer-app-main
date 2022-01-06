import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Typography,
  Container,
  Button,
  Grid,
  Checkbox
} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from 'react-router-dom';
import { useAlert } from '../../hooks/Context/AlertContext'
// call api
import authAPI from "../../apis/auth";
import './style.scss';

const Login = () => {
  const history = useHistory();
  const { alert, storeAlert } = useAlert();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    authAPI.signin(data.email, data.password)
      .then(
        response => {
          if (response.status == true) {
            localStorage.setItem("demboxer_token", response.data.token);
            history.push('/explore-NFTs');
          } else {
            storeAlert({
              ...alert,
              errorSnackbarOpen: true,
              errorSnackbarMessage: response.message
            })
          }
        },
        error => {
          console.log('error=', error)
          storeAlert({
            ...alert,
            errorSnackbarOpen: true,
            errorSnackbarMessage: error
          })
        }
      )
  }; // your form submit function which will invoke after successful validation

  return (
    <Typography component='div' className='login'>
      <Container>
        <Typography component='div' className='component-header-section'>
          <Typography component='span'>Seamlessly Explore & Collect Exlusive nfts.</Typography>
          <Typography variant='h1' component='h2' className='title'>NFTs made easy</Typography>
          <Button variant='contained' className='white-btn'>Start</Button>
        </Typography>
        <Grid container spacing={3} className='content'>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className='player-section'
          >
            <Typography component='div'>
              <iframe width="100%" height="100%" title="login" src="https://www.youtube.com/embed/TKfS5zVfGBc"></iframe>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className='login-content'
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant='h1' component='h2' className='title'>Login.</Typography>
              <Typography component='div' className='form-control'>
                <label>your email</label>
                <input
                  type='email'
                  {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                  autoComplete='off'
                />
                {errors?.email?.type === "required" && <p>This field is required</p>}
                {errors?.email?.type === "pattern" && (
                  <p>Enter correct email format</p>
                )}
              </Typography>
              <Typography component='div' className='form-control'>
                <label>Password</label>
                <input type='password' {...register("password", { required: true, minLength: 6 })} />
                {errors?.password?.type === "required" && <p>This field is required</p>}
                {errors?.password?.type === "minLength" && (
                  <p>Password has to be at least 6 characters</p>
                )}
              </Typography>
              <label className='custom-check-box'>
                <Controller
                  name="rememberMe"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => <Checkbox {...field} className='check-box' color='default' />}
                />
                <Typography component='p'>Remember me on this device</Typography>
              </label>

              <Typography component='div'>
                <Button variant='contained' type='submit' className='fill-btn'>Login</Button>
              </Typography>
              <Button color="primary" component={RouterLink} to="/login" className='forgot-password'>Forgot password ?</Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}

export default Login;