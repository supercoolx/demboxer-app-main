import axios from "axios"

const API_URL = process.env.REACT_APP_ENDPOINT;

class User {
  getProfile(token) {
    return axios
      .post(API_URL + "users/getProfile/", {token: token})
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateEmail(userid, email) {
    return axios
      .post(API_URL + "users/changeEmail/" + userid, {email: email})
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateProfile = (id, profile, data) => {
    const formData = new FormData();
    formData.append('avatar', data);
    formData.append('name', profile.name);
    formData.append('dob', profile.dob);
    formData.append('mobile_number', profile.mobile_number);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        let pCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    };
    return axios.post(API_URL + "users/updateProfile/" + id, formData, config)
      .then(res => {
        if (res && res.data) {
          return res.data
        }
      },
        error => {
          return error;
        }
      );
  }
}

export default new User();
