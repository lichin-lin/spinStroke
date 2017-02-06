import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    Stroke: state.Stroke
})

const mapDispatchToProps = (dispatch) => ({
    addSymbol: (data) => dispatch(Action.Stroke.addSymbol(data)),
    clearSymbol: (data) => dispatch(Action.Stroke.clearSymbol(data)),
    addColor: (data) => dispatch(Action.Stroke.addColor(data)),
    clearColor: (data) => dispatch(Action.Stroke.clearColor(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.stroke)
