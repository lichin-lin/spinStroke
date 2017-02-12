import React, { Component } from 'react'
import Radium from 'radium'
import CSSModules from 'react-css-modules'

@Radium
export default CSSModules(class PlayGround extends Component {
    render () {
        return (
            <section id="Color" className="main special">
                <header className="major">
                    <h2>Step2. Pick Colors</h2>
                    <img className="svgImg" src='/image/ColorPicker.svg'/>
                    <p>
                        Do not limit your imagination,<br />
                    make your own color theme combinations
                    </p>
                </header>
                <footer className="major">
                    <ul>
                    </ul>

                </footer>
            </section>
        )
    }
}, require('./svg.styl'))
