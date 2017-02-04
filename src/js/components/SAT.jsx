import React, { Component, PropTypes } from 'react'
// import reactDOM from 'react-dom'
import {
    Grid,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap'
require('./../../css/page/SAT.styl')
export default class extends Component {
    static propTypes = {
        getScoreData: PropTypes.func.isRequired,
        getYearData: PropTypes.func.isRequired,
        updateUserScore: PropTypes.func.isRequired,
        userData: PropTypes.object.isRequired
    };
    static defaultProps = {
    };
    constructor (props) {
        super(props)
        this.state = {
            message: '',
            selectedYear: 96,
            scoreResult: '',
            Chinese: 0,
            English: 0,
            Math: 0,
            Society: 0,
            Science: 0
        }
        this.printResult = this.printResult.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    onFormSubmit (event) {
        event.preventDefault()
        var mappingTable = ['chniese', 'english', 'math', 'science', 'social']
        var mappingValue = [15, 15, 15, 15, 15]
        var OriYear = 'SAT' + (1911 + parseInt(this.state.selectedYear))
        var OriData = {
            Chinese: parseInt(this.state.Chinese), // parseInt(reactDOM.findDOMNode(this.refs.Chinese).value),
            English: parseInt(this.state.English), // parseInt(reactDOM.findDOMNode(this.refs.English).value),
            Math: parseInt(this.state.Math),       // parseInt(reactDOM.findDOMNode(this.refs.Math).value),
            Science: parseInt(this.state.Science),
            Society: parseInt(this.state.Society)
        }
        this.props.updateUserScore('init', OriYear, OriData)

        // trans to score.
        var calcData = OriData
        let mIndex = 0
        for (var key in OriData) {
            // skip loop if the property is from prototype
            if (!OriData.hasOwnProperty(key)) continue
            // get Original score, then do transfer.
            var score = OriData[key]
            // console.log(this.props)
            var compareList = this.props.userData.MeasureScore[mappingTable[mIndex]]

            if (score === 0) {
                mappingValue[mIndex] = 0
            } else {
                // console.log('here=======', compareList)
                for (let k = 0; k <= 15; k++) {
                    if (score < compareList[k]) {
                        mappingValue[mIndex] = k
                        break
                    }
                }
            }
            mIndex += 1
        }
        // update Object then ready to send back;
        mIndex = 0
        for (var calckey in calcData) {
            if (!calcData.hasOwnProperty(calckey)) continue
            calcData[calckey] = mappingValue[mIndex]
            mIndex += 1
        }
        // print in result input box
        // write back to user`s databse
        this.printResult(mappingValue)
        this.props.updateUserScore('score', OriYear, calcData)
    }

    printResult (mappingValue) {
        var newScoreResult = ''
        for (let i = 0; i < 5; i++) {
            newScoreResult += mappingValue[i]
            if (i < 4) newScoreResult += ' / '
        }
        this.setState({scoreResult: newScoreResult})
    }

    handleSelectChange (event) {
        var selectedYear = event.target.value
        this.setState({selectedYear: selectedYear})
        var yearIndex = 'SAT' + (1911 + parseInt(selectedYear))
        this.props.getYearData(yearIndex)
        this.props.getScoreData(yearIndex)
    }

    handleInputChange (event) {
        var tmp = {}
        tmp[event.target.name] = event.target.value
        this.setState(tmp)
    }

    componentWillReceiveProps (nextProps) {
        // console.log('receive', nextProps)
        this.setState({
            ...nextProps.userData.StudentScore
        })
    }

    componentDidMount () {
    }

    componentWillMount () {
    }
    render () {
        return (
        <div>
            <Grid>
                <form role="form" onSubmit={this.onFormSubmit}>
                    <h1>轉換 {this.state.selectedYear} 年原始分數</h1>
                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>選擇年份 choose year</ControlLabel>
                      <FormControl componentClass="select" placeholder="select" onChange={this.handleSelectChange}>
                        <option value="96">96</option>
                        <option value="97">97</option>
                        <option value="98">98</option>
                        <option value="99">99</option>
                        <option value="100">100</option>
                        <option value="101">101</option>
                        <option value="102">102</option>
                        <option value="103">103</option>
                        <option value="104">104</option>
                        <option value="105">105</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsInput">
                      <ControlLabel>國文 Chinese</ControlLabel>
                      <FormControl type="number" placeholder="0" name="Chinese" value={this.state.Chinese || ''} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup controlId="formControlsInput">
                      <ControlLabel>英文 English</ControlLabel>
                      <FormControl type="number" placeholder="0" name="English" value={this.state.English || ''} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup controlId="formControlsInput">
                      <ControlLabel>數學 Math</ControlLabel>
                      <FormControl type="number" placeholder="0" name="Math" value={this.state.Math || ''} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup controlId="formControlsInput">
                      <ControlLabel>自然 Science</ControlLabel>
                      <FormControl type="number" placeholder="0" name="Science" value={this.state.Science || ''} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup controlId="formControlsInput">
                      <ControlLabel>社會 Society</ControlLabel>
                      <FormControl type="number" placeholder="0" name="Society" value={this.state.Society || ''} onChange={this.handleInputChange} />
                    </FormGroup>
                    <button type="submit" className="btn btn-primary sat_btn">轉換並儲存</button>
                    <br/><br/>
                    <FormGroup controlId="formControlsInput">
                      <ControlLabel>轉換級分結果</ControlLabel>
                      <FormControl type="text" placeholder="原始分數" value={this.state.scoreResult} disabled>
                      </FormControl>
                    </FormGroup>
                </form>
                <br/><br/>
            </Grid>
        </div>
        )
    }
}

// icon , name
// chart, with total score
// setting, style
