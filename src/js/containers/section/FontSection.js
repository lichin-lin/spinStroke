import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state, ownProps) => ({
    File: state.File
})

const mapDispatchToProps = (dispatch) => ({
    uploadFile: (data) => dispatch(Action.File.uploadFile(data)),
    getsFont: () => dispatch(Action.Font.getsFont)
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.FontSection)
