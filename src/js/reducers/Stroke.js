import { handleActions } from 'redux-actions'

const initialState = {
    colors: ['#9DF3C4', '#EA7362', '#74ceee', '#FFCA61'],
    symbols: []
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

    default: (state, action) => {
        return {
            ...state
        }
    }
}, initialState)
