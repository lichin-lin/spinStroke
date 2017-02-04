import React, { Component } from 'react'
import {
    Navbar,
    NavItem,
    Nav
} from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
export default class extends Component {
    render () {
        return (
        <Navbar fixedTop collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <IndexLinkContainer to="/">
                        <a href="#">學測.大平台</a>
                    </IndexLinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/SAT">
                        <NavItem>轉換分數</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/chart">
                        <NavItem>統計圖表</NavItem>
                    </LinkContainer>
                    <IndexLinkContainer to="/">
                        <NavItem>關於</NavItem>
                    </IndexLinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}
