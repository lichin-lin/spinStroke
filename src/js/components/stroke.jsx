import React, { Component } from 'react'
import {TweenLite, Power2} from 'gsap'
import CSSModules from 'react-css-modules'

export default CSSModules(class Base extends Component {
    constructor (props) {
        super(props)
        this.changeTheme = this.changeTheme.bind(this)
        // animation
        this.tweenPaths = this.tweenPaths.bind(this)
        this.loop = this.loop.bind(this)
        this.interpolatePaths = this.interpolatePaths.bind(this)
        this.putInPath = this.putInPath.bind(this)
        this.samplePath = this.samplePath.bind(this)
        this.drawPathToCanvas = this.drawPathToCanvas.bind(this)
        this.getColorSegment = this.getColorSegment.bind(this)

        // state
        this.state = {
            colorList: {
                'colors_spring': ['#1FAB89', '#62D2A2', '#9DF3C4', '#D7FBE8'],
                'colors_winter': ['#D2ECF9', '#1891AC', '#1F5F8B', '#253B6E'],
                'colors_autumn': ['#FFD6B6', '#EA7362', '#B74242', '#5C2626'],
                'colors_summer': ['#ffde57', '#FFC535', '#FFA900', '#FFEDA8'],
                'colors_init': ['#9DF3C4', '#EA7362', '#74ceee', '#FFCA61']
            },
            colors: [],
            colorCount: 4,
            pathPointsFrom: [],
            pathPointsTo: [],
            pathPointsNow: [],
            pathPointsFuck: [],
            steps: 1000,
            offset: 0,
            pathCount: 0,
            interpolationPoint: {
                percentage: 0
            },
            canvas: '',
            ctx: '',
            paths: []
        }
    }
    distance (a, b) {
        var x = a.x - b.x
        var y = a.y - b.y
        return Math.sqrt(x * x + y * y)
    }

    loop () {
        let ctx = document.getElementById('spincanvas').getContext('2d')
        ctx.clearRect(0, 0, 2000, 2000)
        let offset = this.state.offset + 0.005
        offset = offset >= 1 ? 0 : offset
        this.setState({offset: offset})
        this.setState({pathPointsNow: this.interpolatePaths()})
        this.drawPathToCanvas()
        requestAnimationFrame(this.loop)
    }
    tweenPaths () {
        this.setState({pathPointsFrom: this.state.paths[this.state.pathCount]})
        this.setState({pathPointsTo: this.state.paths[(this.state.pathCount + 1) % this.state.paths.length]})

        TweenLite.to(this.state.interpolationPoint, 0.75, {
            percentage: 1,
            ease: Power2.easeInOut,
            delay: 1.25,
            onComplete: function (tt) {
                let inter = this.state.interpolationPoint
                inter.percentage = 0
                this.setState({interpolationPoint: inter})
                this.setState({pathCount: (this.state.pathCount + 1) % this.state.paths.length})
                this.tweenPaths()
            }.bind(this)
        })
    }
    drawPathToCanvas () {
        let thisColor = this.getColorSegment(0)
        let ctx = document.getElementById('spincanvas').getContext('2d')
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
        let point = Math.floor(p * this.state.colorCount)
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
    samplePath (pathSelector) {
        let path = document.getElementById(pathSelector)
        let length = path.getTotalLength()
        let points = []
        for (let i = 0; i < this.state.steps; i++) {
            points.push(path.getPointAtLength(length * i / this.state.steps))
        }
        return points
    }
    putInPath () {
        let p = this.state.paths
        p.push(this.samplePath('D'))
        p.push(this.samplePath('R'))
        this.setState({paths: p})
    }
    changeTheme (e) {
        let target = e.target.id
        this.setState({ colors: this.state.colorList[target] })
    }

    componentDidMount () {
        new Promise((resolve, reject) => {
            let ctx = document.getElementById('spincanvas').getContext('2d')
            ctx.lineWidth = 4
            ctx.lineCap = 'round'
            this.setState({ ctx: ctx }, () => {
                resolve()
            })
        }).then(() => {
            this.setState({ colors: this.state.colorList.colors_init })
        }).then(() => {
            this.putInPath()
        }).then(() => {
            this.tweenPaths()
            this.loop()
        })
    }
    render () {
        return (
            <div className="strokeContainer">
                <svg id="spinSVG" width="300" height="250" viewbox="0 0 300 250">
                    <path id="circle_path" d="M10,100a90,90 0 1,0 180,0a90,90 0 1,0 -180,0"></path>
                    <path id="rect_path" d="M90,10 110,10 110,190 90,190 90,10"></path>
                    <path id="triangle_path" d="M100,40 170,160 30,160 100,40"></path>
                    <path id="D" d="M48.3 200v-177.5h59q21 0 36.8 7t26.4 19 15.8 28.1 5.2 34.4q0 20.3-5.9 36.6t-16.8 28-26.7 18-34.8 6.4h-59z m130.4-89q0-16.8-4.7-30.9t-13.9-24.4-22.4-16-30.5-5.7h-46.2v154.5h46.2q17.5 0 30.9-5.9t22.4-16.4 13.6-24.6 4.6-30.6z"></path>
                    <path id="R" d="M48.3 200v-177.5h73.7q11.3 0 20.8 4.8t16.3 12.6 10.8 17.7 3.8 19.9q0 9.8-3 18.9t-8.5 16.4-13.2 12-17 6.2l44.3 69h-14.8l-43-67h-57.5v67h-12.8z m12.7-78.8h62.3q8.5 0 15.5-3.7t12-9.9 7.6-14 2.6-16.1q0-8.5-3.1-16.4t-8.5-13.9-12.5-9.6-15.4-3.6h-60.5v87.3z"></path>
                </svg>
                <canvas id="spincanvas" width="300" height="250"></canvas>
                <div id="color_list">
                  <ul className="cell_list">
                    <li className="color_cell" id="colors_spring" onClick={this.changeTheme}></li>
                    <li className="color_cell" id="colors_summer" onClick={this.changeTheme}></li>
                    <li className="color_cell" id="colors_init" onClick={this.changeTheme}></li>
                    <li className="color_cell" id="colors_autumn" onClick={this.changeTheme}></li>
                    <li className="color_cell" id="colors_winter" onClick={this.changeTheme}></li>
                  </ul>
                </div>
            </div>
        )
    }
}, require('./stroke.styl'))
