import { handleActions } from 'redux-actions'

const initialState = {
    Flag: false,
    File: ''
}

export default handleActions({

    UPLOAD_FILE: {
        next (state, action) {
            return {
                ...state,
                Flag: true,
                File: action.payload
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
