import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice/authSlice';
import rootSaga from './sagas/rootSaga';

const rootReducer = {
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
