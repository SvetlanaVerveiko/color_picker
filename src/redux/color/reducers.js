import initialState from './state'
import {
  PUT_COLOR_REQUEST,
  PUT_COLOR_SUCCESS,
  PUT_COLOR_FAILURE,
  GET_ADD_NEW_COLOR_REQUEST,
  GET_ADD_NEW_COLOR_SUCCESS,
  GET_ADD_NEW_COLOR_FAILURE
} from './action-types'

export default function colorReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_ADD_NEW_COLOR_REQUEST:
      return { ...state, loading: true }
    case GET_ADD_NEW_COLOR_SUCCESS:
      return { ...state, loading: false }
    case GET_ADD_NEW_COLOR_FAILURE:
      return { ...state, loading: false }
    default:
      return state
  }
}
