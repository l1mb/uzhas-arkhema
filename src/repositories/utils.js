const toCamel = (s) => {
    return s.toLowerCase().replace(/([_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('_', '')
    })
}

const isArray = (a) => Array.isArray(a)

const isObject = (o) =>
    o === Object(o) && !isArray(o) && typeof o !== 'function'

module.exports.keysToCamel = keysToCamel = (o) => {
    if (isObject(o)) {
        const n = {}

        Object.keys(o).forEach((k) => {
            n[toCamel(k)] = keysToCamel(o[k])
        })

        return n
    } else if (isArray(o)) {
        return o.map((i) => {
            return keysToCamel(i)
        })
    }

    return o
}
