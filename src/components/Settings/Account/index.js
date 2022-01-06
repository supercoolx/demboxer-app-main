import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import validator from 'validator'
import {
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import placeholder from '../../../assets/imgs/placeholder.png';
import './style.scss';
import { DatePicker } from '../DatePicker'
import { PhoneNumber } from '../PhoneNumber';
import { useAlert } from '../../../hooks/Context/AlertContext'
import { useUser } from '../../../hooks/Context/UserContext'
// call api
import userAPI from "../../../apis/user";
import authAPI from "../../../apis/auth";
import stripeAPI from "../../../apis/stripe";

const SERVER_URL = process.env.REACT_APP_ENDPOINT;

const Account = () => {
  const history = useHistory();
  const { alert, storeAlert } = useAlert();
  const { user, storeUser } = useUser();
  const [formState, setFormState] = useState({ loading: false, changes: { 'name': user.name, 'dob': user.dob, 'mobile': user.mobile_number, 'photo': user.photo }, result: { error: false } });
  const [emailState, setEmailState] = useState({ loading: false, email: user.email, error: false });
  const [passwordState, setPasswordState] = useState({ changes: {}, error: false, alert: '' });
  const formMethods = useForm();
  const emailForm = useForm();

  useEffect(() => {
    setEmailState({ loading: false, email: user.email, error: false });
    setFormState({ loading: false, changes: { 'name': user.name, 'dob': user.dob, 'mobile': user.mobile_number, 'photo': user.photo }, result: { error: false } });
  }, [user])

  const onDateValueChange = (name, val) => {
    let currentChanges = {};
    currentChanges = {
      ...currentChanges,
      [name]: val
    }

    setFormState({
      ...formState,
      changes: { ...formState.changes, ...currentChanges }
    })
  }

  const profileSubmit = () => {
    // if (formState.changes.dob && !validator.isDate(formState.changes.dob)) {
    //   console.log('-----', formState.changes.dob);
    //   return;
    // }

    const profile = {
      name: formState.changes.name,
      dob: formState.changes.dob,
      mobile_number: formState.changes.mobile,
    }

    userAPI.updateProfile(user.user_id, profile, formState.changes.data)
      .then(
        response => {
          if (response.status == true) {
            storeAlert({
              ...alert,
              successSnackbarOpen: true,
              successSnackbarMessage: response.message
            })

            storeUser({
              ...user,
              name: profile.name,
              dob: profile.dob,
              mobile_number: profile.mobile_number,
              photo: response.data.photo === null ? user.photo : SERVER_URL + response.data.photo
            })

            stripeAPI.updateCustomer(user.user_id)
              .then(
                res => {
                  console.log(res.message);
                }
              )
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

  const emailSubmit = () => {
    userAPI.updateEmail(user.user_id, emailState.email)
      .then(
        response => {
          if (response.status == true) {
            storeAlert({
              ...alert,
              successSnackbarOpen: true,
              successSnackbarMessage: response.message
            })
            history.push("/login");
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
  }

  const passwordUpdate = () => {
    if (passwordState.changes?.new &&
      passwordState.changes?.confirm &&
      passwordState.changes?.new === passwordState.changes.confirm
    ) {
      setPasswordState({ ...passwordState, error: false });

      authAPI.changePassword(user.user_id, passwordState.changes)
        .then(
          response => {
            if (response.status == true) {
              storeAlert({
                ...alert,
                successSnackbarOpen: true,
                successSnackbarMessage: response.message
              })
              history.push("/login");
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
    } else {
      setPasswordState({ ...passwordState, error: true, alert: 'Password must be match' })
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordState({ ...passwordState, changes: { ...passwordState.changes, [e.target.name]: e.target.value } })
  }

  /**
   * Edit rofile values
   * @param {Event} e 
   * @param {Boolean} isImg 
  */
  const handleProfileChange = (e, isImg) => {
    let currentChanges = {};
    if (!isImg) {
      currentChanges = {
        ...currentChanges,
        [e.target.name]: e.target.value
      }
    } else if (isImg && e.target.files[0]) {
      currentChanges = {
        ...currentChanges,
        photo: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0]
      }
    }
    
    setFormState({
      ...formState,
      changes: { ...formState.changes, ...currentChanges }
    })
  }

  const handleEmailChange = (evt) => {
    setEmailState({ ...emailState, email: evt.target.value });
  }

  return (
    <Typography component='div' className='settings-account'>
      <Typography component='h2' className='title'>Account Settings</Typography>
      <Typography className='description'>Here you can change the email adress you use on DemBoxer and your password</Typography>

      {/* EMAIL CHANGE */}
      <form onSubmit={emailForm.handleSubmit(emailSubmit)}>
        <Grid container spacing={3} className='email-setting'>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Typography component='div' className='form-control'>
              <label>your email</label>
              <input
                type='email'
                name='email'
                className='standard'
                value={emailState.email}
                {...emailForm.register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                autoComplete='off'
                onChange={handleEmailChange}
              />
              {emailForm.formState.errors?.email?.type === "required" && <p>This field is required</p>}
              {emailForm.formState.errors?.email?.type === "pattern" && <p>Enter correct email format</p>}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Button variant='contained' type='submit' className='fill-btn'>Change</Button>
          </Grid>
        </Grid>
      </form>

      {/* EMAIL CHNANGE END */}

      {/* PASSWORD UPDATE */}
      <Grid container spacing={3} className='password-setting'>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography component='div' className='form-control'>
            <label>Old Password</label>
            <input
              className='standard'
              type='password'
              name='old'
              onChange={handlePasswordChange}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography component='div' className='form-control'>
            <label>New password</label>
            <input
              type='password'
              className='standard'
              name='new'
              onChange={handlePasswordChange}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography component='div' className='form-control'>
            <label>Confirm New Password</label>
            <input
              type='password'
              className='standard'
              name='confirm'
              onChange={handlePasswordChange}
            />
            {passwordState.error && <p>{passwordState.alert}</p>}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
        >
          <Button variant='contained' className='fill-btn' onClick={passwordUpdate}>Update</Button>
        </Grid>
      </Grid>
      {/* PASSWORD UPDATE END */}

      <Typography component='h2' className='title'>Profile Settings</Typography>
      <Typography className='description'>Here you can change your profile information</Typography>

      {/* PROFILE SETTING */}
      <form onSubmit={formMethods.handleSubmit(profileSubmit)} className='profile-setting'>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
          >
            <Typography component='div' className='form-control'>
              <label>your name (First / Middle / Last)</label>
              <input
                type='text'
                name='name'
                className='standard'
                value={formState?.changes?.name || ''}
                onChange={(evt) => handleProfileChange(evt, false)}
                autoComplete='off'
              />
            </Typography>

            {/* DATE PICKER */}
            <DatePicker
              defaultValue={formState?.changes?.dob || null}
              onDateValue={(val) => onDateValueChange('dob', val)}
            />
            {/* DATE PICKER END */}

            {/* PHOBNE NUMBER */}
            <PhoneNumber
              defaultValue={formState?.changes?.mobile || null}
              onDateValue={(val) => onDateValueChange('mobile', val)}
            />
            {/* PHOBNE NUMBER END */}

            <Typography component='div' className='form-control'>
              <label>Confirm Email ID</label>
              <input
                type='text'
                name='emailId'
                className='standard'
                defaultValue={
                  formState?.changes?.emailId || ''
                }
                // {...formMethods.register("emailId", { required: true })}
                onChange={handleProfileChange}
                autoComplete='off'
              />
              {/* {formMethods.formState.errors?.emailId?.type === "required" && <p>This field is required</p>} */}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
          >
            <label className='photo'>
              <input
                type='file'
                className='standard'
                accept="image/*"
                onChange={(evt) => handleProfileChange(evt, true)}
              />
              {
                formState?.changes.photo !== ''
                  ? <Typography component='div' className='default-img'><img src={formState?.changes?.photo} className='image-style' alt='ssss' /></Typography>
                  : <Typography component='div' className='default-img'>
                    <img src={placeholder} alt='placeholder' loading='lazy' />
                  </Typography>
              }
            </label>
          </Grid>
        </Grid>
        <Button variant='contained' type='submit' className='fill-btn profile-update'>Update</Button>
      </form>

      {/* PROFILE SETTING END */}
    </Typography>
  )
}

export default Account;