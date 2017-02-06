import React, { Component } from 'react'

export default class ModeSection extends Component {
    render () {
        return (
            <section id="Font" className="main special">
                <header className="major">
                    <h2>Step3. Input Text</h2>
                    <p>type any word in your mind<br />
                    and ready for the magic!</p>
                </header>
                <footer className="major">
                    <ul className="actions">
                        <li><a href="#" className="button special">please type</a></li>
                        <li><a href="#" className="button">a word</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}
