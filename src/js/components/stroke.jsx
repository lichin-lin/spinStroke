import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {TweenLite, Power2} from 'gsap'
import CSSModules from 'react-css-modules'
import opentype from 'opentype.js'

export default CSSModules(class Base extends Component {
    constructor (props) {
        super(props)
        // animation
        this.tweenPaths = this.tweenPaths.bind(this)
        this.loop = this.loop.bind(this)
        this.interpolatePaths = this.interpolatePaths.bind(this)
        this.getPath = this.getPath.bind(this)
        this.drawPathToCanvas = this.drawPathToCanvas.bind(this)
        this.getColorSegment = this.getColorSegment.bind(this)
        this.updatePropsToState = this.updatePropsToState.bind(this)
        // state
        this.state = {
            steps: 2000,
            offset: 0,
            symbolCounter: 0,
            interpolationPoint: {
                percentage: 0
            },
            fontUrl: 'https://fonts.gstatic.com/s/roboto/v15/vzIUHo9z-oJ4WgkpPOtg1_esZW2xOQ-xsNqO47m55DA.woff',
            fontSize: 500,
            symbols: [],
            texts: ['abc', 'def'],
            width: 1200,
            height: 500,
            lineWidth: 3,
            during: 1.5,
            transitionDuring: 0.5,
            ...props.Stroke
        }
    }

    distance (a, b) {
        var x = a.x - b.x
        var y = a.y - b.y
        return Math.sqrt(x * x + y * y)
    }

    loop () {
        let canvas = findDOMNode(this.refs.spinCanvas)
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (this.state.symbols.length !== 0) {
            let offset = this.state.offset + this.state.speed / this.state.symbols[this.state.symbolCounter].length
            offset = offset >= 1 ? 0 : offset
            this.state.offset = offset
            this.drawPathToCanvas()
        }
        requestAnimationFrame(this.loop)
    }

    tweenPaths () {
        this.state.animation = TweenLite.to(this.state.interpolationPoint, this.state.transitionDuring, {
            percentage: 1,
            ease: Power2.easeInOut,
            delay: this.state.during,
            onComplete: () => {
                this.state.interpolationPoint.percentage = 0
                if (this.state.symbols.length) {
                    this.state.symbolCounter = (this.state.symbolCounter + 1) % this.state.symbols.length
                }
                this.tweenPaths()
            }
        })
    }

    drawPathToCanvas () {
        let path = this.interpolatePaths()
        let thisColor = this.getColorSegment(0)
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.strokeStyle = thisColor
        ctx.beginPath()
        for (var i = 0; i < path.length - 1; i++) {
            ctx.moveTo(path[i].x, path[i].y)
            if (i && this.distance(path[i], path[i + 1]) > 2 * this.distance(path[i], path[i - 1])) {
                continue
            }
            ctx.lineTo(path[i + 1].x, path[i + 1].y)
            thisColor = this.getColorSegment(i)
            if (thisColor !== ctx.strokeStyle) {
                ctx.stroke()
                ctx.beginPath()
                ctx.strokeStyle = thisColor
            }
        }
        ctx.stroke()
    }

    getColorSegment (i) {
        let p = (i / this.state.steps) + this.state.offset
        if (p > 1) p = p - 1
        let point = Math.floor(p * this.state.colors.length)
        return this.state.colors[point]
    }

    interpolatePaths () {
        let From = this.state.symbols[this.state.symbolCounter % this.state.symbols.length].path
        let To = this.state.symbols[(this.state.symbolCounter + 1) % this.state.symbols.length].path
        let points = [...Array(this.state.steps).keys()].map((i) => ({
            x: (From[i].x + (To[i].x - From[i].x) * this.state.interpolationPoint.percentage),
            y: (From[i].y + (To[i].y - From[i].y) * this.state.interpolationPoint.percentage)
        }))
        return points
    }

    getPath (texts) {
        return new Promise((resolve, reject) => {
            opentype.load(this.state.fontUrl, (err, font) => {
                if (err) {
                    console.log('Could not load font: ' + err)
                } else {
                    resolve(texts.map((text) => {
                        let pathStroke = font.getPath(text, 0, this.state.height, this.state.fontSize).toPathData(2)
                        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                        svg.appendChild(path)
                        path.setAttribute('d', pathStroke)
                        let length = path.getTotalLength()
                        let points = [...Array(this.state.steps).keys()].map((i) => (path.getPointAtLength(length * i / this.state.steps)))
                        return {
                            length: length,
                            path: points
                        }
                    }))
                }
            })
        })
    }

    updatePropsToState (Stroke) {
        var symbolsPromise
        if (Stroke.texts === this.state.texts && this.state.symbols.length) {
            symbolsPromise = new Promise((resolve, reject) => {
                resolve(this.state.symbols)
            })
        } else {
            symbolsPromise = this.getPath(Stroke.texts)
        }
        symbolsPromise.then((symbols) => {
            console.log(symbols)
            this.setState({
                ...Stroke,
                symbols: symbols
            }, () => {
                let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
                ctx.lineCap = 'round'
                ctx.canvas.width = this.state.width
                ctx.canvas.height = this.state.height
                ctx.lineWidth = this.state.lineWidth

                if (this.state.animation !== undefined) {
                    this.state.animation.kill()
                }
                this.tweenPaths()
            })
        })
    }

    componentDidMount () {
        this.loop()
        this.updatePropsToState(this.state)
    }

    componentWillReceiveProps (nextProps) {
        this.updatePropsToState(nextProps.Stroke)
    }

    render () {
        console.log(this.state)
        return (
            <div className="strokeContainer">
                <canvas className="spincanvas" ref="spinCanvas"></canvas>
            </div>
        )
    }
}, require('./stroke.styl'))
