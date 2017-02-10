import { handleActions } from 'redux-actions'

const initialState = {
    Font: ''
}

export default handleActions({
    GETS_FONT: {
        next (state, action) {
            return {
                ...state,
                Font: action.payload
            }
        },
        throw (state, action) {
            return {
                ...state
            }
        }
    },

    default: (state, action) => {
        return {
            ...state
        }
    }
}, initialState)
