require('dotenv').config()
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var places = require('./places')

var app = express()
app.use(cors())
app.use(bodyParser())

var baseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
app.get('/:radius', function(request,response) {
  places.find(request.params.radius).then(function(res) {
    response.json(res)
  })
})

app.listen(3000)
