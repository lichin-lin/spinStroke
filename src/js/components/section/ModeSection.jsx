import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import {Creatable} from 'react-select'
import 'react-select/dist/react-select.css'

export default CSSModules(class ModeSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSize = this.handleChangeSize.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.InputChangeHandler = this.InputChangeHandler.bind(this)
        this.updatePropsToState = this.updatePropsToState.bind(this)
        this.state = {
            ...props.Stroke,
            text: '',
            textArray: [
                { value: 'select', label: 'select' },
                { value: 'or', label: 'or' },
                { value: 'type', label: 'type' }
            ],
            multiValue: [],
            FontSize: 300,
            AnimationSpeed: 3,
            ChangeRate: 1.5
        }
    }
    handleChange (event) {
        this.setState({text: event.target.value})
        // this.props.modifyText(event.target.value)
    }
    handleChangeSize (event) {
        this.setState({size: event.target.value})
    }
    InputChangeHandler (val) {
        console.log(val)
        this.setState({ multiValue: val })
    }
    handleSubmit () {
        let size = this.state.FontSize
        let textList = this.state.multiValue.map((text) => (text.label))
        console.log('submit', size)
        this.props.setStrokeProps({
            fontSize: size,
            speed: this.state.AnimationSpeed,
            during: this.state.ChangeRate,
            texts: textList
        })
    }
    updatePropsToState (Stroke) {
        console.log('upload')
        this.setState({
            ...Stroke,
            FontSize: Stroke.fontSize,
            AnimationSpeed: Stroke.speed,
            ChangeRate: Stroke.during,
            multiValue: Stroke.texts.map((text) => ({
                'value': text,
                'label': text
            }))
        })
    }
    componentDidMount () {
        this.updatePropsToState(this.state)
        var iframeURL = 'https://lichin.me/spinStroke/iframe?data=' + (new Buffer(JSON.stringify(this.props.Stroke)).toString('base64'))
        this.setState({
            iframeURL: iframeURL
        })
    }

    componentWillReceiveProps (nextProps) {
        var iframeURL = 'https://lichin.me/spinStroke/iframe?data=' + (new Buffer(JSON.stringify(nextProps.Stroke)).toString('base64'))
        this.setState({
            iframeURL: iframeURL
        })
    }
    render () {
        return (
            <section id="Mode" className="main special">
                <ul className="actions">
                </ul>
                <ul className="actions slideControll">
                    <li>
                        <p>Input:</p>
                        <Creatable
                            multi={true}
                            options={this.state.textArray}
                            onChange={this.InputChangeHandler}
                            value={this.state.multiValue}
                        />
                    </li>
                    <li>
                        <p>FontSize:</p>
                        <InputRange
                          maxValue={1000}
                          minValue={100}
                          step={10}
                          value={this.state.FontSize}
                          onChange={FontSize => this.setState({FontSize: FontSize})} />
                    </li>
                    <li>
                        <p>Animation Speed:</p>
                        <InputRange
                          maxValue={10}
                          minValue={1}
                          step={0.5}
                          value={this.state.AnimationSpeed}
                          onChange={AnimationSpeed => this.setState({AnimationSpeed: AnimationSpeed})} />
                    </li>
                    <li>
                        <p>Change Rate:</p>
                        <InputRange
                          maxValue={10}
                          minValue={1}
                          step={0.5}
                          value={this.state.ChangeRate}
                          onChange={ChangeRate => this.setState({ChangeRate: ChangeRate})} />
                    </li>
                </ul>
                <ul className="actions">
                    <li onClick={this.handleSubmit}><a className="button special">update</a></li>
                </ul>
                <input type="text" value={this.state.iframeURL} />
            </section>
        )
    }
}, require('./ModeSection.styl'))
