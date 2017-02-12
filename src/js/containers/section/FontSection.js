import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    Font: state.Font,
    Stroke: state.Stroke
})

const mapDispatchToProps = (dispatch) => ({
    uploadFile: (data) => dispatch(Action.Font.uploadFile(data)),
    getsFont: (data) => dispatch(Action.Font.getsFont(data)),
    getsFontStyle: (data) => dispatch(Action.Font.getsFontStyle(data)),
    setStrokeProps: (data) => dispatch(Action.Stroke.setProps(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.FontSection)
