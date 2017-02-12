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
            <div className="spinStroke">
                <div id="wrapper">
                    <Containers.section.Header />
                    <nav id="nav">
                        <ul>
                            <li><a href="#Font" className="active">Upload Font</a></li>
                            <li><a href="#Color">Pick Color</a></li>
                            <li><a href="#Mode">Select Mode</a></li>
                            <li><a href="#Playground">Playground</a></li>
                        </ul>
                    </nav>
                    <div id="main">
                        <Containers.intro.FontIntro />
                        <Containers.intro.ColorIntro />
                        <Containers.intro.ModeIntro />
                        <Containers.section.PlayGround />
                    </div>
                    <Containers.section.FooterSection />
                </div>
            </div>
        )
    }
}, require('./../../sass/main.scss'))
