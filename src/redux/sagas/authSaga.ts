import { take, call, put, fork, takeLatest, cancel } from "redux-saga/effects";
import { eventChannel, EventChannel } from "redux-saga";
import { SagaIterator } from "@redux-saga/core";
import { AnyAction } from "redux";
import { firebaseAuth } from "../../firebase/firebase";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  codeSent,
  logInPhone,
  logInGoogle,
  sendCodePhone,
  logOut,
  logOutSuccess,
  startObserver,
  finishObserver,
  signUpSuccess,
  signUpFailed,
  signUpStart,
  resetPasswordSuccess,
  resetPasswordFail,
  passwordReminder,
} from "../slices/authSlice/authSlice";
import {
  signInPhone,
  confirmByCode,
  signInGoogle,
  signOut,
  emailPasswordSignup,
  emailPasswordReminder,
} from "../../api/authApi";

function* handlePasswordReminder(action: AnyAction): SagaIterator {
  try {
    yield call(emailPasswordReminder, action.payload.email);

    yield put(resetPasswordSuccess);
  } catch (err) {
    yield put(resetPasswordFail);
  }
}

export function* signUp(action: AnyAction): SagaIterator {
  try {
    const { user } = yield call(
      emailPasswordSignup,
      action.payload.email,
      action.payload.password
    );
    yield put(signUpSuccess({ user }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

const observerChannel = (): EventChannel<unknown> => {
  return eventChannel((emitter) => {
    const observerUnsubscribe = firebaseAuth.onAuthStateChanged(
      (currentUser) => {
        if (currentUser) {
          emitter(currentUser);
        } else {
          emitter("");
        }
      }
    );

    return (): void => {
      observerUnsubscribe();
    };
  });
};

function* startAuthObserverSaga(): SagaIterator {
  const authObserverChannel = yield call(observerChannel);
  try {
    while (true) {
      const res = yield take(authObserverChannel);
      if (res !== "") {
        yield put(fetchUserSuccess(res));
      } else {
        yield put(fetchUserFailure(null));
      }
    }
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

function* observerFlow(): SagaIterator {
  while (true) {
    yield take(startObserver.type);
    const observerTask = yield fork(startAuthObserverSaga);
    yield take(finishObserver.type);
    yield cancel(observerTask);
  }
}

function* signInWithPhone(action: AnyAction): SagaIterator {
  if (action.payload.verifier) {
    try {
      yield put(fetchUserStart());
      yield call(
        signInPhone,
        action.payload.phoneInput,
        action.payload.verifier
      );
      yield put(codeSent(true));
    } catch (error) {
      yield put(fetchUserFailure(error.message));
    }
  }
}

function* confirmCode(action: AnyAction): SagaIterator {
  try {
    yield put(fetchUserStart());
    const result = yield call(confirmByCode, action.payload.phoneCode);
    yield put(fetchUserSuccess(result.user));
    yield put(codeSent(false));
  } catch (error) {
    // User couldn't sign in (bad verification code?)
    yield put(fetchUserFailure(error.message));
  }
}

function* signInWithGoogle(): SagaIterator {
  try {
    yield put(fetchUserStart());
    const result = yield call(signInGoogle);
    yield put(fetchUserSuccess(result.user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

function* logOutHelper(): SagaIterator {
  try {
    yield call(signOut);
    yield put(logOutSuccess());
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

function* authSaga(): SagaIterator {
  yield takeLatest(logInPhone.type, signInWithPhone);
  yield takeLatest(sendCodePhone.type, confirmCode);
  yield takeLatest(logInGoogle.type, signInWithGoogle);
  yield takeLatest(logOut.type, logOutHelper);
  yield fork(observerFlow);
  yield takeLatest(signUpStart.type, signUp);
  yield takeLatest(passwordReminder.type, handlePasswordReminder);
}

export default authSaga;
