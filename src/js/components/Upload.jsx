import React, { Component } from 'react'
import opentype from 'opentype.js'
import Dropzone from 'react-dropzone'
import * as d3 from 'd3'
import CSSModules from 'react-css-modules'

export default CSSModules(class Base extends Component {
    static propTypes = {
    }
    onDrop (acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles[0])
        console.log('Rejected files: ', rejectedFiles)
        opentype.load(acceptedFiles[0].preview, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                // Use font here.
                let fontObject = []
                var HGlyths = font.stringToGlyphs('風')
                console.log('glyth: ', HGlyths)
                for (let i = 0; i < HGlyths.length; i++) {
                    let HPath = HGlyths[i].getPath(50, 80, 100)
                    let HPathData = HPath.toPathData(2)
                    console.log('svg path: ', HPathData)
                    fontObject.push(HPath.toSVG(2))
                    // append to DOM
                    let divElem = d3.select('#svg')
                    divElem.append('svg:path')
                        .attr('d', HPathData)
                        .attr('id', 'H')
                }
                // path.draw(ctx)
                console.log('final path', fontObject)
            }
        })
    }
    componentWillMount () {
    }
    render () {
        return (
            <div className="not_login">
                <div>
                  <Dropzone onDrop={this.onDrop} className="dropZone">
                    <div>Try dropping some files here, or click to select files to upload.</div>
                  </Dropzone>
                </div>
                <div className="not_login_title">
                    <h1 className="not_login_logo">Spin Stroke</h1>
                    <p>blalablala</p>
                </div>
                <div className="not_login_section">
                    {/* <p>我是 SVG PATH 唷</p> */}
                    <svg id="svg">
                    </svg>
                    <canvas id="canvas" width="300" height="250"></canvas>
                </div>
            </div>
        )
    }
}, require('./Upload.styl'))
