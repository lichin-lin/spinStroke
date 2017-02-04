import firebase from 'firebase'
// import ApiFetch from './Base'
// import urlJoin from 'url-join'

export default {
    FBLogin: function (data) {
        var provider = new firebase.auth.FacebookAuthProvider()
        return firebase.auth().signInWithPopup(provider)
    },
    FBLogout: function (data) {
        return firebase.auth().signOut()
    },
    getScoreData: function (index) {
        var userId = firebase.auth().currentUser.uid
        console.log('in api, get score', userId, index)
        return firebase.database().ref('/users/' + userId + '/init/' + index).once('value').then(function (snapshot) {
            return snapshot.val()
        })
    },
    getYearData: function (index) {
        // let data = '1'
        return firebase.database().ref('/table/' + index).once('value').then(function (snapshot) {
            return snapshot.val()
        })
    },
    getUserTotalYearData: function () {
        var userId = firebase.auth().currentUser.uid
        console.log(userId)
        return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            return snapshot.val()
        })
    },
    updateUserScore: function (path, index, data) {
        var userId = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userId + '/' + path + '/' + index).set({
            Chinese: data.Chinese,
            English: data.English,
            Math: data.Math,
            Society: data.Society,
            Science: data.Science
        })
    },
    updateUserAvg: function (avg) {
        console.log('cout avg: ', avg)
        var userId = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userId + '/').update({
            avg: avg
        })
    },
    isUserLogin: function () {
        var user = firebase.auth().currentUser
        console.log('user:', user)
        if (user) {
            console.log('From firebase api: current user: ', user)
            return user
        } else {
            console.log('From firebase api: no current user')
            return 0
        }
    }
}
