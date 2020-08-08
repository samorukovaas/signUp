import React, { FC, useEffect, useState, ChangeEvent } from "react";
import firebase from "firebase";
import { RecaptchaVerifier } from "@firebase/auth-types";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { useDispatch } from "react-redux";
import {
  logInPhone,
  sendCodePhone,
} from "../../redux/slices/authSlice/authSlice";
import classes from "./Auth.module.scss";
import ModalWindow from "../SignUp/ModalWindow";
import ModalPassword from "../ForgotPassword/ModalPassword";

type PhoneAuthProps = {
  phoneCode: string;
  phoneInput: string;
  codeSent: boolean;
  setPhoneCode: (code: string) => void;
  setPhoneInput: (value: string) => void;
};

let recaptchaVerifier: RecaptchaVerifier | null = null;

const PhoneAuth: FC<PhoneAuthProps> = ({
  phoneCode,
  phoneInput,
  codeSent,
  setPhoneCode,
  setPhoneInput,
}: PhoneAuthProps) => {
  const [inputError, setInputError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const phoneInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== "") {
      setInputError(false);
      setPhoneInput(e.target.value);
    } else {
      setInputError(true);
      setPhoneInput(e.target.value);
    }
  };

  const phoneCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== "") {
      setCodeError(false);
      setPhoneCode(e.target.value);
    } else {
      setCodeError(true);
      setPhoneCode(e.target.value);
    }
  };

  const handleSignInWithPhone = (): void => {
    if (recaptchaVerifier && !inputError) {
      dispatch(logInPhone({ phoneInput, verifier: recaptchaVerifier }));
    }
  };

  const handleConfirmWithCode = (): void => {
    if (!codeError) {
      dispatch(sendCodePhone({ phoneCode }));
    }
  };

  useEffect((): void => {
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier("signinbutton", {
      size: "invisible",
    });
  }, []);

  return (
    <div className={classes.group}>
      {codeSent && (
        <div className={classes.inputGroup}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel
              classes={{ root: classes.label, shrink: classes.labelFocused }}
              htmlFor="confirm-code"
            >
              {t("Сonfirmation code")}
            </InputLabel>
            <OutlinedInput
              id="confirm-code"
              className={classes.input}
              type="text"
              value={phoneCode}
              onChange={phoneCodeChange}
              label={t("Сonfirmation code")}
              autoFocus
            />
            <Button
              type="button"
              onClick={handleConfirmWithCode}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {t("Send")}
            </Button>
          </FormControl>
        </div>
      )}
      <>
        <div
          className={classes.inputGroup}
          style={codeSent ? { height: 0, visibility: "hidden" } : {}}
        >
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel
              classes={{ root: classes.label, shrink: classes.labelFocused }}
              htmlFor="input-phone"
            >
              {t("Phone number")}
            </InputLabel>
            <OutlinedInput
              id="input-phone"
              className={classes.input}
              type="text"
              value={phoneInput}
              onChange={phoneInputChange}
              label={t("Phone number")}
            />
            <Button
              type="button"
              id="signinbutton"
              onClick={handleSignInWithPhone}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {t("Login")}
            </Button>
          </FormControl>
        </div>

        <div className={classes.helper}>
          <ModalWindow />
          <ModalPassword />
        </div>
      </>
    </div>
  );
};

export default PhoneAuth;
