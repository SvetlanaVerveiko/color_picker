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
    const { data: { colors }} = yield call(request, `https://api.color.pizza/v1/${color}`, options)
    yield put(getAddNewSuccess({ color: colors }))
  } catch (error) {
    yield put(getAddNewFailure({ colors: {
      name: `#${color}`,
      hex: `#${color}`
    }}))
    console.log(error)
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_ADD_NEW_COLOR_REQUEST, getAddNewColor)
  ])
}
