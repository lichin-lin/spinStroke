import React, { Component } from 'react'

export default class ColorSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.toggleColorList = this.toggleColorList.bind(this)
        this.toggleSampleColorList = this.toggleSampleColorList.bind(this)
        // state
        this.state = {
            ...props.Stroke
        }
    }
    toggleColorList () {
        this.props.addColor('pink')
    }
    toggleSampleColorList () {
        console.log('list~')
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            ...nextProps.Stroke
        }, () => {
            // ?
        })
    }
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
                        <li onClick={this.toggleColorList}><a href="#" className="button special">Add Colors</a></li>
                        <li onClick={this.toggleSampleColorList}><a href="#" className="button">Choose Color Themes</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}
