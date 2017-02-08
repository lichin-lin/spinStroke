import { handleActions } from 'redux-actions'

const initialState = {
    symbols: [],
    colors: ['#9DF3C4', '#EA7362', '#74ceee', '#FFCA61'],
    lineWidth: 3,
    speed: 3,
    during: 1.5,
    transitionDuring: 0.5
}

export default handleActions({

    ADD_SYMBOL: {
        next (state, action) {
            return {
                ...state,
                symbols: [
                    ...state.symbols,
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

    CLEAR_SYMBOL: {
        next (state, action) {
            return {
                ...state,
                symbols: []
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

    SET_STROKEPROPS: {
        next (state, action) {
            return {
                ...state,
                ...action.payload
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
