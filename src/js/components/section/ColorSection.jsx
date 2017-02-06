import React, { Component } from 'react'

export default class ColorSection extends Component {
    render () {
        return (
            <section id="Font" className="main special">
                <header className="major">
                    <h2>Step2. Pick Colors</h2>
                    <p>Pick any colors from the list<br />
                    or, use some color themes we provide.</p>
                </header>
                <footer className="major">
                    <ul className="actions">
                        <li><a href="#" className="button special">Add Colors</a></li>
                        <li><a href="#" className="button">Choose Color Themes</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}
