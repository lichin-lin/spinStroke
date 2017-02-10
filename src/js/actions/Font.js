import { createAction } from 'redux-actions'
import Api from 'js/api'

export default {
    getsFont: createAction('GETS_FONT', Api.Font.gets)
}
