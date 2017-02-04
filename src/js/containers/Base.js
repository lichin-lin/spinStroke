import { connect } from 'react-redux'
import Components from 'js/components'

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.Base)
