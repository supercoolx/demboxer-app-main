import React, { useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import plusImage from "../../../assets/icons/plus.svg";
import "./style.scss";
import Modal from "../../../components/Modal/AddCardModal";

const AddPayment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "$ 0, 00",
      card: "MasterCard **** 4600",
      cvv: "000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      phone: "+ 4 000 000 00 00",
      email: "user@domain.com",
    },
  });

  const onSubmit = (data) => console.log(data);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Typography component="div" className="add-payment">
      <Modal
        modalIsOpen={showDialog}
        closeModal={() => setShowDialog(false)}
        // dialogData={dialogData}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} className="pay-with-card">
          <Typography component="h2" className="title">
            Pay with card
          </Typography>
          <Typography className="description">DemBoxer API Sandbox</Typography>

          {/* MAKE PAYMENT FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography component="div" className="form-control">
              <label>Amount:</label>
              <input
                type="text"
                {...register("amount", { required: true })}
                autoComplete="off"
              />
              {errors?.amount?.type === "required" && (
                <p>This field is required</p>
              )}
            </Typography>
            <Typography component="div" className="form-control">
              <label>Select Card</label>
              <input
                type="text"
                {...register("card", { required: true })}
                autoComplete="off"
              />
              {errors?.card?.type === "required" && (
                <p>This field is required</p>
              )}
            </Typography>
            <Typography component="div" className="form-control">
              <label>CVV</label>
              <input
                type="text"
                {...register("cvv", { required: true })}
                autoComplete="off"
              />
              {errors?.cvv?.type === "required" && (
                <p>This field is required</p>
              )}
            </Typography>
            <Typography component="div" className="form-control">
              <label>description</label>
              <input
                type="text"
                {...register("description", { required: true })}
                autoComplete="off"
              />
              {errors?.description?.type === "required" && (
                <p>This field is required</p>
              )}
            </Typography>
            <Typography component="div" className="form-control">
              <label>phone</label>
              <input
                type="text"
                {...register("phone", { required: true })}
                autoComplete="off"
              />
              {errors?.phone?.type === "required" && (
                <p>This field is required</p>
              )}
            </Typography>
            <Typography component="div" className="form-control">
              <label>email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                autoComplete="off"
              />
              {errors?.email?.type === "required" && (
                <p>This field is required</p>
              )}
              {errors?.email?.type === "pattern" && (
                <p>Enter correct email format</p>
              )}
            </Typography>
            <Typography component="div" className="make-payment-btn">
              <Button type="submit" className="fill-btn">
                Make Payment
              </Button>
            </Typography>
          </form>
          {/* MAKE PAYMENT FORM END */}
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="add-card">
          <Typography component="div" className="add-card-btn">
            <Button
              onClick={() => setShowDialog(true)}
              variant="contained"
              className="fill-btn"
            >
              <img src={plusImage} alt="plus icon" />
              Add Card
            </Button>
          </Typography>
        </Grid>
      </Grid>
      {/*  */}
    </Typography>
  );
};

export default AddPayment;
