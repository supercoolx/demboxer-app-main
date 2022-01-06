import axios from "axios";

const API_URL = process.env.REACT_APP_ENDPOINT;

class Stripe {
  updateCustomer(user_id) {
    return axios
      .get(API_URL + "stripe/updateCustomer/" + user_id)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  addCard(user_id, profile) {
    var data = {
      card_number: profile.card_number,
      exp_month: profile.exp_month,
      exp_year: profile.exp_year,
      cvc: profile.cvc,

      user_name: profile.user_name,
      email: profile.email,
      phone: profile.mobile_number,

      city: profile.city,
      country: profile.country,
      line1: profile.line1,
      line2: profile.line2,
      postal_code: profile.postal_code,
      state: profile.state,
    };

    return axios
      .post(API_URL + "stripe/addCard/" + user_id, data)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  updateCard(pm_id, profile) {
    console.log(pm_id);
    console.log(profile);
    var data = {
      user_name: profile.user_name,
      email: profile.email,
      phone: profile.mobile_number,

      city: profile.city,
      country: profile.country,
      line1: profile.line1,
      line2: profile.line2,
      postal_code: profile.postal_code,
      state: profile.state,
    };

    return axios
      .post(API_URL + "stripe/updateCard/" + pm_id, data)
      .then(async (response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  listCard(user_id) {
    return axios
      .get(API_URL + "stripe/listCard/" + user_id)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  detachCard(pm_id) {
    return axios
      .get(API_URL + "stripe/detachCard/" + pm_id)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }

  getCard(pm_id) {
    return axios
      .get(API_URL + "stripe/retrieveCard/" + pm_id)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error=", error);
        return error;
      });
  }
}

export default new Stripe();
