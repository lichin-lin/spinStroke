import React, { Component } from 'react'
import GitHubButton from 'react-github-button'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import 'react-github-button/assets/style.css'

export default class Header extends Component {
    render () {
        return (
            <header id="header" className="alt">
                {/* <iframe width={500} height={200} src='https://lichin.me/spinStroke/iframe?data=eyJzeW1ib2xzIjpbXSwiY29sb3JzIjpbIiM5REYzQzQiLCIjRUE3MzYyIiwiIzc0Y2VlZSJdLCJsaW5lV2lkdGgiOjMsInNwZWVkIjozLCJkdXJpbmciOjEuNSwidHJhbnNpdGlvbkR1cmluZyI6MC41LCJ0ZXh0cyI6WyJTcGluU3Ryb2tlIl0sImZvbnRTaXplIjoxMDAsImhlaWdodCI6IjIwMCIsIndpZHRoIjoiNTAwIiwiZm9udFVybCI6Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9wYWNpZmljby92OS95dW5KdDBSOHRDdk15al9WNHhTamFmZXNaVzJ4T1EteHNOcU80N201NURBLndvZmYifQ=4='></iframe> */}
                <iframe width={500} height={200} src='https://lichin.me/spinStroke/iframe?data=eyJzeW1ib2xzIjpbXSwiY29sb3JzIjpbIiM3OGJiZTYiLCIjZmY4OTVkIiwiI2Y2ZWI5YSJdLCJsaW5lV2lkdGgiOjMsInNwZWVkIjozLCJkdXJpbmciOjEuNSwidHJhbnNpdGlvbkR1cmluZyI6MC41LCJ0ZXh0cyI6WyJTcGluU3Ryb2tlIl0sImZvbnRTaXplIjoxMDAsImhlaWdodCI6IjIwMCIsIndpZHRoIjoiNTAwIiwiZm9udFVybCI6Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9wYWNpZmljby92OS95dW5KdDBSOHRDdk15al9WNHhTamFmZXNaVzJ4T1EteHNOcU80N201NURBLndvZmYifQ=='></iframe>
                <p style={{
                    color: '#EFEFEF'
                }}
                >A spining stroke animation with morphing effect!<br />
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
}
