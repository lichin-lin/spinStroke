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
        console.log(this.props)
        // state
        this.state = {
            colors: this.props.Stroke.colors,
            pathPointsFrom: [],
            pathPointsTo: [],
            pathPointsNow: [],
            steps: 1000,
            offset: 0,
            pathCount: 0,
            interpolationPoint: {
                percentage: 0
            },
            paths: []
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
        if (this.state.paths.length === 0) {
            return
        }
        let offset = this.state.offset + 0.005
        offset = offset >= 1 ? 0 : offset
        this.state.offset = offset
        this.state.pathPointsNow = this.interpolatePaths()
        this.drawPathToCanvas()
        requestAnimationFrame(this.loop)
    }

    tweenPaths () {
        if (this.state.paths.length === 0) {
            return
        }

        this.state.pathPointsFrom = this.state.paths[this.state.pathCount % this.state.paths.length]
        this.state.pathPointsTo = this.state.paths[(this.state.pathCount + 1) % this.state.paths.length]

        TweenLite.to(this.state.interpolationPoint, 0.75, {
            percentage: 1,
            ease: Power2.easeInOut,
            delay: 1.25,
            onComplete: function (tt) {
                this.state.interpolationPoint.percentage = 0
                if (this.state.paths.length) {
                    this.state.pathCount = (this.state.pathCount + 1) % this.state.paths.length
                }
                this.tweenPaths()
            }.bind(this)
        })
    }

    drawPathToCanvas () {
        let thisColor = this.getColorSegment(0)
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.strokeStyle = thisColor
        ctx.beginPath()
        for (var i = 0; i < this.state.pathPointsNow.length - 1; i++) {
            ctx.moveTo(this.state.pathPointsNow[i].x, this.state.pathPointsNow[i].y)
            if (i && this.distance(this.state.pathPointsNow[i], this.state.pathPointsNow[i + 1]) > 2 * this.distance(this.state.pathPointsNow[i], this.state.pathPointsNow[i - 1])) {
                continue
            }
            ctx.lineTo(this.state.pathPointsNow[i + 1].x, this.state.pathPointsNow[i + 1].y)
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
        let points = []
        for (let i = 0; i < this.state.steps; i++) {
            points.push({
                x: this.state.pathPointsFrom[i].x + (this.state.pathPointsTo[i].x - this.state.pathPointsFrom[i].x) * this.state.interpolationPoint.percentage,
                y: this.state.pathPointsFrom[i].y + (this.state.pathPointsTo[i].y - this.state.pathPointsFrom[i].y) * this.state.interpolationPoint.percentage
            })
        }
        return points
    }

    samplePath (pathStroke) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        svg.appendChild(path)
        path.setAttribute('d', pathStroke)
        let points = []
        let length = path.getTotalLength()
        for (let i = 0; i < this.state.steps; i++) {
            points.push(path.getPointAtLength(length * i / this.state.steps))
        }
        return points
    }

    componentDidMount () {
        let ctx = findDOMNode(this.refs.spinCanvas).getContext('2d')
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        this.tweenPaths()
        this.loop()
        this.props.addPath('M90,10 110,10 110,190 90,190 90,10')
        setTimeout(() => {
            this.props.addPath('M100,40 170,160 30,160 100,40')
        }, 1500)
        setTimeout(() => {
            this.props.clearPath()
        }, 3000)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            paths: nextProps.Stroke.paths.map((path) => (this.samplePath(path)))
        }, () => {
            this.tweenPaths()
            this.loop()
        })
    }

    render () {
        console.log('render', this.state)
        return (
            <div className="strokeContainer">
                <canvas id="spincanvas" ref="spinCanvas" width="300" height="250"></canvas>
            </div>
        )
    }
}, require('./stroke.styl'))
