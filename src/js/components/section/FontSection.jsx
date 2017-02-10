import React, { Component } from 'react'
import opentype from 'opentype.js'
import CSSModules from 'react-css-modules'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default CSSModules(class FontSection extends Component {
    constructor (props) {
        super(props)

        this.uploadFont = this.uploadFont.bind(this)
        this.FontChangeHandler = this.FontChangeHandler.bind(this)
        this.state = {
            options: [
                { value: 'Roboto', label: 'Roboto' }
            ],
            target: 'Roboto'
        }
    }
    uploadFont (acceptedFiles, rejectedFiles) {
        console.log('Accepted & reject: ', acceptedFiles, rejectedFiles)
        opentype.load(acceptedFiles[0].preview, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                // Use font here.
                this.props.uploadFile(acceptedFiles[0].preview)
            }
        })
    }
    FontChangeHandler (val) {
        this.setState({target: val})
    }
    componentDidMount () {
        this.props.getsFont()
    }
    componentWillReceiveProps (nextProps) {
        let data = []
        nextProps.Font.Font.map((font) => data.push({ 'value': font.id, 'label': font.id }))
        this.setState({options: data})
    }
    render () {
        return (
            <section id="Font" className="main special">
                {/* <header className="major">
                    <h2>Step1. Upload Font</h2>
                    <p>Upload any kind of font you like<br />
                    or, use our sample font!</p>
                </header> */}
                <footer className="major">
                    <ul className="actions">
                        <Select
                            name="FontSelector"
                            value={this.state.target}
                            SelectSearchable="True"
                            options={this.state.options}
                            onChange={this.FontChangeHandler}
                            style={{
                                'width': '300px'
                            }}
                        />
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./FontSection.styl'))
