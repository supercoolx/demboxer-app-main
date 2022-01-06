import React, { useMemo, useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import "./Modal.css";
import CreditCardInput from "react-credit-card-input";
import SelectCountry from "../../components/SelectCountriesInput/SelectCountry";
import SelectState from "../../components/SelectCountriesInput/SelectState";
import { State } from "country-state-city";
import classes from "./index.module.css";
import countryList from "react-select-country-list";
import { updateObject, checkValidity } from "../../shared/utility";
import stripeAPI from "../../apis/stripe";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { slideInDown, slideInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import userAPI from "../../apis/user";
import { useAlert } from '../../hooks/Context/AlertContext'

const styles = {
  slideInDown: {
    animation: "x .1s",
    animationName: Radium.keyframes(slideInDown, "slideInDown"),
  },
  slideInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideInUp, "slideInUp"),
  },
};

function App(props) {
  const { alert, storeAlert } = useAlert();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [validationForm, setValidationForm] = useState(false);

  const invalidCard = document.getElementsByClassName("sc-eCApnc kIDwYO");
  const handleCardNumberChange = (e) => {
    setCardNumber(e);
  };

  const [expiry, setExpiry] = useState("");
  function handleCardExpiryChange(e) {
    setExpiry(e);
  }

  const [cvc, setCvc] = useState("");
  function handleCardCVCChange(e) {
    setCvc(e);
  }

  const [dialogForm, setDialogForm] = useState({
    cardholderName: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    line1: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    line2: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    city: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    zip: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },
  });

  const dialogHandler = (e, inputIdentifier) => {
    const updateddialogForm = updateObject(dialogForm, {
      [inputIdentifier]: updateObject(dialogForm[inputIdentifier], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          dialogForm[inputIdentifier].validation
        ),
        touched: true,
      }),
    });

    let formIsValid = false;
    formIsValid =
      updateddialogForm.cardholderName.valid &&
      updateddialogForm.city.valid &&
      updateddialogForm.line1.valid &&
      updateddialogForm.line2.valid &&
      updateddialogForm.zip.valid &&
      value !== "" &&
      stateValue !== "";

    setDialogForm(updateddialogForm);
    setValidationForm(formIsValid);
  };
  const [value, setValue] = useState("");

  const [stateValue, setStateValue] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  const stateArr = [];

  State.getAllStates().map((el) => {
    if (el.countryCode === value.value) {
      stateArr.push({
        value: el.name,
        label: el.name,
      });
    }
  });

  const options1 = useMemo(() => stateArr, [stateArr]);

  const changeHandler = (value) => {
    setValue(value);
  };

  const changeStateHandler = (value) => {
    // console.log(value);
    setStateValue(value);
  };
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("demboxer_token");
    if (!token) {
      window.history.push("/login");
      return;
    }

    userAPI.getProfile(token).then(
      (response) => {
        if (response.status) {
          console.log(response);
          setUserId(response.data.id);
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
  }, []);

  const onUpdatingCardForm = (e, data) => {
    console.log(expiry.split("/")[1]);
    e.preventDefault();
    const dataToSend = {
      user_name: data.cardholderName.value,
      email: "test@test.com",
      phone: "222",
      city: data.city.value,
      country: value.value,
      line1: data.line1.value,
      line2: data.line2.value,
      postal_code: data.zip.value,
      state: stateValue.value,

      card_number: cardNumber,
      exp_month: expiry.split("/")[0],
      exp_year: expiry.split("/")[1],
      cvc: cvc,
    };
    // console.log(dataToSend);
    userId && stripeAPI.addCard(userId, dataToSend);
  };

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div
          className={showMoreOptions ? "modalChildDivMobile" : "modalChildDiv"}
        >
          <form
            onSubmit={(e) => onUpdatingCardForm(e, dialogForm)}
            style={{ width: "80%", margin: "0 auto" }}
          >
            <div
              style={{
                borderBottom: "1px solid",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  padding: "10px",
                  margin: "3px 0",
                }}
              >
                Add a card
              </p>
            </div>
            <div className="paraContainer">
              <CreditCardInput
                cardNumberInputProps={{
                  value: cardNumber,
                  onChange: (e) => handleCardNumberChange(e.target.value),
                }}
                cardExpiryInputProps={{
                  value: expiry,
                  onChange: (e) => handleCardExpiryChange(e.target.value),
                }}
                cardCVCInputProps={{
                  value: cvc,
                  onChange: (e) => handleCardCVCChange(e.target.value),
                }}
                onError={({ inputName, err }) => {
                  console.log(`credit card input error: ${err}`);
                  setValidationForm(false);
                }}
                fieldClassName="input"
                containerStyle={{
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </div>

            {showMoreOptions ? (
              <div
                className="paraContainer"
                onClick={() => setShowMoreOptions(false)}
                style={styles.slideInUp}
              >
                <p
                  className="para"
                  style={{ color: "#5469d4", cursor: "pointer" }}
                >
                  <MdKeyboardArrowDown /> More options
                </p>
              </div>
            ) : (
              <div
                className="paraContainer"
                onClick={() => setShowMoreOptions(true)}
              >
                <p
                  className="para"
                  style={{ color: "#5469d4", cursor: "pointer" }}
                >
                  <MdKeyboardArrowRight /> More options
                </p>
              </div>
            )}

            {showMoreOptions ? (
              <StyleRoot>
                <div style={styles.slideInDown}>
                  {" "}
                  <div className="paraContainer">
                    <p className="para" style={{ margin: "3px 0" }}>
                      Cardholder name
                    </p>
                  </div>
                  <div className="paraContainer">
                    <input
                      className="textInput"
                      type="text"
                      // placeholder={cardholderName}
                      onChange={(e) => dialogHandler(e, "cardholderName")}
                    />
                  </div>
                  {dialogForm.cardholderName.touched &&
                  dialogForm.cardholderName.valid === false ? (
                    <p style={{ color: "red" }}>
                      {dialogForm.cardholderName.validationError}
                    </p>
                  ) : null}
                  <div className="paraContainer">
                    <p className="para" style={{ margin: "3px 0" }}>
                      Address
                    </p>
                  </div>
                  <div className="addressContainer">
                    <SelectCountry
                      country={
                        props.dialogData && props.dialogData.card.country
                      }
                      options={options}
                      value={value}
                      changeHandler={changeHandler}
                    />
                  </div>
                  <div className="addressContainer">
                    <SelectState
                      options={options1}
                      value={stateValue}
                      changeHandler={changeStateHandler}
                    />
                  </div>
                  <div className="paraContainer">
                    <input
                      className="textInput"
                      type="text"
                      placeholder="Address line 1"
                      onChange={(e) => dialogHandler(e, "line1")}
                    />
                  </div>
                  {dialogForm.line1.touched &&
                  dialogForm.line1.valid === false ? (
                    <p style={{ color: "red" }}>
                      {dialogForm.line1.validationError}
                    </p>
                  ) : (
                    <div style={styles.slideInUp}></div>
                  )}
                  <div className="paraContainer">
                    <input
                      className="textInput"
                      type="text"
                      onChange={(e) => dialogHandler(e, "line2")}
                      placeholder="Address line 2"
                    />
                  </div>
                  {dialogForm.line2.touched &&
                  dialogForm.line2.valid === false ? (
                    <p style={{ color: "red" }}>
                      {dialogForm.line2.validationError}
                    </p>
                  ) : null}
                  <div className="paraContainer">
                    <input
                      className="textInput"
                      type="text"
                      placeholder="City"
                      onChange={(e) => dialogHandler(e, "city")}
                    />
                  </div>
                  {dialogForm.city.touched &&
                  dialogForm.city.valid === false ? (
                    <p style={{ color: "red" }}>
                      {dialogForm.city.validationError}
                    </p>
                  ) : null}
                  <div
                    className="paraContainer"
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      className="textInput"
                      type="text"
                      placeholder="ZIP"
                      onChange={(e) => dialogHandler(e, "zip")}
                    />
                  </div>
                  {dialogForm.zip.touched && dialogForm.zip.valid === false ? (
                    <p style={{ color: "red" }}>
                      {dialogForm.zip.validationError}
                    </p>
                  ) : null}
                  {/*  */}
                </div>
              </StyleRoot>
            ) : null}
            <div style={{ borderTop: "1px solid #ccc" }}>
              <div className="btn-modal-container">
                <button className="cancel-btn" onClick={props.closeModal}>
                  Cancel
                </button>
                {console.log(cardNumber)}
                <button
                  disabled={
                    cardNumber &&
                    cardNumber !== "" &&
                    cvc &&
                    cvc !== "" &&
                    expiry &&
                    expiry !== ""
                  }
                  className={
                    cardNumber &&
                    cardNumber !== "" &&
                    cvc &&
                    cvc !== "" &&
                    expiry &&
                    expiry !== ""
                      ? classes.AllowButton
                      : classes.NotAllowedButton
                    // classes.AllowButton
                  }
                  type="submit"
                >
                  Add Card
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
