import React, { Component } from 'react'
import Containers from 'js/containers'

export default class extends Component {
    componentDidMount () {
    }
    render () {
        /*
        var obj = {
            height: 700,
            width: 1200,
            texts: ['gg', 'wp']
        }

        var str = JSON.stringify(obj)

        console.log(new Buffer(str).toString('base64'))
        console.log(this.props.location.query.data)
        */
        var obj = JSON.parse(new Buffer(this.props.location.query.data, 'base64').toString('ascii'))

        return (
            <div>
                <Containers.stroke {...obj}/>
                { process.env.NODE_ENV !== 'production' ? <Containers.DevTools/> : null }
            </div>
        )
    }
}
