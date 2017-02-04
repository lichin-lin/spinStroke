import { createAction } from 'redux-actions'
import Api from 'js/api'
export default {
    FBLogin: createAction('FBLogin', Api.Firebase.FBLogin),
    FBLogout: createAction('FBLogout', Api.Firebase.FBLogout),
    CookieLogin: createAction('CookieLogin', function (data) {
        return new Promise(function (resolve, reject) {
            resolve(data)
        })
    })
}
