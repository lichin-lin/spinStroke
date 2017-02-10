import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Containers from 'js/containers'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import FaFont from 'react-icons/lib/fa/font'
import TiCogOutline from 'react-icons/lib/ti/cog-outline'
import FaEyedropper from 'react-icons/lib/fa/eyedropper'

export default CSSModules(class ControllSection extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: 500
        }
    }
    handleSelect (index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last)
    }
    render () {
        return (
            <section id="Font" className="main special">
                    <ul className="actions">
                        <Tabs
                          onSelect={this.handleSelect}
                          selectedIndex={2}
                        >
                            <TabList>
                                <Tab>
                                    <div className="TabInfo">
                                        <FaFont size={24}/>
                                        <p>Font</p>
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className="TabInfo">
                                        <FaEyedropper size={24}/>
                                        <p>Color</p>
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className="TabInfo">
                                        <TiCogOutline size={24}/>
                                        <p>Setting</p>
                                    </div>
                                </Tab>
                            </TabList>

                            <TabPanel>
                                <Containers.section.FontSection />
                            </TabPanel>
                            <TabPanel>
                                <Containers.section.ColorSection />
                            </TabPanel>
                            <TabPanel>
                                <Containers.section.ModeSection />
                            </TabPanel>
                        </Tabs>
                    </ul>
            </section>
        )
    }
// }, require('./../../../sass/ControllSection/css/style.css'))
}, require('./ControllSection.styl'))
