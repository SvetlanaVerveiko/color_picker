import initialState from './state'
import {
  GET_ADD_NEW_COLOR_REQUEST,
  GET_ADD_NEW_COLOR_SUCCESS,
  GET_ADD_NEW_COLOR_FAILURE
} from './action-types'

export default function colorReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_ADD_NEW_COLOR_REQUEST:
      return { ...state, loading: true }
    case GET_ADD_NEW_COLOR_SUCCESS:
        return { 
          ...state,
          colors: state.colors.concat(payload.color).filter(
            (filterArr => a => !filterArr[a.hex] && (filterArr[a.hex] = true))(Object.create(null))
          ),
          loading: false 
        }
    case GET_ADD_NEW_COLOR_FAILURE:
      return { 
        ...state,
        colors: state.colors.concat(payload.color).filter(
          (filterArr => a => !filterArr[a.hex] && (filterArr[a.hex] = true))(Object.create(null))
        ),
        loading: false 
      }
    default:
      return state
  }
}
