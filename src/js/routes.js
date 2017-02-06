import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from './stores/Store'
import { syncHistoryWithStore } from 'react-router-redux'
const history = syncHistoryWithStore(browserHistory, store)

// import Components from 'js/components'
import Containers from 'js/containers'

export default class Root extends Component {
    render () {
        return (
            <Router history={history}>
                <Route path="/" component={Containers.App} >
                    <IndexRoute component={Containers.Base} />
                </Route>
                <Route path="/login" component={Containers.Login} />
                <Route path="/stroke" component={Containers.stroke} />
            </Router>

        )
    }
}
