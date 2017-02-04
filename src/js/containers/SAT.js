import { connect } from 'react-redux'
import Components from 'js/components'
import Action from 'js/actions'
const mapStateToProps = (state) => ({
    userData: state.SAT
})

const mapDispatchToProps = (dispatch) => ({
    getScoreData: (year) => dispatch(Action.SAT.getScoreData(year)),
    getYearData: (year) => dispatch(Action.SAT.getYearData(year)),
    updateUserScore: (path, index, data) => dispatch(Action.SAT.updateUserScore(path, index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Components.SAT)
