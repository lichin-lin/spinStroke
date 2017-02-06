import React, { Component } from 'react'

export default class FontSection extends Component {
    render () {
        return (
            <section id="Font" className="main special">
                <header className="major">
                    <h2>Step1. Upload Font</h2>
                    <p>Upload any kind of font you like<br />
                    or, use our sample font!</p>
                </header>
                <footer className="major">
                    <ul className="actions">
                        <li><a href="#" className="button special">Upload Font</a></li>
                        <li><a href="#" className="button">Sample Font</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}
