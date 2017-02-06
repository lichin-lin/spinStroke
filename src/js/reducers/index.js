import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import base from './Base'
import Stroke from './Stroke'

export default combineReducers({
    base,
    Stroke,
    routing
})
