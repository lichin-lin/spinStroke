import React, { Component } from 'react'

export default class FooterSection extends Component {
    render () {
        return (
            <footer id="footer">
                <section>
                    <h2>What is SpinStroke</h2>
                    <p>
                        this work was inspired by <br/><a href="https://codepen.io/rachsmith/details/ONVQWv" target="_blank">morphing shape with spinning color stroke (svg + canvas)</a> and fancy effect on <a href="https://events.google.com/io2016/" target="_blank"></a>
                    </p>
                    <ul className="actions footerLi">
                        <li><a href="https://codepen.io/lichin-lin/pen/NdpaLa" target="_blank" className="button">Codepen example</a></li>
                        <li><a href="#" className="button">Blog post</a></li>
                    </ul>
                </section>
                <p className="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
            </footer>
        )
    }
}
