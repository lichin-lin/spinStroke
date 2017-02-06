import React, { Component } from 'react'
// import Containers from 'js/containers'
// import Components from 'js/components'
import CSSModules from 'react-css-modules'

export default CSSModules(class extends Component {
    componentDidMount () {
    }
    render () {
        return (
            <div className="app">
                {/* <Containers.common.Nav /> */}
                <div className="body margin-top">
                    { this.props.children }
                </div>
                {/* { process.env.NODE_ENV !== 'production' ? <Containers.DevTools/> : null } */}
            </div>
        )
    }
}, require('./sass/main.scss'))
