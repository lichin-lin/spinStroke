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
        this.StyleChangeHandler = this.StyleChangeHandler.bind(this)
        this.uploadHandler = this.uploadHandler.bind(this)
        this.state = {
            options: [
            ],
            StyleOptions: [
            ],
            target: 'Roboto',
            StyleTarget: '',
            uploadUrl: ''
        }
    }
    uploadFont (acceptedFiles, rejectedFiles) {
        console.log('Accepted & reject: ', acceptedFiles, rejectedFiles)
        opentype.load(acceptedFiles[0].preview, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                this.props.uploadFile(acceptedFiles[0].preview)
            }
        })
    }
    FontChangeHandler (val) {
        this.setState({target: val})
        this.props.getsFontStyle(val)
    }
    StyleChangeHandler (val) {
        this.setState({StyleTarget: val})
        this.props.uploadFile(val.url)
        this.props.setStrokeProps({fontUrl: val.url})
    }
    uploadHandler (event) {
        this.setState({uploadUrl: event.target.value})
        this.props.uploadFile(event.target.value)
        this.props.setStrokeProps({fontUrl: event.target.value})
    }
    componentDidMount () {
        this.props.getsFont()
    }
    componentWillReceiveProps (nextProps) {
        let data = []
        nextProps.Font.AllFont.map((font) => data.push({ 'value': font.id, 'label': font.id }))
        this.setState({options: data})

        let style = []
        nextProps.Font.FontStyle.map((font) => style.push({
            'value': (font.fontStyle + ', ' + font.fontWeight),
            'label': (font.fontStyle + ', ' + font.fontWeight),
            'url': font.woff
        }))
        this.setState({StyleOptions: style})
    }
    render () {
        return (
            <section id="Font" className="main special">
                <footer className="major">
                    <ul className="actions wordpicker">
                        <li>
                            <p>Pick a Font</p>
                            <Select
                                name="FontSelector"
                                value={this.state.target}
                                SelectSearchable="True"
                                options={this.state.options}
                                onChange={this.FontChangeHandler}
                            />
                        </li>
                        <li>
                            <p>select Font Style</p>
                            <Select
                                name="StyleSelector"
                                value={this.state.StyleTarget}
                                SelectSearchable="True"
                                options={this.state.StyleOptions}
                                onChange={this.StyleChangeHandler}
                            />
                        </li>
                        <span style={{
                            margin: '25px 0',
                            width: '100%',
                            height: '1px',
                            boxShadow: '1px 1px 0px #dddddd'
                        }}></span>
                        <li>
                            <p>upload font url( <i>.ttf, .woff</i> )</p>
                            <input type="text" value={this.state.uploadUrl} onChange={this.uploadHandler}/>
                            <p style={{
                                fontSize: '0.85em',
                                fontStyle: 'italic',
                                color: '#AAA'
                            }}>* file type .woff2 was not supported</p>
                        </li>
                    </ul>

                </footer>
            </section>
        )
    }
}, require('./FontSection.styl'))
