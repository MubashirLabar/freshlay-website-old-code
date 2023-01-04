let themap;

function initMap() {
  themap = new google.maps.Map(document.getElementById("mymap"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap()

//themap = new google.maps.Map(document.getElementById('mymap'), {
 //   center: {lat: -34.397, lng: 150.644},
  //  zoom: 8
  //});