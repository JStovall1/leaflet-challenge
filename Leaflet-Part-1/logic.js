var map = L.map('map').setView([38.897459095238304, -101.49813178021594], 5);


// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// grab data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// style object
var mapStyle = {
  color: "white",
  fillColor: "pink",
  fillOpacity: 0.5,
  weight: 1.5
};


// The function that will determine the color the circles
function chooseColor(mag) {
  if (mag < "1") return "yellow";
  else if (mag < "1.5") return "red";
  else if (mag < "2") return "orange";
  else if (mag < "2.5") return "green";
  else if (mag < "3") return "purple";
  else return "blue";
}

d3.json(link).then(function (data) {

  function styleInfo(feature) {

    return {
      fillOpacity: 1,
      fillColor: chooseColor(feature.geometry.coordinates[2]),
      color: '#000000',
      opacity: 1,
      weight: 1.5,
      // radius: READ THE MAGNITUDE IN AND MULTIPLY IT BY SOMETHING (featurePropertiesMag)
      // set default radius of 1 if mag is less than 1
    };
  }

  function featurePropertiesMag(mag) {
    if (mag < "1*5") return "green";
    else if (mag < "1.5*5") return "green";
    else if (mag < "2*5") return "green";
    else if (mag < "2.5*5") return "green";
    else if (mag < "3*5") return "green";
    else return "black";
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latLong){
      return L.circleMarker(latLong);
    },
    style: styleInfo

  }).addTo(map);

});



