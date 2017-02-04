import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from './stores/Store'
import { syncHistoryWithStore } from 'react-router-redux'
const history = syncHistoryWithStore(browserHistory, store)

// import Components from 'js/components'
import Containers from 'js/containers'

const checkLogin = (next) => {
    if (Object.keys(store.getState().Session.AuthData).length === 0) {
        browserHistory.push('/login')
    }
}

export default class Root extends Component {
    render () {
        return (
            <Router history={history}>
                <Route path="/" component={Containers.App} onEnter={checkLogin} >
                    <IndexRoute component={Containers.Base} />
                    <Route path="SAT" component={Containers.SAT} />
                    <Route path="chart" component={Containers.Chart} />
                </Route>
                <Route path="/login" component={Containers.Login} />
            </Router>

        )
    }
}
