import { all } from 'redux-saga/effects'
import color from './color/sagas'

export default function* rootSaga() {
  yield all([
    color()
  ])
}
