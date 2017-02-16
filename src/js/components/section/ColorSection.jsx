import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Radium from 'radium'
import { SketchPicker } from 'react-color'
import tinycolor from 'tinycolor2'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const SortableItem = SortableElement(({value, dataIndex, onRemove}) => {
    return (
        <li
            style={{
                listStyle: 'none'
            }}
        >
            <div className="colorBox"
                style={{
                    background: value,
                    color: (() => (tinycolor(value).isDark() ? 'white' : 'black'))(),
                    textAlign: 'center',
                    fontSize: '0.85em',
                    fontWeight: 'bold',
                    display: 'flex',
                    padding: '10px 0',
                    position: 'relative',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <p>{value}</p>
                <input
                    type="button"
                    value="x"
                    onClick={() => onRemove(dataIndex)}
                />
            </div>
        </li>
    )
})
const SortableList = SortableContainer(({items, onRemove}) => {
    return (
        <ul className="colorList">
            {items.map((value, index) =>
                <SortableItem
                    key={`item-${index}`}
                    dataIndex={index}
                    value={value}
                    onRemove={onRemove}
                />
            )}
        </ul>
    )
})
@Radium
export default CSSModules(class ColorSection extends Component {
    constructor (props) {
        super(props)
        // function
        this.toggleColorList = this.toggleColorList.bind(this)
        this.toggleSampleColorList = this.toggleSampleColorList.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
        this.cancelColor = this.cancelColor.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
        this.state = {
            color: 'white',
            items: ['#50514f', '#323232', '#0ef', '#0af']
        }
    }
    toggleColorList () {
        this.props.addColor(this.state.color)
    }
    toggleSampleColorList () {
    }
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex })
    }
    cancelColor (index) {
        console.log('QQ', index)
        let colorList = this.props.Stroke.colors
        colorList.splice(index, 1)
        this.props.setStrokeProps({colors: colorList})
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.setStrokeProps({colors: arrayMove(this.props.Stroke.colors, oldIndex, newIndex)})
    }
    render () {
        return (
            <section id="Color" className="main special">
                <footer className="major">
                    <ul className="actions">
                        <SketchPicker
                            color={ this.state.color }
                            onChangeComplete={ this.handleChangeComplete }
                        />
                    </ul>
                    <ul className="actions">
                        <li onClick={this.toggleColorList}><a className="button special">Add Colors</a></li>
                    </ul>
                    <ul className="actions colorListContain">
                        <SortableList
                            helperClass='sortableHelper'
                            items={this.props.Stroke.colors}
                            onRemove={(index) => this.cancelColor(index)}
                            onSortEnd={this.onSortEnd} />
                        <div style={{
                            fontStyle: 'italic',
                            wordSpacing: '2px'
                        }}>
                            * click to remove; Drag to change index.
                        </div>
                    </ul>
                </footer>
            </section>
        )
    }
}, require('./ColorSection.styl'))
