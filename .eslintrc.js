module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: "standard",
    plugins: ["react"],
    env: {
        'browser': true
    },
    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        'strict': 0,
        'arrow-parens': 0,
        'indent': [ 2, 4, { 'SwitchCase': 1 } ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
