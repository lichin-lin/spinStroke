export const mapArrayToObject = (arr: Array<Object>, indexName: string='id'): {[key: string]: any} => {
    let res = {}
    arr.map(x => (res[x[indexName]] = x))
    return res
}

export const mapObject = (self: Object, func: Function, reverse?: Boolean=false): Array<any> => {
    let keys = Object.keys(self)
    let res = []
    let cnt = 0
    if (reverse) {
        keys = keys.reverse()
    }
    for (let i in keys) {
        let key = keys[i]
        res.push(func(self[key], cnt++, key))
    }
    return res
}

export const ord = x => x.charCodeAt(0)

export const chr = x => String.fromCharCode(x)
