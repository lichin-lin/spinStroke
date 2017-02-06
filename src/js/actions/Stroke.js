import { createAction } from 'redux-actions'
import { PromiseWrapper } from 'js/api/Base'

export default {
    addPath: createAction('ADD_PATH', PromiseWrapper),
    clearPath: createAction('CLEAR_PATH', PromiseWrapper),
    addColor: createAction('ADD_COLOR', PromiseWrapper),
    clearColor: createAction('CLEAR_COLOR', PromiseWrapper)
}
