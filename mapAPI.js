console.log(houseInformation.Name);
var markerList = [];
function initMap() {
  
  var infowindow = new google.maps.InfoWindow();
  var myLatLng = {lat: 37.3477714, lng: -121.9416224};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
  });
  var i;
  for(i=0; i<houseInformation.Name.length; i++) {
      var housePos = new google.maps.LatLng(houseInformation.Latitude[i], houseInformation.Longitude[i]);
      createMarker(housePos, houseInformation.Name[i], '<b>' + houseInformation.Name[i] + '</b>' + '</br>' + houseInformation.Address[i] + '</br>' + houseInformation.Info[i]);  
      console.log(markerList[i].title);
    };

    makeHouseList();

    function createMarker(latlon,title,iwContent) {
      var marker = new google.maps.Marker({
          position: latlon,
          title: title,
          label: title[0],
          map: map
        });

          markerList.push(marker);

          google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(iwContent);
          infowindow.open(map, marker);
      });
    }
}