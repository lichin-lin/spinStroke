import React, { Component } from 'react'
import opentype from 'opentype.js'

export default class ModeSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSize = this.handleChangeSize.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            ...props.File,
            ...props.Stroke,
            text: '',
            size: 200
        }
    }
    handleChange (event) {
        this.setState({text: event.target.value})
        // this.props.modifyText(event.target.value)
    }
    handleChangeSize (event) {
        this.setState({size: event.target.value})
    }
    handleSubmit () {
        this.props.modifyText(this.state.text)
        opentype.load(this.props.File.Font, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                // Use font here.
                this.props.clearSymbol()
                let size = this.state.size
                let fontPaths = []
                let HGlyths = font.stringToGlyphs(this.state.text)
                let len = HGlyths.length
                console.log('glyth: ', HGlyths)

                // min/max for x,y
                let modList = []
                let minX = 21474851
                let maxX = 0
                let minY = minX
                let maxY = maxX

                // round1: get min/max for (x,y)
                for (let i = 0; i < len; i++) {
                    let HPath = HGlyths[i].getPath(0, 0, size)
                    console.log('[Path] this is Bound', HPath.getBoundingBox())
                    let B = HPath.getBoundingBox()
                    if (B.x1 < minX) minX = B.x1
                    if (B.x2 > maxX) maxX = B.x2
                    if (B.y1 < minY) minY = B.y1
                    if (B.y2 < maxY) maxY = B.y2
                    modList.push({x: B.x2 - B.x1, y: B.y2 - B.y1, minX: B.x1})
                }
                console.log('result: ', minX, maxX, minY, maxY, 'modList', modList)
                console.log('modify (x,y) ', Math.abs((maxX - minX) / 2), Math.abs((maxY - minY) / 2))
                let modX = Math.abs((maxX - minX))
                let modY = Math.abs((maxY - minY))
                this.props.modifyTextBound({ x: modX, y: modY })

                // round2: really put path in to array and write back.
                for (let i = 0; i < len; i++) {
                    let offsetX = ((modX - modList[i].x) / 2 - modList[i].minX)
                    let offsetY = modY
                    let HPath = HGlyths[i].getPath(offsetX, offsetY, size)
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
                        <input
                            type="text"
                            name="demo-size"
                            id="demo-size"
                            placeholder="200"
                            value={this.state.size}
                            onChange={this.handleChangeSize}
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
