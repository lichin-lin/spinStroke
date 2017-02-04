var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')
var app = express()
var compiler = webpack(config)
const port = process.env.PORT || 3000
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    },
    publicPath: config.output.publicPath
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/src/index.html'))
})

app.listen(port, '0.0.0.0', function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Listening at http://0.0.0.0:${port}`)
})
