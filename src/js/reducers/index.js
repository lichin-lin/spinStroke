import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import base from './Base'
import File from './File'
import Stroke from './Stroke'

export default combineReducers({
    base,
    File,
    Stroke,
    routing
})
