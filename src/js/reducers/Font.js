import { handleActions } from 'redux-actions'

const initialState = {
    AllFont: [],
    FontStyle: []
}

export default handleActions({
    GETS_FONT: {
        next (state, action) {
            return {
                ...state,
                AllFont: action.payload
            }
        },
        throw (state, action) {
            return {
                ...state
            }
        }
    },
    GETS_FONTSTYLE: {
        next (state, action) {
            return {
                ...state,
                FontStyle: action.payload.variants
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
