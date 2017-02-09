import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Containers from 'js/containers'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import FaFont from 'react-icons/lib/fa/font'
import TiCogOutline from 'react-icons/lib/ti/cog-outline'
import FaEyedropper from 'react-icons/lib/fa/eyedropper'

export default CSSModules(class ControllSection extends Component {
    handleSelect (index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last)
    }
    render () {
        return (
            <section id="Font" className="main special">
                <footer className="major">
                    <ul className="actions">
                        <Tabs
                          onSelect={this.handleSelect}
                          selectedIndex={2}
                        >
                            <TabList>
                                <Tab>
                                    <div className="TabInfo">
                                        <FaFont size={24}/>
                                        Font
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className="TabInfo">
                                        <FaEyedropper size={24}/>
                                        Color
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className="TabInfo">
                                        <TiCogOutline size={24}/>
                                        Setting
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
                </footer>
            </section>
        )
    }
// }, require('./../../../sass/ControllSection/css/style.css'))
}, require('./ControllSection.styl'))
