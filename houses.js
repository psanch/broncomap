var partyMap = {
		
	SCU: {

//~~~~Santa Clara University~~~//

		houseInfoList: [
			{
				Name: 'Black Market',
				Address: '1206 Market Street',
				Info: 'ZBT House',
				Latitude: 37.345011,
				Longitude: -121.944970
			},
			{
				Name: 'White House',
				Address: '860 Washington Street',
				Info: 'ZBT House',
				Latitude: 37.348326,
				Longitude: -121.944055,
			},
			{
				Name: 'Skyy Box',
				Address: '977 Bellomy Street',
				Info: 'Entrance to OTR Backyard',
				Latitude: 37.345373,
				Longitude: -121.941716,
			},
			{
				Name: 'OTR',
				Address: '531 Washington Street',
				Info: 'Day Party Hotspot',
				Latitude: 37.345496,
				Longitude: -121.941857,
			},
			{
				Name: 'Ghettos',
				Address: '841 Bellomy Street',
				Info: 'Swig Smoke Spot',
				Latitude: 37.345965,
				Longitude: -121.939961,
			},
			{
				Name: 'Bellomys',
				Address: '850 Bellomy Street',
				Info: 'Apartments',
				Latitude: 37.345626,
				Longitude: -121.940099,
			},
		],

//SCU specific variables//

		center: {lat: 37.3477714, lng: -121.9416224},
		zoom: 15,
		markers: [],
		isMarkShown: []
	},//SCU

//~~~~San Jose State University~~~//	

	SJSU: {

		houseInfoList: [
			{
				Name: 'Kappa Sigma House',
				Address: '168 S 11th St',
				Info: 'Theta Iota Chapter',
				Latitude: 37.3386334,
				Longitude: -121.8798163
			}
		],
		
		center: {lat: 37.335912, lng: -121.880007},
		zoom: 14,
		markers: [],
	},//SJSU

//~~~~~FUNCTIONS~~~~~//

/*	OLD INITMAP
	initMap: function(school, element) {

		var infowindow = new google.maps.InfoWindow();
		var myLatLng = school.center;
		var mapZoom = school.zoom;

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: mapZoom,
			center: myLatLng
		});

		var i;


		var houseInfo = school.houseInfoList[element];

		var housePos = new google.maps.LatLng(houseInfo.Latitude, houseInfo.Longitude);
		createMarker(housePos, houseInfo.Name, '<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info);  


		function createMarker(latlon,title,iwContent) {
		  	var marker = new google.maps.Marker({
				position: latlon,
				title: title,
				label: title[0],
				map: map
			});

			markers.push(marker);

			google.maps.event.addListener(marker, 'click', function () {
				infowindow.setContent(iwContent);
				infowindow.open(map, marker);
		  	});
		}
	},//initMap
*/

	initMap: function(school) {

		var myLatLng = school.center;
		var mapZoom = school.zoom;

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: mapZoom,
			center: myLatLng
		});
		return map;
	},//initMap


	createMarker: function(latlon,title,iwContent, map) {
	  	var infowindow = new google.maps.InfoWindow();
	  	var marker = new google.maps.Marker({
			position: latlon,
			title: title,
			label: title[0],
			map: scuMap
		});

		partyMap.SCU.markers.push(marker);

		google.maps.event.addListener(marker, 'click', function () {
			infowindow.setContent(iwContent);
			infowindow.open(scuMap, marker);
	  	});
	},//createMarker

	removeMarker: function(mark) {
		partyMap.SCU.markers[mark].setMap(null);
	},

	makeHouseList: function(school) {
	  var i;
	  var listItemContent;
	  var houseListElements = [];
	  var htmlList = document.getElementById("houseListUl");
	  var listAttribute = document.createAttribute("class");
	  listAttribute.value = "list-group-item";

	  for(i=0; i<school.houseInfoList.length; i++) {
	  	var houseInfo = school.houseInfoList[i]
	    var listAttributeClone = listAttribute.cloneNode();
	    houseListElements[i] = document.createElement("li");
	    houseListElements[i].setAttributeNode(listAttributeClone);
	    
	    listItemContent = document.createTextNode(houseInfo.Name + ':    ' + houseInfo.Info)
	    
	    houseListElements[i].appendChild(listItemContent);
	    
	    htmlList.appendChild(houseListElements[i]);
	  }
	},//makehouselist

	toggleAllMark: function(school, isShown) {
	  var i;
	  var houseInfo;
	  var housePos;
	  if(isShown == false) {
	  	  partyMap.showAllMark(school);
		  document.getElementById("houseListUl").getElementsByTagName("li")[0].innerHTML = "HIDE ALL";
		  return true;
	  }
	  else {
  		partyMap.hideAllMark(school);
  		document.getElementById("houseListUl").getElementsByTagName("li")[0].innerHTML = "SHOW ALL";
  		return false;
	  }
	},

	toggleMark: function(school, isShown, i) {
	  if(isShown == false) {
		  school.markers[i].setMap(scuMap);
		  return true;
	  }
	  else {
  		school.markers[i].setMap(null);
  		return false;
	  }
	},

	buildAllMark: function(school) {
	  var i;
	  var houseInfo;
	  var housePos;
	  for(i = 0; i < school.houseInfoList.length; i++) {
	    houseInfo = school.houseInfoList[i];
	    housePos = new google.maps.LatLng(houseInfo.Latitude, houseInfo.Longitude);
	    partyMap.createMarker(housePos, houseInfo.Name, '<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info);  
	  	school.isMarkShown[i] = true;
	  }
	},

	hideAllMark: function(school) {
		var i;
		for(i = 0; i < school.markers.length; i++) {
			school.markers[i].setMap(null);
			school.isMarkShown[i] = false;
		}
	},

	showAllMark: function(school) {
		var i;
		for(i = 0; i < school.markers.length; i++) {
			school.markers[i].setMap(scuMap);
			school.isMarkShown[i] = true;
		}
	},

	listItemsListeners: function(school) {
		var i;
		for(i = 0; i < school.markers.length; i++) {
			partyMap.addTheListener(school, i);
		}
	},

	addTheListener: function (school, i) {
		listItems[i+1].addEventListener('click', function() { 
			school.isMarkShown[i] = partyMap.toggleMark(partyMap.SCU, school.isMarkShown[i], i);
		});
	}
};//partyMap







