import * as firebase from "firebase";
import {
  UserCredential,
  ConfirmationResult,
  RecaptchaVerifier,
  GoogleAuthProvider,
} from "@firebase/auth-types";
import { firebaseAuth } from "../firebase/firebase";

let confirmationResult: ConfirmationResult;

export const signInPhone = (
  phoneInput: string,
  verifier: RecaptchaVerifier
): Promise<void> =>
  firebaseAuth
    .signInWithPhoneNumber(phoneInput, verifier)
    .then((receivedConfirmResult: ConfirmationResult): void => {
      // SMS sent.
      // Sign the user in with confirmationResult.confirm(code).
      confirmationResult = receivedConfirmResult;
    });

export const confirmByCode = (phoneCode: string): Promise<UserCredential> =>
  confirmationResult.confirm(phoneCode);

const googleProvider: GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInGoogle = (): Promise<UserCredential> =>
  firebaseAuth.signInWithPopup(googleProvider);

export const signOut = (): Promise<void> => firebaseAuth.signOut();

export const emailPasswordSignup = (
  email: string,
  password: string
): Promise<any> => firebaseAuth.createUserWithEmailAndPassword(email, password);

export const emailPasswordReminder = (email: string): Promise<any> =>
  firebaseAuth.sendPasswordResetEmail(email);
