console.log(partyMap.SCU.houseInfoList);
function initMap() {
  
  var infowindow = new google.maps.InfoWindow();
  var myLatLng = partyMap.SCU.center;
  var mapZoom = partyMap.SCU.zoom;
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: mapZoom,
    center: myLatLng
  });
  var i;
  for(i=0; i<partyMap.SCU.houseInfoList.length; i++) {
      var houseInfo = partyMap.SCU.houseInfoList[i];
      var housePos = new google.maps.LatLng(houseInfo.Latitude, houseInfo.Longitude);
      createMarker(housePos, houseInfo.Name, '<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info);  
      console.log(partyMap.SCU.markers[i]);
    };

    function createMarker(latlon,title,iwContent) {
      var marker = new google.maps.Marker({
          position: latlon,
          title: title,
          label: title[0],
          map: map
        });

          partyMap.SCU.markers.push(marker);

          google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(iwContent);
          infowindow.open(map, marker);
      });
    }
}