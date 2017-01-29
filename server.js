var path =  require('path')
var express = require('express')
var app = express()

var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

// Hot module replacement configuration
var compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))

// Express configuration
var port = 4000

app.use('*', express.static('public'))

app.listen(port, function (error) {
  if (error)
    console.error(error)
  else
    console.info('Listening on http://localhost:%s/', port)
})
