import { connect } from 'react-redux'
import Components from 'js/components'

const mapStateToProps = (state, ownProps) => ({
    Stroke: state.Stroke
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.section.PlayGround)
