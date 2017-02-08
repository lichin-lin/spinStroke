import React, { Component } from 'react'
import opentype from 'opentype.js'

export default class ModeSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            ...props.File,
            ...props.Stroke,
            text: ''
        }
    }
    handleChange (event) {
        this.setState({text: event.target.value})
        // this.props.modifyText(event.target.value)
    }
    handleSubmit () {
        this.props.modifyText(this.state.text)
        opentype.load(this.props.File.Font, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                // Use font here.
                this.props.clearSymbol()
                let fontPaths = []
                let HGlyths = font.stringToGlyphs(this.state.text)
                console.log('glyth: ', HGlyths)
                for (let i = 0; i < HGlyths.length; i++) {
                    let HPath = HGlyths[i].getPath(50, 200, 200)
                    fontPaths.push(HPath.toPathData(2))
                    this.props.addSymbol(HPath.toPathData(2))
                }
                console.log('final path', fontPaths)
            }
        })
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
