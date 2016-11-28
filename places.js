var Request = require('request')

var baseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"

var x = {
  find: function(radius) {
    return new Promise(function(resolve,reject) {
      var inputURL = baseURL + "location=34.051827,-118.244918&key=" + process.env.API_KEY +
      "&radius="+radius+ "&type=food"

      var placesResults = []
      Request.get(inputURL,{json: true}, function(err, res, body) {
          if (!err && res.statusCode === 200) {
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
            resolve(places)
          } else {
            reject("NO RESULTS FOUND!")
          }
      })
    })
  }
}

module.exports = x
