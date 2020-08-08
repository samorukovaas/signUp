/* eslint-disable no-alert */
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logInGoogle } from '../../redux/slices/authSlice/authSlice';
import classes from './Auth.module.scss';

type GoogleAuthProps = {
  codeSent: boolean;
};

const GoogleAuth: FC<GoogleAuthProps> = ({ codeSent }: GoogleAuthProps) => {
  const dispatch = useDispatch();

  const signInWithGoogle = (): void => {
    dispatch(logInGoogle());
  };
  const { t } = useTranslation();

  return (
    <>
      {!codeSent && (
        <Button
          type="button"
          onClick={signInWithGoogle}
          variant="contained"
          color="primary"
          className={classes.googleButton}
        >
          {t('Sign in with Google')}
        </Button>
      )}
    </>
  );
};

export default GoogleAuth;
