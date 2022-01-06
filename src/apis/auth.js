import axios from "axios";

const API_URL = process.env.REACT_APP_ENDPOINT;
console.log(process.env.REACT_APP_ENDPOINT);
class Auth {
  signin(email, pwd) {
    return axios
      .post(API_URL + "users/login", { email: email, pwd: pwd })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  async signout() {
    localStorage.clear();
    return true;
  }

  signup(email, pwd) {
    return axios
      .post(API_URL + "users/signup", { email: email, pwd: pwd })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  forgotPassword(email) {
    return axios
      .post(API_URL + "duser/forgotpassword", { email: email })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  fotgotLinkVerify(act_code) {
    return axios
      .get(API_URL + "duser/fotgotLinkVerify/" + act_code)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  changePassword(userid, passwords) {
    return axios
      .post(API_URL + "users/changePwd/" + userid, {
        oldPwd: passwords.old,
        newPwd: passwords.new,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  resetPassword(passwords) {
    return axios
      .post(API_URL + "duser/resetPassword", passwords)
      .then((response) => {
        console.log(response, "=====");
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  verifyEmail(code) {
    return axios
      .get(API_URL + "users/verifyEmail/" + code)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }
}

export default new Auth();
