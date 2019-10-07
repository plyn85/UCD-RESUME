//adding initMap function here function has to be called that to work
function initMap() {
  //setting var to grab div an use google maps method
  var map = new google.maps.Map(document.getElementById("map"), {
    //Setting location and  zoom here
    zoom: 3,
    center: {
      lat: 46.619261,
      lng: -33.134766
    }
  });
  //this string  of the alphabet is used to label the markers
  var labels = "abcdefghijklmnopqrstuvwxyz";
  //creating an array of objects containing the locations here
  var locations = [
    {
      lat: 40.785091,
      lng: -73.968285
    },
    {
      lat: 40.785091,
      lng: -73.968285
    },

    {
      lat: 40.785091,
      lng: -73.968285
    }
  ];
  //map method similar to forEach but it returns a new  array
  //map method can take up to three agruments //where using two here
  //the first map() method here is a javascript method not google maps API
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      // where using % here in case theres more than 26 locations so it can loop back through the label string
      label: labels[i % labels.length]
    });
  });
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  });
}
