import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import base from './Base'
import File from './File'
import Font from './Font'
import Stroke from './Stroke'
import Text from './Text'

export default combineReducers({
    base,
    File,
    Font,
    Stroke,
    routing,
    Text
})
