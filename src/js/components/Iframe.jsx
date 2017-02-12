import React, { Component } from 'react'
import Containers from 'js/containers'

export default class extends Component {
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
}
