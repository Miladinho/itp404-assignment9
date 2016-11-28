require('dotenv').config()
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var Request = require('request')
var Places = require('./places')

var app = express()
app.use(cors())
app.use(bodyParser())

var baseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
app.get('/:radius', function(request,response) {
  console.log(request.params.radius)
  var inputURL = baseURL + "location=34.051827,-118.244918&key=" + process.env.API_KEY +
  "&radius="+request.params.radius+ "&type=food"
  var placesResults = []
  Request.get(inputURL,{json: true}, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        //response.json(body.results)
        placesResults = body.results
        var places = placesResults.map(function(place) {
          return {
            name: place.name,
            //open: place.opening_hours.open_now,
            rating: place.rating,
            price: place.price_level,
            address: place.vicinity
          }
        })
        response.json(places)
      } else {
        response.send("NO RESULTS FOUND!")
      }
  })

})

app.listen(3000)
