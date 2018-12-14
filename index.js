const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

// App
const app = express()

// Midlewares
app.use(bodyParser.json())

// static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// setup pug engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)
app.get('/', function (_, res) {
  res.redirect('/products')
})

// server
const server = app.listen(3000, function () {
  console.log(`Listening on http://localhost:${server.address().port}`)
})
