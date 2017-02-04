import React, { Component } from 'react'
import {TweenLite, Power2} from 'gsap'
import CSSModules from 'react-css-modules'

export default CSSModules(class Base extends Component {
    constructor (props) {
        super(props)
        this.checkState = this.checkState.bind(this)
        this.changeCtx = this.changeCtx.bind(this)
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
            wordCount: 0,
            pathPointsFrom: '',
            pathPointsTo: '',
            pathPointsNow: '',
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

    loop () {
        this.state.ctx.clearRect(0, 0, 2000, 2000)
        this.setState({offset: this.state.offset + 0.005})
        this.setState({pathPointsNow: this.interpolatePaths()})
        if (this.state.offset >= 1) this.setState({offset: 0})
        this.drawPathToCanvas()
        requestAnimationFrame(this.loop)
    }
    tweenPaths () {
        this.state.pathPointsFrom = this.state.paths[this.state.pathCount]
        if (this.state.pathCount + 1 <= this.state.wordCount) this.state.pathPointsTo = this.state.paths[this.state.pathCount + 1]
        else this.state.pathPointsTo = this.state.paths[0]

        const tt = this.state
        console.log('init', tt)
        TweenLite.to(this.state.interpolationPoint, 0.75, {
            percentage: 1,
            ease: Power2.easeInOut,
            delay: 1.25,
            onComplete: function (tt) {
                // console.log('after', tt)
                // let inter = this.state.interpolationPoint
                // inter.percentage = 0
                // this.setState({interpolationPoint: inter})
                // this.state.pathCount = this.state.pathCount + 1
                // this.setState({pathCount: this.state.pathCount + 1})
                // if (this.state.pathCount > this.state.wordCount) {
                    // this.setState({pathCount: 0})
                    // this.state.pathCount = 0
                // }
                // this.tweenPaths()
            }
        })
    }
    drawPathToCanvas () {
        let thisColor = this.getColorSegment(0)
        let lastColor = this.getColorSegment(0)
        this.state.ctx.strokeStyle = lastColor
        this.state.ctx.beginPath()
        for (var i = 0, l = this.state.pathPointsNow.length; i < l; i++) {
            if (this.state.pathPointsNow[i + 1]) {
                this.state.ctx.moveTo(this.state.pathPointsNow[i].x, this.state.pathPointsNow[i].y)
                this.state.ctx.lineTo(this.state.pathPointsNow[i + 1].x, this.state.pathPointsNow[i + 1].y)
            } else {
                this.state.ctx.lineTo(this.state.pathPointsNow[i].x, this.state.pathPointsNow[i].y)
            }
            thisColor = this.getColorSegment(i)
            if (thisColor) {
                if (thisColor !== lastColor) {
                    this.state.ctx.closePath()
                    this.state.ctx.stroke()
                    this.state.ctx.beginPath()
                    this.state.ctx.strokeStyle = thisColor
                    lastColor = thisColor
                }
            }
        }
        this.state.ctx.closePath()
        this.state.ctx.stroke()
    }
    getColorSegment (i) {
        let p = (i / this.state.steps) + this.state.offset
        if (p > 1) p = p - 1
        let point = Math.floor(p * this.state.colorCount)
        return this.state.colors[point]
    }
    interpolatePaths () {
        let points = []
        for (let i = 0; i <= this.state.steps; i++) {
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
        for (let i = 0; i <= this.state.steps; i++) {
            points.push(path.getPointAtLength(length * i / this.state.steps))
        }
        return points
    }
    checkState () {
        this.setState({ ctx: this.state.canvas.getContext('2d') })
        console.log(this.state)
    }
    changeCtx () {
        let abc = this.state.ctx
        abc.lineWidth = 4
        abc.lineCap = 'round'
        this.setState({ctx: abc})
        console.log(this.state)

        // start animation here
        this.tweenPaths()
        this.loop()
    }
    putInPath () {
        let p = this.state.paths
        p.push(this.samplePath('circle_path'))
        p.push(this.samplePath('rect_path'))
        p.push(this.samplePath('triangle_path'))
        this.setState({paths: p})
        console.log(this.state)
    }
    changeTheme (e) {
        console.log(e.target.id)
        let target = e.target.id
        this.setState({ colors: this.state.colorList[target] })
        console.log(this.state.colors)
    }
    componentWillMount () {
        // alert('Will!')
    }
    componentDidMount () {
        this.setState({ canvas: document.getElementById('spincanvas') })
        this.setState({ colors: this.state.colorList.colors_init })
        console.log(this.state)
    }
    render () {
        return (
            <div className="strokeContainer">
                <div className="checkState" onClick={this.checkState}>get canvas</div>
                <div className="checkState" onClick={this.changeCtx}>change ctx</div>
                <div className="checkState" onClick={this.putInPath}>put path to ctx</div>

                <svg id="spinSVG" width="300" height="250" viewbox="0 0 300 250">
                    <path id="circle_path" d="M10,100a90,90 0 1,0 180,0a90,90 0 1,0 -180,0"></path>
                    <path id="rect_path" d="M90,10 110,10 110,190 90,190 90,10"></path>
                    <path id="triangle_path" d="M100,40 170,160 30,160 100,40"></path>
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
