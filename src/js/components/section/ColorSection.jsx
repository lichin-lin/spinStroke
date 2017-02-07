import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { SketchPicker } from 'react-color'

export default CSSModules(class ColorSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.toggleColorList = this.toggleColorList.bind(this)
        this.toggleSampleColorList = this.toggleSampleColorList.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
        this.state = {
            color: 'white'
        }
    }
    toggleColorList () {
        this.props.addColor(this.state.color)
    }
    toggleSampleColorList () {
        console.log('list~')
    }
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex })
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
                        <SketchPicker
                            color={ this.state.color }
                            onChangeComplete={ this.handleChangeComplete }
                        />
                    </ul>
                    <ul className="actions">
                        <li onClick={this.toggleColorList}><a className="button special">Add Colors</a></li>
                        <li onClick={this.toggleSampleColorList}><a className="button">Choose Color Themes</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./../../../sass/layout/section/colorSection.scss'))
