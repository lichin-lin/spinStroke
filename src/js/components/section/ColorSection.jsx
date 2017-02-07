import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Radium from 'radium'
import { SketchPicker } from 'react-color'

@Radium
export default CSSModules(class ColorSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.toggleColorList = this.toggleColorList.bind(this)
        this.toggleSampleColorList = this.toggleSampleColorList.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
        this.cancelColor = this.cancelColor.bind(this)
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
    cancelColor (id) {
        console.log(id)
        let colorList = this.props.Stroke.colors
        if (id > -1) colorList.splice(id, 1)
        console.log(colorList)
        this.props.setStrokeProps({colors: colorList})
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
                    <ul className="actions">
                        <div className="colorList">
                            {
                                this.props.Stroke.colors.map((ele, id) => (
                                        <li key={id} >
                                            <div className="colorBox" onClick={() => { this.cancelColor(id) } }
                                                style= {{
                                                    background: ele
                                                }}
                                            >
                                                {ele}
                                            </div>
                                        </li>
                                    )
                                )
                            }
                    </div>
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./../../../sass/layout/section/colorSection.scss'))
