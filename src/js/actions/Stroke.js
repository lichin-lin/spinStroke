import { createAction } from 'redux-actions'
import { PromiseWrapper } from 'js/api/Base'

export default {
    addSymbol: createAction('ADD_SYMBOL', PromiseWrapper),
    clearSymbol: createAction('CLEAR_SYMBOL', PromiseWrapper),
    addColor: createAction('ADD_COLOR', PromiseWrapper),
    clearColor: createAction('CLEAR_COLOR', PromiseWrapper)
}
