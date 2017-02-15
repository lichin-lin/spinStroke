import { handleActions } from 'redux-actions'

const initialState = {
    symbols: [],
    colors: ['#9DF3C4', '#EA7362', '#74ceee', '#FFCA61'],
    lineWidth: 2,
    speed: 2,
    during: 2,
    transitionDuring: 0.5,
    texts: ['edit', 'here'],
    fontSize: 200,
    height: 200,
    width: 500,
    fontUrl: 'https://fonts.gstatic.com/s/pacifico/v9/yunJt0R8tCvMyj_V4xSjafesZW2xOQ-xsNqO47m55DA.woff'
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
    UPLOAD_FILE: {
        next (state, action) {
            return {
                ...state,
                fontUrl: action.payload
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
