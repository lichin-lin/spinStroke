import React, { Component, PropTypes } from 'react'
// import Containers from 'js/containers'
import CSSModules from 'react-css-modules'
// import {
//     Grid,
//     Row
// } from 'react-bootstrap'

export default CSSModules(class Base extends Component {
    static propTypes = {
        requiredProps: PropTypes.string.isRequired,
        defaultProps: PropTypes.string
    };
    static defaultProps = {
        defaultProps: 'default props'
    };
    render () {
        return (
            <div id="wrapper">
                <header id="header" className="alt">
                    {/* <Containers.section.Header /> */}
                    <span className="logo"><img src="images/logo.svg" alt="" /></span>
                    <h1>Stellar</h1>
                    <p>Just another free, fully responsive site template<br />
                    built by <a href="https://twitter.com/ajlkn">@ajlkn</a> for <a href="https://html5up.net">HTML5 UP</a>.</p>
                </header>

                <nav id="nav">
                    <ul>
                        <li><a href="#intro" className="active">Introduction</a></li>
                        <li><a href="#first">First Section</a></li>
                        <li><a href="#second">Second Section</a></li>
                        <li><a href="#cta">Get Started</a></li>
                    </ul>
                </nav>

                <div id="main"></div>
                <footer id="footer"></footer>
            </div>
        )
    }
}, require('./sass/main.scss'))
