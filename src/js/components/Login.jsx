import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
// import SweetAlert from 'sweetalert-react'
import Containers from 'containers'
import cookie from 'react-cookie'
import opentype from 'opentype.js'
import Dropzone from 'react-dropzone'
import * as d3 from 'd3'
// import GSAP from 'react-gsap-enhancer'

import CSSModules from 'react-css-modules'
import testFont from './Raleway.ttf'
// import 'sweetalert/dist/sweetalert.css'
export default CSSModules(class Base extends Component {
    static propTypes = {
        FBLogin: PropTypes.func.isRequired,
        getRaleway: PropTypes.func.isRequired,
        currentUser: PropTypes.object.isRequired
    };
    constructor (props) {
        super(props)
        this.FBLogin = this.FBLogin.bind(this)
        this.state = {
            fakeNum: 50,
            userId: '',
            showRule: false,
            showUse: false,
            RuleText: `非常歡迎您光臨「學測.大平台」（以下簡稱本網站）`
        }
    }
    onDrop (acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles[0])
        console.log('Rejected files: ', rejectedFiles)
        opentype.load(testFont, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                // Use font here.
            }
        })
    }
    getRaleway () {
        opentype.load(testFont, (err, font) => {
            if (err) {
                console.log('Could not load font: ' + err)
            } else {
                let fontObject = []
                // var ctx = document.getElementById('canvas').getContext('2d')
                // Construct a Path object containing the letter shapes of the given text.
                // The other parameters are x, y and fontSize.
                // Note that y is the position of the baseline.
                // var path = font.getPath('H', 10, 100, 48)
                var HGlyths = font.stringToGlyphs('Hello')
                console.log('glyth: ', HGlyths)
                for (let i = 0; i < HGlyths.length; i++) {
                    let HPath = HGlyths[i].getPath(50, 50, 80)
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
        console.log('get!')
    }

    FBLogin () {
        this.props.FBLogin().then((state) => {
            cookie.save('user', state.payload)
            browserHistory.push('/SAT')
        })
    }
    componentWillMount () {
        let user = cookie.load('user')
        // console.log(user)
        if (user === undefined) {
            // not login yet.
        } else {
            this.props.CookieLogin(user).then(() => {
                browserHistory.push('/SAT')
            })
        }
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
                    <button className="sat_btn save_btn" onClick={this.getRaleway}>載入<span>Raleway</span></button>
                    <button className="sat_btn save_btn" >載入<span>Varins</span></button>
                </div>
                <div className="not_login_section">
                    <Containers.stroke/>
                    {/* <p>我是 SVG PATH 唷</p> */}
                    <svg id="svg">
                    </svg>
                    <canvas id="canvas" width="300" height="250"></canvas>
                    {/* <button className="sat_btn fb_btn" onClick={this.FBLogin}>以 facebook 登入</button> */}
                </div>
                {/* <div>
                  <SweetAlert
                    className="sweetalert rule"
                    show={this.state.showRule}
                    title="隱私權條款"
                    text={this.state.RuleText}
                    html={true}
                    onOutsideClick={() => this.setState({ showRule: false })}
                    onConfirm={() => this.setState({ showRule: false })}
                  />
                </div> */}
            </div>
        )
    }
}, require('./Login.styl'))
