import { createAction } from 'redux-actions'
import { PromiseWrapper } from 'js/api/Base'

export default {
    modifyText: createAction('MODIFY_TEXT', PromiseWrapper),
    modifyTextBound: createAction('MODIFY_TEXTBOUND', PromiseWrapper)
}
