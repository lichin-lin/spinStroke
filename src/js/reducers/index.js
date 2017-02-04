import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { firebaseStateReducer } from 'redux-react-firebase'
import base from './Base'
import Session from './Session'
import SAT from './SAT'

export default combineReducers({
    base,
    Session,
    SAT,
    firebase: firebaseStateReducer,
    routing
})
