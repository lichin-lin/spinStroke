import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    Stroke: state.Stroke
})

const mapDispatchToProps = (dispatch) => ({
    addColor: (data) => dispatch(Action.Stroke.addColor(data)),
    clearColor: (data) => dispatch(Action.Stroke.clearColor(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.ColorSection)
