import React, { Component } from 'react'
import opentype from 'opentype.js'
// import Dropzone from 'react-dropzone'
import CSSModules from 'react-css-modules'
import sampleFont from './../../../fonts/Raleway.ttf'

export default CSSModules(class FontSection extends Component {
    constructor (props) {
        super(props)
        // animation
        this.uploadFont = this.uploadFont.bind(this)
        this.uploadSampleFont = this.uploadSampleFont.bind(this)
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
    uploadSampleFont () {
        opentype.load(sampleFont, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                // Use font here.
                console.log(sampleFont)
                this.props.uploadFile(sampleFont)
            }
        })
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
                        {/* <li onClick={this.uploadFont}>
                            <Dropzone onDrop={this.uploadFont} className="dropZone">
                                <a className="button special">Upload Font</a>
                            </Dropzone>
                        </li> */}
                        <li onClick={this.uploadSampleFont}><a className="button">Sample Font</a></li>
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./../../../sass/layout/section/fontSection.scss'))
