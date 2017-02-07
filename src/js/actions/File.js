import { createAction } from 'redux-actions'
import { PromiseWrapper } from 'js/api/Base'

export default {
    uploadFile: createAction('UPLOAD_FILE', PromiseWrapper)
}
