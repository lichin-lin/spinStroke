import React, { Component } from 'react'
import Radium from 'radium'
// import ReactSVG from 'react-svg'
@Radium
export default class PlayGround extends Component {
    render () {
        return (
            <section id="Mode" className="main special">
                <header className="major">
                    <h2>Step3. Setting</h2>
                    {/* <ReactSVG path='https://lichin.me/spinStroke/src/image/ModePicker.svg'/> */}
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
}
