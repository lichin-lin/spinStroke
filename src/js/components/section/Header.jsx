import React, { Component } from 'react'

export default class Header extends Component {
    render () {
        return (
            <header id="header" className="alt">
                <span className="logo"><img src="images/logo.svg" alt="" /></span>
                <h1>SpinStroke</h1>
                <p>A spining stroke animation with morphing effect!<br />
                built by <a href="https://web.poe.garena.tw/account/view-profile/TocknicSu">@tocknicsu</a>.</p>
            </header>
        )
    }
}
