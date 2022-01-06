import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useAlert } from '../hooks/Context/AlertContext'
import { useUser } from '../hooks/Context/UserContext'
import { useHistory, Link } from "react-router-dom";
import authAPI from "../apis/auth";
import stripeAPI from "../apis/stripe";

function Session({ name }) {
  const history = useHistory();
  const { alert, storeAlert } = useAlert();
  const { user, storeUser } = useUser();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    if (name == "email-verification") {
      authAPI.verifyEmail(query.get("verificationCode"))
        .then(
          response => {
            if (response.status) {
              storeAlert({
                ...alert,
                successSnackbarOpen: true,
                successSnackbarMessage: response.message
              })

              localStorage.setItem("demboxer_token", response.data.token);
              history.push("/explore-NFTs");

              stripeAPI.updateCustomer(response.data.user_id)
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
              history.push("/login");
            }
          },
          error => {
            console.log('error=', error)
            storeAlert({
              ...alert,
              errorSnackbarOpen: true,
              errorSnackbarMessage: error
            })
            history.push("/login");
          }
        )
    } else if (name == "reset-password") {
      authAPI.fotgotLinkVerify(query.get("id"))
        .then(
          response => {
            if (response.status) {
              storeUser({
                ...user,
                act_code: query.get("id")
              })

              history.push("/reset-password");
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

  }, [])

  return <></>;
}

export default Session;