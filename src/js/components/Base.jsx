import React, { Component } from 'react'
import Containers from 'js/containers'
import CSSModules from 'react-css-modules'
// import {
//     Grid,
//     Row
// } from 'react-bootstrap'

export default CSSModules(class Base extends Component {
    render () {
        return (
            <div id="wrapper">
                <Containers.section.Header />
                <nav id="nav">
                    <ul>
                        <li><a href="#intro" className="active">Introduction</a></li>
                        <li><a href="#first">First Section</a></li>
                        <li><a href="#second">Second Section</a></li>
                        <li><a href="#cta">Get Started</a></li>
                    </ul>
                </nav>
                <div id="main"></div>
                <footer id="footer">
                </footer>
            </div>
        )
    }
}, require('./../../sass/main.scss'))
