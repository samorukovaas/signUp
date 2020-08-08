import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { passwordReminder } from "../../redux/slices/authSlice/authSlice";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import classes from "../SignUp/SignUp.module.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Введите корректный email"),
    }),
    onSubmit: (values) => {
      dispatch(
        passwordReminder({
          email: formik.values.email,
        })
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel
          classes={{ root: classes.label, shrink: classes.labelFocused }}
          htmlFor="email"
        >
          {"Электронная почта"}
        </InputLabel>
        <OutlinedInput
          type="text"
          id="email"
          aria-describedby="emailHelp"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          label="Электронная почта"
          required
        />
      </FormControl>
      {formik.touched.email && formik.errors.email ? (
        <small style={{ color: "red" }}>{formik.errors.email}</small>
      ) : null}
      <Button color="primary" type="submit" className={classes.button}>
        Отправить{" "}
      </Button>
    </form>
  );
};

export default ForgotPassword;
