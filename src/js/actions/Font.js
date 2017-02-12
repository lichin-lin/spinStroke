import { createAction } from 'redux-actions'
import { PromiseWrapper } from 'js/api/Base'
import Api from 'js/api'

export default {
    getsFont: createAction('GETS_FONT', Api.Font.gets),
    getsFontStyle: createAction('GETS_FONTSTYLE', Api.Font.getsFontStyle),
    uploadFile: createAction('UPLOAD_FILE', PromiseWrapper)
}
