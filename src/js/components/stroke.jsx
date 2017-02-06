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
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        this.tweenPaths()
        this.loop()
        this.props.addPath('M75.88 34.20L91.89 33.81L91.99 25.51L78.13 28.93L76.66 25.51L106.25 8.81L116.02 19.65L104.98 22.38L105.08 33.61L121.58 33.22L119.82 62.13L105.37 62.23L105.47 71.50L110.64 71.02L109.96 63.79L112.11 62.32L124.61 82.44L112.11 87.52L111.04 76.00L78.03 86.64L73.93 74.14L91.60 72.68L91.70 62.32L75.88 62.42L75.88 34.20M86.33 38.30L87.30 57.93L91.70 57.93L91.89 38.30L86.33 38.30M59.38 3.14L137.50 1.29L140.53 76.48L144.53 76.88L144.92 80.98L128.32 88.30L122.56 6.37L74.80 7.05L70.31 67.11L62.50 86.93L56.84 87.13L59.38 3.14M109.18 57.83L109.67 38.11L105.18 38.11L105.37 57.83L109.18 57.83L109.18 57.73L109.18 57.83Z')
        setTimeout(() => {
            this.props.addPath('M62.70 6.66L62.60 2.36L139.16 1.19L139.36 5.39L105.37 5.98L102.05 15.64L134.47 14.86L133.01 52.85L96.48 53.54L93.75 57.93L116.80 57.34L130.08 64.28L124.90 71.70L141.80 74.63L135.35 88.79L116.50 79.90L99.51 87.91L98.14 85.27L106.35 75.12L96.29 70.33L96.29 66.82L109.77 69.16L113.28 61.74L90.92 62.42L81.84 76.97L61.52 87.03L59.18 84.69L69.53 71.02L77.73 53.83L68.16 54.02L66.60 16.62L89.16 16.04L89.75 6.17L62.70 6.66M117.48 19.65L81.93 20.43L82.23 27.27L117.48 26.00L117.48 19.65M83.20 49.34L117.29 48.55L117.29 41.43L82.91 42.60L83.20 49.34M82.71 38.20L117.38 36.93L117.38 30.39L82.42 31.66L82.71 38.20L82.71 38.11L82.71 38.20Z')
        }, 1500)
        setTimeout(() => {
            // this.props.clearPath()
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
        return (
            <div className="strokeContainer">
                <canvas id="spincanvas" ref="spinCanvas" width="300" height="250"></canvas>
            </div>
        )
    }
}, require('./stroke.styl'))
