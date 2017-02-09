import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {TweenLite, Power2} from 'gsap'
import CSSModules from 'react-css-modules'

export default CSSModules(class Base extends Component {
    constructor (props) {
        super(props)
        // animation
        this.tweenPaths = this.tweenPaths.bind(this)
        this.loop = this.loop.bind(this)
        this.interpolatePaths = this.interpolatePaths.bind(this)
        this.samplePath = this.samplePath.bind(this)
        this.drawPathToCanvas = this.drawPathToCanvas.bind(this)
        this.getColorSegment = this.getColorSegment.bind(this)
        // state
        this.state = {
            ...props.Stroke,
            steps: 1000,
            offset: 0,
            symbolCounter: 0,
            interpolationPoint: {
                percentage: 0
            },
            symbols: []
        }
    }
    distance (a, b) {
        var x = a.x - b.x
        var y = a.y - b.y
        return Math.sqrt(x * x + y * y)
    }

    loop () {
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.clearRect(0, 0, 2000, 2000)
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

    samplePath (pathStroke) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        svg.appendChild(path)
        path.setAttribute('d', pathStroke)
        let length = path.getTotalLength()
        let points = [...Array(this.state.steps).keys()].map((i) => (path.getPointAtLength(length * i / this.state.steps)))
        console.log(length)
        return {
            length: length,
            path: points
        }
    }

    componentDidMount () {
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.lineWidth = this.state.lineWidth
        ctx.lineCap = 'round'
        this.tweenPaths()
        this.loop()
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            ...nextProps.Stroke,
            symbols: nextProps.Stroke.symbols.map((symbol) => (this.samplePath(symbol))),
            symbolCounter: 0
        }, () => {
            this.state.animation.kill()
            this.tweenPaths()
        })
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.canvas.width = this.props.Text.pathBound.x
        ctx.canvas.height = this.props.Text.pathBound.y
        ctx.lineWidth = nextProps.Stroke.lineWidth
    }

    render () {
        return (
            <div className="strokeContainer">
                <canvas className="spincanvas" ref="spinCanvas"></canvas>
                {/* <canvas className="spincanvas" ref="spinCanvas2" width="200" height="200"></canvas> */}
            </div>
        )
    }
}, require('./stroke.styl'))
