import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import base from './Base'
import Font from './Font'
import Stroke from './Stroke'
import Text from './Text'

export default combineReducers({
    base,
    Font,
    Stroke,
    routing,
    Text
})
