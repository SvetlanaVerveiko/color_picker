import {
  GET_ADD_NEW_COLOR_REQUEST,
  GET_ADD_NEW_COLOR_SUCCESS,
  GET_ADD_NEW_COLOR_FAILURE
  
} from './action-types'

export function getAddNewRequest({ color }) {
  return { type: GET_ADD_NEW_COLOR_REQUEST, payload: { color } }
}
export function getAddNewSuccess({ color }) {
  return { type: GET_ADD_NEW_COLOR_SUCCESS, payload: { color } }
}
export function getAddNewFailure({ color }) {
  return { type: GET_ADD_NEW_COLOR_FAILURE, payload: { color } }
}
