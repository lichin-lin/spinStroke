import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    File: state.File,
    Font: state.Font
})

const mapDispatchToProps = (dispatch) => ({
    uploadFile: (data) => dispatch(Action.File.uploadFile(data)),
    getsFont: (data) => dispatch(Action.Font.getsFont(data)),
    getsFontStyle: (data) => dispatch(Action.Font.getsFontStyle(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.FontSection)
