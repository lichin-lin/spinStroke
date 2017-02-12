export default {
    gets: () => {
        return new Promise(
            (resolve, reject) => {
                const url = 'https://font.nctu.me/api/fonts'
                var xhr = new XMLHttpRequest()
                xhr.open('GET', url)
                xhr.send()
                xhr.onload = (msg) => {
                    resolve(JSON.parse(xhr.responseText))
                }
            }
        )
    },
    getsFontStyle: (val) => {
        console.log('get font style from => ', val.label)
        return new Promise(
            (resolve, reject) => {
                const url = 'https://font.nctu.me/api/fonts/' + val.label
                var xhr = new XMLHttpRequest()
                xhr.open('GET', url)
                xhr.send()
                xhr.onload = (msg) => {
                    resolve(JSON.parse(xhr.responseText))
                }
            }
        )
    }
}
