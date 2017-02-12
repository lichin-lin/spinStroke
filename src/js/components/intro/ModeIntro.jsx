import React, { Component } from 'react'
import Radium from 'radium'
import CSSModules from 'react-css-modules'

@Radium
export default CSSModules(class PlayGround extends Component {
    render () {
        return (
            <section id="Mode" className="main special">
                <header className="major">
                    <h2>Step3. Setting</h2>
                    <img className="svgImg" src='https://lichin.me/spinStroke/src/image/ModePicker.svg'/>
                    <p>
                        You can customize the behaviors easily.<br />
                    and make it yours by generating iframe code.
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
