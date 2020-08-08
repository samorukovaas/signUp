import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../redux/slices/authSlice/authSlice";
import {
  Button,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@material-ui/core";
import classes from "./SignUp.module.scss";

type SignUpProps = {
  email?: string;
  password?: string;
  displayName?: string;
};

const SignUp: FC<SignUpProps> = ({
  email,
  password,
  displayName,
}: SignUpProps): any => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().min(3, "Слишком короткое имя"),
      email: Yup.string().email("Введите корректный email"),
      password: Yup.string()
        .matches(/[0-9a-zA-Z]/, "Пароль должен содержать латинские буквы")
        .matches(/(?=.*[A-Z])/, "Пароль должен содержать заглавную букву")
        .matches(/(?=.*[0-9])/, "Пароль должен содержать одну цифру")
        .min(8, "Пароль должен быть не менее 8 символов"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Пароли не совпадает"
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        signUpStart({
          email: formik.values.email,
          password: formik.values.password,
          displayName: formik.values.displayName,
        })
      );
    },
  });

  return (
    <div className="container ">
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            classes={{ root: classes.label, shrink: classes.labelFocused }}
            htmlFor="displayName"
          >
            {"Имя"}
          </InputLabel>
          <OutlinedInput
            id="displayName"
            className={classes.input}
            type="text"
            value={formik.values.displayName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Имя"}
            autoFocus
            required
          />
        </FormControl>
        {formik.touched.displayName && formik.errors.displayName ? (
          <small style={{ color: "red" }}>{formik.errors.displayName}</small>
        ) : null}
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
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            classes={{ root: classes.label, shrink: classes.labelFocused }}
            htmlFor="password"
          >
            {"Пароль"}
          </InputLabel>
          <OutlinedInput
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            label="Пароль"
            required
          />
        </FormControl>
        {formik.touched.password && formik.errors.password ? (
          <small style={{ color: "red" }}>{formik.errors.password}</small>
        ) : null}
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            classes={{ root: classes.label, shrink: classes.labelFocused }}
            htmlFor="confirmPassword"
          >
            {"Подтвердите пароль"}
          </InputLabel>
          <OutlinedInput
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            label="Подтвердите пароль"
            required
          />
        </FormControl>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <small style={{ color: "red" }}>
            {formik.errors.confirmPassword}
          </small>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
