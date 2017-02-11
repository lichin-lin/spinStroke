import React, { Component } from 'react'
import Containers from 'js/containers'

export default class extends Component {
    componentDidMount () {
    }
    render () {
        return (
            <div>
                <Containers.stroke/>
                { process.env.NODE_ENV !== 'production' ? <Containers.DevTools/> : null }
            </div>
        )
    }
}
