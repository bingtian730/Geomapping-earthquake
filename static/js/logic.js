//Earthquake mapping


var myMap = L.map("map", {
  center: [40.7, -111.89],
  zoom: 4
});

var street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);





var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Overlays that may be toggled on or off
var cityLayer = L.layerGroup(data);
var overlayMaps = {
  circle: cityLayer
};

L.control
  .layers(baseMaps, overlayMaps)
  .addTo(myMap);


var url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

var data=d3.json(url, function(data){
  //L.geoJson(data).addTo(myMap);

  var circle = L.markerClusterGroup();
  console.log(data.features[0].geometry.coordinates);
  console.log(data.features[0].properties.sig);

  function getColor(range){
    return range > '800' ? '#d95f0e' :
    range > '700' ? '#fec44f' :
    range > '600' ? '#fff7bc' :
    '#addd8e';  //In case it's not defined.
  };
  //console.log(data.features.length);
  //var circle_1 = L.circle([data.features[0].geometry.coordinates[1],data.features[0].geometry.coordinates[0]], {
    //color: 'white',
    //fillColor: 'black',
    //fillOpacity: 0.5,
    //radius: 500
//}).addTo(myMap);
  // Loop through data
  for (var i = 0; i < data.features.length; i++) {

    // Set the data location property to a variable
    var coordinates= data.features[i].geometry.coordinates;
    var sig = data.features[i].properties.sig
    var title=data.features[i].properties.title
        console.log(coordinates);
    // Check for location property


    if (coordinates) {


       var dots=L.circle([coordinates[1],coordinates[0]],{
        color: getColor(sig),
        fillColor: getColor(sig),
        fillOpacity: 0.8,
        radius: sig*100 }).bindPopup(title).addTo(myMap);
      // Add a new marker to the cluster group and bind a pop-up
      ////circle.addLayer(L.marker([coordinates[1],coordinates[0]])
        
        //);
    }

  }

myMap.addLayer(circle);
});

 
    //var location = infos[i].geometry.coordinates;

    // Check for location property
   
  // if (location) {

      // Add a new marker to the cluster group and bind a pop-up
     // markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        //.bindPopup());
    //}

 // }


// Add our marker cluster layer to the map
  //myMap.addLayer(markers);

//});



// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
//d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", createMarkers);
