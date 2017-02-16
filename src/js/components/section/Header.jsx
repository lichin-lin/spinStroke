import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import GitHubButton from 'react-github-button'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import 'react-github-button/assets/style.css'

export default CSSModules(class Header extends Component {
    render () {
        return (
            <header id="header" className="alt">
                <div className="desktop_banner"
                    style={{

                    }}><iframe width={500} height={200} src='https://lichin.me/spinStroke/iframe?data=eyJzeW1ib2xzIjpbXSwiY29sb3JzIjpbIiM3OGJiZTYiLCIjZmY4OTVkIiwiI2Y2ZWI5YSJdLCJsaW5lV2lkdGgiOjMsInNwZWVkIjozLCJkdXJpbmciOjEuNSwidHJhbnNpdGlvbkR1cmluZyI6MC41LCJ0ZXh0cyI6WyJTcGluU3Ryb2tlIl0sImZvbnRTaXplIjoxMDAsImhlaWdodCI6IjIwMCIsIndpZHRoIjoiNTAwIiwiZm9udFVybCI6Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9wYWNpZmljby92OS95dW5KdDBSOHRDdk15al9WNHhTamFmZXNaVzJ4T1EteHNOcU80N201NURBLndvZmYifQ=='></iframe>
                </div>
                <div className="mobile_banner"
                    style={{

                    }}><iframe width={250} height={100} src='https://lichin.me/spinStroke/iframe?data=eyJzeW1ib2xzIjpbXSwiY29sb3JzIjpbIiM2ZWI2ZmYiLCIjYTZlZDhlIiwiI2ZmOTg5OCJdLCJsaW5lV2lkdGgiOjIsInNwZWVkIjoyLCJkdXJpbmciOjIsInRyYW5zaXRpb25EdXJpbmciOjAuNSwidGV4dHMiOlsiU3BpblN0cm9rZSJdLCJmb250U2l6ZSI6NTAsImhlaWdodCI6IjEwMCIsIndpZHRoIjoiMjUwIiwiZm9udFVybCI6Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9wYWNpZmljby92OS95dW5KdDBSOHRDdk15al9WNHhTamFmZXNaVzJ4T1EteHNOcU80N201NURBLndvZmYifQ=='></iframe>
                </div>
                <p style={{
                    color: '#EFEFEF'
                }}
                >Spinning stroke animation with morphing effect!<br />
                built by <a href="https://github.com/Tocknicsu">@tocknicsu</a> and <a href="https://github.com/lichin-lin">@lichin-lin</a></p>
                <div className="Github">
                    <GitHubButton type="stargazers" size="large" namespace="lichin-lin" repo="spinStroke" />
                </div>
            <GitHubForkRibbon href="https://github.com/lichin-lin/spinStroke/" target="_blank" position="right" color="black">
                Fork me on GitHub
            </GitHubForkRibbon>
            </header>
        )
    }
}, require('./Header.styl'))
