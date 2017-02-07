import React, { Component } from 'react'

export default class ModeSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            text: ''
        }
    }
    handleChange (event) {
        this.setState({text: event.target.value})
    }
    handleSubmit () {
        console.log(this.state.text)
    }
    render () {
        return (
            <section id="Mode" className="main special">
                <header className="major">
                    <h2>Step3. Input Text</h2>
                    <p>type any word in your mind<br />
                    and ready for the magic!</p>
                </header>
                <footer className="major">
                    <ul className="actions">
                        <input
                            type="text"
                            name="demo-name"
                            id="demo-name"
                            placeholder="type Trump?"
                            value={this.state.text}
                            onChange={this.handleChange}
                            style={{
                                maxWidth: '500px'
                            }}
                        />
                    </ul>
                    <ul className="actions">
                        <li onClick={this.handleSubmit}><a className="button special">submit</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}
