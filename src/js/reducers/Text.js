import { handleActions } from 'redux-actions'

const initialState = {
    input: ''
}

export default handleActions({

    MODIFY_TEXT: {
        next (state, action) {
            return {
                ...state,
                input: action.payload
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
