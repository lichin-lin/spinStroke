import React, { Component } from 'react'
import Radium from 'radium'
import ReactSVG from 'react-svg'
@Radium
export default class PlayGround extends Component {
    render () {
        return (
            <section id="Color" className="main special">
                <header className="major">
                    <h2>Step2. Pick Colors</h2>
                    <ReactSVG path='./../../../image/ColorPicker.svg'/>
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
}
