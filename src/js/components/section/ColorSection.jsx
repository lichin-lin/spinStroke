import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Radium from 'radium'
import { SketchPicker } from 'react-color'
import tinycolor from 'tinycolor2'
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
    }
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex })
    }
    cancelColor (id) {
        let colorList = this.props.Stroke.colors
        if (id > -1) colorList.splice(id, 1)
        this.props.setStrokeProps({colors: colorList})
    }
    render () {
        return (
            <section id="Color" className="main special">
                <footer className="major">
                    <ul className="actions">
                        <SketchPicker
                            color={ this.state.color }
                            onChangeComplete={ this.handleChangeComplete }
                        />
                    </ul>
                    <ul className="actions">
                        <li onClick={this.toggleColorList}><a className="button special">Add Colors</a></li>
                    </ul>
                    <ul className="actions colorListContain">
                        <div className="colorList">
                            {
                                this.props.Stroke.colors.map((ele, id) => (
                                        <li key={id} >
                                            <div className="colorBox" onClick={() => { this.cancelColor(id) } }
                                                style= {{
                                                    background: ele,
                                                    color: (() => (tinycolor(ele).isDark() ? 'white' : 'black'))()
                                                }}
                                            >
                                                <p>{ele}</p>
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </div>
                        <div style={{
                            fontStyle: 'italic',
                            wordSpacing: '2px'
                        }}>
                            * click on the colorbox to remove the color.
                        </div>
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./ColorSection.styl'))
