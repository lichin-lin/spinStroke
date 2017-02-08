import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    Text: state.Text,
    File: state.File,
    Stroke: state.Stroke
})

const mapDispatchToProps = (dispatch) => ({
    modifyText: (data) => dispatch(Action.Text.modifyText(data)),
    addSymbol: (data) => dispatch(Action.Stroke.addSymbol(data)),
    clearSymbol: (data) => dispatch(Action.Stroke.clearSymbol(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.ModeSection)
