import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import color from './color/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    color
  })
