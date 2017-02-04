import { handleActions } from 'redux-actions'

const initialState = {}

export default handleActions({

    ACTION: {
        next (state, action) {
            return {
                ...state
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
