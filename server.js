const express = require('express')
const square = require('./square')
const wiki = require('./wiki')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/contacts'

let db
// app is an object or an instance, has methods for routing http requests
const app = express()
const PORT = 3000

// app.all(), routing method will be called in response to any HTTP method. This is used for loading middleware functions at a
// particular path for all request methods.
/*
app.all('/secret', function (req, res, next) {
  res.send('Secret book')
  console.log('Accessing the secret section ...')
  next()
})

const logger = function (req, res, next) {
  console.log('logging...')
  next()
}

app.use(logger)
*/

// setting the template engine to use and the location where Express should look for templates using the 'views' and 'view engines'
// settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Response.render() is used to render a specified template
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Customers'
  })
})

// we can use the express.static middleware to serve static files, including images, CSS and JavaScript files from a directory named
// 'public' at the same level as where we call node
// Any files in the public directory are served by adding their filename (relative to the base "public" directory) to the base URL

app.use(express.static('public'))
// app.use(express.static('src'))

// You can also create a virtual prefix for your static URLs, rather than having the files added to the base URL.
app.use('/contacts', express.static('public'))

// The app.get() method specifies a callback(route handler) function that will be invoked whenever there is an HTTP GET request with a path ('/')
// relative to the site root.
app.get('/hello', function (req, res) {
  res.send('Hello World')
})

app.get('/contactjson', (req, res) => {
  const contact = [
    {'Name': 'Archana Bansal', 'Age': 29, 'Sex': 'Female', 'City': 'Bangalore', 'State': 'Karnataka'},
    {'Name': 'Ankur Mittal', 'Age': 24, 'Sex': 'Male', 'City': 'Bhubaneshwar', 'State': 'Odisha'},
    {'Name': 'Aparna Mittal', 'Age': 30, 'Sex': 'Female', 'City': 'Mumbai', 'State': 'Maharastra'}
  ]
  res.json(contact)
})

app.get('/area', function (req, res) {
  const area = `The area of a square with a width of 5 is ${square.area(5)}`
  res.send(area)
})

app.get('/contacts', function (req, res) {
  const dbo = db.db('contacts')
  // const query = {State: 'Karnataka'}
  dbo.collection('contacts').find({}).toArray(function (err, result) {
    if (err) throw err
    res.send(result)
  })
})

// app.use() method add the Router to the middleware handling path. The two routes will then be accessible from /wiki/ and /wiki/about/
app.use('/wiki', wiki)

MongoClient.connect(url, function (err, db1) {
  if (err) throw err
  db = db1
  app.listen(PORT, function () {
    console.log('Example app listening on port ', PORT)
  })
  // const server = app.listen(3000)
  // const everyone = require('now').initialize(server)
})
