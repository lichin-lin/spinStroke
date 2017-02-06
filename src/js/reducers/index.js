import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import base from './Base'

export default combineReducers({
    base,
    routing
})
