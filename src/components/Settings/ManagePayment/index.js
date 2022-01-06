import React, { useState, useEffect, useMemo } from "react";
import { Typography, Button, Box } from "@material-ui/core";
import rightArrowImage from "../../../assets/icons/right-arrow.svg";
import { useUser } from "../../../hooks/Context/UserContext";
import { useAlert } from "../../../hooks/Context/AlertContext";
import stripeAPI from "../../../apis/stripe";
import visa_image from "../../../assets/imgs/visa-card.png";
import mastercard_image from "../../../assets/imgs/master-card.png";
import amex_image from "../../../assets/imgs/apple-card.png";
import "./style.scss";
import Modal from "../../../components/Modal/Modal";

const ManagePayment = () => {
  const { user, storeUser } = useUser();
  const { alert, storeAlert } = useAlert();
  const [cardData, setCardData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const getListCard = () => {
    stripeAPI.listCard(user.user_id).then(
      (response) => {
        if (response.status == true) {
          console.log(response);
          setCardData(response.data);
        } else {
          storeAlert({
            ...alert,
            errorSnackbarOpen: true,
            errorSnackbarMessage: response.message,
          });
        }
      },
      (error) => {
        console.log("error=", error);
        storeAlert({
          ...alert,
          errorSnackbarOpen: true,
          errorSnackbarMessage: error,
        });
      }
    );
  };

  useEffect(() => {
    getListCard();
  }, []);

  const removeCard = (id) => {
    var item_id = id;
    stripeAPI.detachCard(item_id).then(
      (response) => {
        if (response.status == true) {
          storeAlert({
            ...alert,
            successSnackbarOpen: true,
            successSnackbarMessage: response.message,
          });
          getListCard();
        } else {
          storeAlert({
            ...alert,
            errorSnackbarOpen: true,
            errorSnackbarMessage: response.message,
          });
        }
      },
      (error) => {
        console.log("error=", error);
        storeAlert({
          ...alert,
          errorSnackbarOpen: true,
          errorSnackbarMessage: error,
        });
      }
    );
  };

  const [dialogData, setDialogData] = useState();

  const getDialogData = (card) => {
    console.log(card);
    setShowDialog(true);
    setDialogData(card);
    // setCardHolderName(card.billing_details.name);
  };

  return (
    <Typography className="manage-payment">
      {console.log(dialogData)}
      <Modal
        modalIsOpen={showDialog}
        closeModal={() => setShowDialog(false)}
        dialogData={dialogData}
      />
      {/*  */}
      {cardData &&
        cardData.length > 0 &&
        cardData.map((item, i) => (
          <Typography className="card-block" key={i}>
            <Typography className="card-image-section">
              <img
                src={
                  item.card.brand === "amex"
                    ? amex_image
                    : item.card.brand === "mastercard"
                    ? mastercard_image
                    : item.card.brand === "visa"
                    ? visa_image
                    : null
                }
                alt="visa card"
              />
            </Typography>
            <Typography className="card-content">
              <Typography className="content">
                <Typography>
                  <Typography component="h2" className="title">
                    {item.card.brand === "amex"
                      ? "American Express credit card"
                      : null}
                    {item.card.brand === "mastercard"
                      ? "Mastercard credit card"
                      : null}
                    {item.card.brand === "visa" ? "Visa credit card" : null}
                  </Typography>
                  <Typography className="card-balance">
                    ****************{item.card.last4}
                  </Typography>
                  <Typography className="card-balance">
                    Expires {item.card.exp_month} / {item.card.exp_year}
                  </Typography>
                </Typography>
                <Typography className="icon-section">
                  <img
                    src={rightArrowImage}
                    className="arrow-icon"
                    alt="right-arrow"
                  />
                </Typography>
              </Typography>
              <Box className="btn-action">
                <Typography>ID: {item.id}</Typography>
                <Typography>Name: {item.billing_details.name}</Typography>
                <Typography>Email: {item.billing_details.email}</Typography>
                <Typography>Phone: {item.billing_details.phone}</Typography>
                <Typography>Fingerprint: {item.card.fingerprint}</Typography>
                <Typography>
                  Billing address : {item.billing_details.address.line1}{" "}
                  {item.billing_details.address.line2}{" "}
                  {item.billing_details.address.city}{" "}
                  {item.billing_details.address.state}{" "}
                  {item.billing_details.address.postal_code}{" "}
                  {item.billing_details.address.country}
                </Typography>
                <div className="btn-container">
                  <Button
                    onClick={() => getDialogData(item)}
                    className="fill-btn"
                  >
                    Edit
                  </Button>
                  <Button
                    className="white-btn"
                    onClick={() => removeCard(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Box>
            </Typography>
          </Typography>
        ))}
    </Typography>
  );
};

export default ManagePayment;
