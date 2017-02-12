import React, { Component } from 'react'

export default class Header extends Component {
    render () {
        return (
            <header id="header" className="alt">
                <span className="logo"><img src="images/logo.svg" alt="" /></span>
                <iframe src='https://lichin.me/spinStroke/iframe?data=eyJzeW1ib2xzIjpbXSwiY29sb3JzIjpbIiM5REYzQzQiLCIjRUE3MzYyIiwiIzc0Y2VlZSIsIiNGRkNBNjEiXSwibGluZVdpZHRoIjozLCJzcGVlZCI6MywiZHVyaW5nIjozLCJ0cmFuc2l0aW9uRHVyaW5nIjowLjUsInRleHRzIjpbInNwaW5TdHJva2UiXSwiZm9udFNpemUiOjEwMCwiZm9udFVybCI6Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9wYWNpZmljby92OS95dW5KdDBSOHRDdk15al9WNHhTamFmZXNaVzJ4T1EteHNOcU80N201NURBLndvZmYifQ=='></iframe>
                <p>A spining stroke animation with morphing effect!<br />
                built by <a href="https://github.com/Tocknicsu">@tocknicsu</a> and <a href="https://github.com/lichin-lin">@lichin-lin</a></p>
            </header>
        )
    }
}
