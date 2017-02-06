import { handleActions } from 'redux-actions'

const initialState = {
    colors: ['#9DF3C4', '#EA7362', '#74ceee', '#FFCA61'],
    paths: []
}

export default handleActions({

    ADD_PATH: {
        next (state, action) {
            return {
                ...state,
                paths: [
                    ...state.paths,
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

    CLEAR_PATH: {
        next (state, action) {
            return {
                ...state,
                paths: []
            }
        },
        throw (state, action) {
            return {
                ...state
            }
        }
    },

    ADD_COLOR: {
        next (state, action) {
            return {
                ...state,
                colors: [
                    ...state.colors,
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

    CLEAR_COLOR: {
        next (state, action) {
            return {
                ...state,
                colors: []
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
