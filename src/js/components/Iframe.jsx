import React, { Component } from 'react'
import Containers from 'js/containers'
import CSSModules from 'react-css-modules'

export default CSSModules(class extends Component {
    componentDidMount () {
    }
    render () {
        var obj = JSON.parse(new Buffer(this.props.location.query.data, 'base64').toString('ascii'))
        console.log("IN Iframe")

        return (
            <div>
                <Containers.stroke {...obj}/>
                { process.env.NODE_ENV !== 'production' ? <Containers.DevTools/> : null }
            </div>
        )
    }
}, require('./Iframe.styl'))
