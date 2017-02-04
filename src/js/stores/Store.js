// import { createStore, compose, applyMiddleware } from 'redux'
import { createStore, compose, applyMiddleware } from 'redux'
import {reduxReactFirebase} from 'redux-react-firebase'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

function configureStore () {
    const middleware = [thunk, promiseMiddleware]

    const config = {
        apiKey: 'AIzaSyDBaa3EU9oHINKc4iVzqG8TfIcKvoUk3KM',
        authDomain: 'sat-transtable.firebaseapp.com',
        databaseURL: 'https://sat-transtable.firebaseio.com',
        storageBucket: 'sat-transtable.appspot.com',
        messagingSenderId: '564068329530'
    }

    const finalCreateStore = compose(
        reduxReactFirebase(config),
        applyMiddleware(...middleware),
        DevTools.instrument(),
        window.devToolsExtensio ? window.devToolsExtension() : f => f
    )(createStore)

    let store = finalCreateStore(rootReducer)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore()
