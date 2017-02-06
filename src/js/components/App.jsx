import React, { Component } from 'react'
import Containers from 'js/containers'
import CSSModules from 'react-css-modules'

export default CSSModules(class extends Component {
    componentDidMount () {
    }
    render () {
        return (
            <div className="app">
                { this.props.children }
                { process.env.NODE_ENV !== 'production' ? <Containers.DevTools/> : null }
            </div>
        )
    }
}, require('./../../sass/main.scss'))
