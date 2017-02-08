import React, { Component } from 'react'
import Radium from 'radium'
import Containers from 'js/containers'

@Radium
export default class PlayGround extends Component {
    render () {
        return (
            <section id="Playground" className="main special">
                <header className="major">
                    <h2>Playground</h2>
                    <p>that`s cool right?<br />
                    we will provide more feature in the future.</p>
                </header>
                <footer className="major">
                    <ul
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            height: '500px',
                            width: '100%'

                        }}
                    className="actions"
                    >
                        <Containers.stroke />
                    </ul>
                    <ul className="actions">
                    </ul>
                </footer>
            </section>
        )
    }
}
