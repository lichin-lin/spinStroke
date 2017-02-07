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
        if (this.state.symbols.length === 0) {
            return
        }
        let offset = this.state.offset + this.state.speed / this.state.symbols[this.state.symbolCounter].length
        offset = offset >= 1 ? 0 : offset
        this.state.offset = offset
        this.drawPathToCanvas()
        requestAnimationFrame(this.loop)
    }

    tweenPaths () {
        if (this.state.symbols.length === 0) {
            return
        }

        TweenLite.to(this.state.interpolationPoint, this.state.transitionDuring, {
            percentage: 1,
            ease: Power2.easeInOut,
            delay: this.state.during,
            onComplete: function () {
                this.state.interpolationPoint.percentage = 0
                if (this.state.symbols.length) {
                    this.state.symbolCounter = (this.state.symbolCounter + 1) % this.state.symbols.length
                }
                this.tweenPaths()
            }.bind(this)
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
        this.props.addSymbol('M104 22.5h11l75 177.5h-13.5l-24.8-58.5h-84.7l-24.8 58.5h-13.7z m44.3 108.5l-38.8-93-39.5 93h78.3z')
        setTimeout(() => {
            this.props.addSymbol('M179 154q0 9.8-3.8 18.1t-10.2 14.6-15.3 9.8-18.4 3.5h-83v-177.5h82.7q9.3 0 16.8 4t12.7 10.4 8.1 14.5 2.9 16.4q0 13.5-6.8 24.7t-18.7 16.5q15.3 4.5 24.1 16.9t8.9 28.1z m-12.8-1.8q0-7-2.4-13.6t-7-11.7-10.7-8.2-13.1-3h-72v72.8h70.3q7.5 0 13.8-3t11-8.1 7.4-11.7 2.8-13.5z m-105.2-118.2v71h65q7.3 0 13.3-3t10.3-7.9 6.9-11.3 2.5-13.3q0-7.3-2.4-13.6t-6.5-11.3-9.9-7.7-12.7-2.9h-66.5z')
            // this.props.setStrokeProps({lineWidth: 2})
            // this.props.setStrokeProps({during: 2})
            // this.props.setStrokeProps({transitionDuring: 1.25})
            // this.props.setStrokeProps({speed: 1})
        }, 1500)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            ...nextProps.Stroke,
            symbols: nextProps.Stroke.symbols.map((symbol) => (this.samplePath(symbol)))
        }, () => {
            if (this.props.Stroke.symbols.length === 1) {
                this.state.symbolCounter = 0
                this.tweenPaths()
                this.loop()
            }
        })
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.lineWidth = nextProps.Stroke.lineWidth
    }

    render () {
        return (
            <div className="strokeContainer">
                <canvas id="spincanvas" ref="spinCanvas" width="300" height="250"></canvas>
            </div>
        )
    }
}, require('./stroke.styl'))
