import React, { FC, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import PhoneAuth from "./PhoneAuth";
import GoogleAuth from "./GoogleAuth";
import classes from "./Auth.module.scss";
import { currentUserSelector, codeSentSelector } from "../../redux/selectors";

const Auth: FC = () => {
  const firebaseApp = useFirebase();
  const firebaseAppAuth = firebaseApp.auth();

  const [phoneInput, setPhoneInput] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const { t } = useTranslation();
  const codeSent = useSelector(codeSentSelector);
  const user = useSelector(currentUserSelector);

  useEffect(() => {
    const firebaseUnsubscribe = firebaseAppAuth.onAuthStateChanged(
      (currentUser) => {
        if (!currentUser) {
          setPhoneInput("");
          setPhoneCode("");
        }
      }
    );

    return (): void => {
      firebaseUnsubscribe();
    };
  });

  return (
    <div className={classes.inner}>
      <h3>{t("Enter react Bank")}</h3>
      {!user && codeSent ? (
        <h6>{`${t(
          "The bank sent a confirmation code to the number"
        )} ${phoneInput}`}</h6>
      ) : (
        <h6>{t("Enter your phone number")}</h6>
      )}
      {user && <Redirect to="/" />}

      {!user && (
        <PhoneAuth
          codeSent={codeSent}
          phoneInput={phoneInput}
          setPhoneInput={setPhoneInput}
          phoneCode={phoneCode}
          setPhoneCode={setPhoneCode}
        />
      )}

      {/* {!user && <SignUp />} */}

      {!user && <GoogleAuth codeSent={codeSent} />}
    </div>
  );
};

export default Auth;
