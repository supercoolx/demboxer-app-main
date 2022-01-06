import React, { useCallback, useEffect, useMemo, useState } from "react";
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
// import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { slideInDown, slideInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import StriptAPI from "../../apis/stripe";

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
  const [userCardInfo, setUserCardInfo] = useState();
  const [validationForm, setValidationForm] = useState(false);

  useEffect(() => {
    props.dialogData &&
      StriptAPI.getCard(props.dialogData.id)
        .then((res) => {
          console.log(res);
          if (res.status !== true) {
            throw new Error("failed to fetch card information");
          }
          return res;
        })
        .then((resData) => {
          setUserCardInfo(resData.data);
          setFormToSend({
            cardholderName: {
              value: resData.data.billing_details.name,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
              validationError: "Required",
            },

            line1: {
              value: resData.data.billing_details.address.line1,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
              validationError: "Required",
            },

            line2: {
              value: resData.data.billing_details.address.line2,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
              validationError: "Required",
            },

            city: {
              value: resData.data.billing_details.address.line1,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
              validationError: "Required",
            },

            zip: {
              value: resData.data.billing_details.address.postal_code,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
              validationError: "Required",
            },
          });
        });
  }, [props.dialogData]);

  const dialogForm = useState({
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
  })[0];

  const [formToSend, setFormToSend] = useState({
    cardholderName: {
      value: dialogForm && dialogForm.cardholderName.value,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    line1: {
      value: dialogForm && dialogForm.line1.value,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    line2: {
      value: dialogForm && dialogForm.line2.value,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    city: {
      value: dialogForm && dialogForm.city.value,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },

    zip: {
      value: dialogForm && dialogForm.zip.value,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Required",
    },
  });

  useEffect(() => {
    console.log(formToSend);
    if (
      formToSend &&
      formToSend.cardholderName.value !== "" &&
      formToSend &&
      formToSend.line1.value !== "" &&
      formToSend &&
      formToSend.line2.value !== "" &&
      formToSend &&
      formToSend.city.value !== "" &&
      formToSend &&
      formToSend.zip.value !== ""
    ) {
      setValidationForm(true);
    }
  }, [
    validationForm,
    dialogForm.cardholderName.value,
    dialogForm.line1.value,
    formToSend,
  ]);

  const dialogHandler = (e, inputIdentifier) => {
    const updateddialogForm = updateObject(formToSend, {
      [inputIdentifier]: updateObject(formToSend[inputIdentifier], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          formToSend[inputIdentifier].validation
        ),
        touched: true,
      }),
    });

    console.log(updateddialogForm);
    let formIsValid = false;
    formIsValid =
      updateddialogForm.cardholderName.valid &&
      updateddialogForm.city.valid &&
      updateddialogForm.line1.valid &&
      updateddialogForm.line2.valid &&
      updateddialogForm.zip.valid;

    setFormToSend(updateddialogForm);
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

  // console.log(stateArr);

  const options1 = useMemo(() => stateArr, [stateArr]);

  const changeHandler = (value) => {
    setValue(value);
  };

  const changeStateHandler = (value) => {
    setStateValue(value);
  };

  const onUpdatingCardForm = (e, data) => {
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
    };
    // console.log(dataToSend);
    props.dialogData && stripeAPI.updateCard(props.dialogData.id, dataToSend);
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
        <div className="modalChildDiv">
          {console.log(formToSend)}
          <form
            onSubmit={(e) => onUpdatingCardForm(e, formToSend)}
            style={{ width: "80%", margin: "0 auto" }}
          >
            {/*  */}
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
                Edit Card
              </p>
            </div>

            {/* {showMoreOptions ? (
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
            )} */}

            {/* {showMoreOptions ? (
              
            ) : null} */}
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
                    defaultValue={formToSend.cardholderName.value}
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
                    placeholder={
                      userCardInfo &&
                      userCardInfo.billing_details.address.country
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
                    placeholder={
                      userCardInfo && userCardInfo.billing_details.address.state
                    }
                  />
                </div>
                <div className="paraContainer">
                  {/* {console.log("userCardInfo", userCardInfo)} */}
                  <input
                    className="textInput"
                    type="text"
                    defaultValue={formToSend.line1.value}
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
                    defaultValue={formToSend.line2.value}
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
                    defaultValue={formToSend.city.value}
                    onChange={(e) => dialogHandler(e, "city")}
                  />
                </div>
                {dialogForm.city.touched && dialogForm.city.valid === false ? (
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
                    defaultValue={formToSend.zip.value}
                    onChange={(e) => dialogHandler(e, "zip")}
                  />
                </div>
                {dialogForm.zip.touched && dialogForm.zip.valid === false ? (
                  <p style={{ color: "red" }}>
                    {dialogForm.zip.validationError}
                  </p>
                ) : null}
                <div style={{ borderTop: "1px solid #ccc" }}>
                  <div className="btn-modal-container">
                    <button className="cancel-btn" onClick={props.closeModal}>
                      Cancel
                    </button>
                    {console.log(validationForm)}
                    {/* {console.log(value)} */}
                    <button
                      disabled={
                        !validationForm && value !== "" && stateValue !== ""
                      }
                      className={
                        validationForm && value !== "" && stateValue !== ""
                          ? classes.AllowButton
                          : classes.NotAllowedButton
                      }
                      type="submit"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            </StyleRoot>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
