import { handleActions } from 'redux-actions'

const initialState = {
    Flag: 0,
    File: ''
}

export default handleActions({

    UPLOAD_FILE: {
        next (state, action) {
            return {
                ...state,
                File: [
                    ...state.File,
                    action.payload
                ]
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
