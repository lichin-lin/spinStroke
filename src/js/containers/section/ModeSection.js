import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    Text: state.Text,
    Font: state.Font,
    Stroke: state.Stroke
})

const mapDispatchToProps = (dispatch) => ({
    modifyText: (data) => dispatch(Action.Text.modifyText(data)),
    modifyTextBound: (data) => dispatch(Action.Text.modifyTextBound(data)),
    addSymbol: (data) => dispatch(Action.Stroke.addSymbol(data)),
    clearSymbol: (data) => dispatch(Action.Stroke.clearSymbol(data)),
    setStrokeProps: (data) => dispatch(Action.Stroke.setProps(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.ModeSection)
