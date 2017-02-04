import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
    FBLogout: (data) => dispatch(Action.Session.FBLogout(data)),
    FBLogin: (data) => dispatch(Action.Session.FBLogin(data)),
    getUserData: () => dispatch(Action.User.getUserData())
})
export default connect(mapStateToProps, mapDispatchToProps)(Components.App)
