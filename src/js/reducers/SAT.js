import { handleActions } from 'redux-actions'

const initialState = {
    MeasureScore: {},
    StudentScore: {},
    TotalScore: {}
}

export default handleActions({

    default: (state, action) => {
        return {
            ...state
        }
    }
}, initialState)
