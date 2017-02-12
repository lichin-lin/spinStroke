import React, { Component } from 'react'
import Radium from 'radium'
import CSSModules from 'react-css-modules'

@Radium
export default CSSModules(class PlayGround extends Component {
    render () {
        return (
            <section id="Font" className="main special">
                <header className="major">
                    <h2>Step1. Select Font</h2>
                    <img className="svgImg" src='https://lichin.me/spinStroke/src/image/FontSheet.svg'/>
                    <p>
                        We provide more than 800 different kinds of fonts<br />
                    from Google Font website, choose any kind you like and start!
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
