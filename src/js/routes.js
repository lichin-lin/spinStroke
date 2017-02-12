import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from './stores/Store'
import { syncHistoryWithStore } from 'react-router-redux'
const history = syncHistoryWithStore(browserHistory, store)

import Containers from 'js/containers'

export default class Root extends Component {
    render () {
        return (
            <Router history={history}>
                <Route path="/spinStroke/" component={Containers.App} >
                    <IndexRoute component={Containers.Base} />
                    <Route path="login" component={Containers.Login} />
                    <Route path="stroke" component={Containers.stroke} />
                    <Route path="upload" component={Containers.Upload} />
                </Route>
                <Route path="/spinStroke/iframe" component={Containers.Iframe} />
            </Router>

        )
    }
}
