import { all, AllEffect } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import authSaga from './authSaga';

function* rootSaga(): Generator<AllEffect<SagaIterator>, void, unknown> {
  yield all([authSaga()]);
}

export default rootSaga;
