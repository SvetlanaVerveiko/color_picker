import { all, takeEvery, put, call } from 'redux-saga/effects'
import request from '../../services/axios/index'
import {
  GET_ADD_NEW_COLOR_REQUEST,
} from './action-types'

import { getAddNewSuccess, getAddNewFailure } from './actions'

export function* getAddNewColor({ color }) {
  const options = {
    method: 'get',
  }
  try {
    yield put(getAddNewSuccess({ color }))
  } catch (error) {
    yield put(getAddNewFailure({ color }))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_ADD_NEW_COLOR_REQUEST, getAddNewColor),
  ])
}
