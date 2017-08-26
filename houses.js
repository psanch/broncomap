var partyMap = {
		
	SCU: {

//~~~~Santa Clara University~~~//

		houseInfoList: [
			{
				Name: 'Black Market',
				Address: '1206 Market Street',
				Info: ' (ZBT)',
				Org: 'ZBT',
				Latitude: 37.345011,
				Longitude: -121.944970
			}
			,
			{
				Name: 'White House',
				Address: '860 Washington Street',
				Info: ' (ZBT)',
				Org: 'ZBT',
				Latitude: 37.348326,
				Longitude: -121.944055,
			}
			,
			{
				Name: 'Skyy Box',
				Address: '977 Bellomy Street',
				Info: ' ',
				Latitude: 37.345373,
				Longitude: -121.941716,
			}
			,
			{
				Name: 'OTR',
				Address: '531 Washington Street',
				Info: ' ',
				Latitude: 37.345496,
				Longitude: -121.941857,
			}
			,
			{
				Name: 'Ghettos',
				Address: '841 Bellomy Street',
				Info: ' ',
				Latitude: 37.345965,
				Longitude: -121.939961,
			}
			,
			{
				Name: 'Bellomys',
				Address: '850 Bellomy Street',
				Info: ' ',
				Latitude: 37.345626,
				Longitude: -121.940099,
			}
			,
		],

//SCU specific variables//

		center: {lat: 37.3477714, lng: -121.9416224},
		zoom: 15,
		markers: [],
		isMarkShown: [],
		allMarkShown: true,
		isInfoWindowShown: [],
		allMarkHidden: false,
		windows: []
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

		marker.addListener('click', function() {
			infowindow.setContent(iwContent);
			infowindow.open(scuMap, marker);
		});
		partyMap.SCU.windows.push(infowindow);
		partyMap.SCU.markers.push(marker);



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
	    
	    listItemContent = document.createTextNode(houseInfo.Name + houseInfo.Info)
	    
	    houseListElements[i].appendChild(listItemContent);
	    
	    htmlList.appendChild(houseListElements[i]);
	  }
	},//makehouselist

/*	toggleAllMark: function(school) {
	  var i;
	  var houseInfo;
	  var housePos;
	  var allButton = document.getElementById("houseListUl").getElementsByTagName("li")[0]
	  if(school.allMarkShown == false) {
	  	  partyMap.showAllMark(school);
		  allButton.innerHTML = "HIDE ALL";
	  }
	  else {
  		partyMap.hideAllMark(school);
  		allButton.innerHTML = "SHOW ALL";
	  }
	}, */

	clickList: function(school, i) {

	  var infowindow = new google.maps.InfoWindow();
	  var houseInfo = school.houseInfoList[i];
	  var j;
	  var doit = true;
	  var allButton = document.getElementById("houseListUl").getElementsByTagName("li")[0]
	
	  if(school.isMarkShown[i] == false) {
		  	if(school.allMarkHidden == true) {
		  	  	partyMap.toggleWindow(school, i);
		  	  	school.allMarkHidden = false;
		  	}
			school.markers[i].setMap(scuMap);
			school.isMarkShown[i] = true;
	  }
	  else {
  		partyMap.toggleWindow(school, i);
	  }
	},

	toggleWindow: function(school, i) {
		console.log(school.isInfoWindowShown);
		var infowindow = school.windows[i];
		var houseInfo = school.houseInfoList[i];
		if(school.isInfoWindowShown[i] == false) {
			infowindow.setContent('<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info);
			infowindow.open(scuMap, school.markers[i]);
			school.isInfoWindowShown[i] = true;
		}
		else {
			infowindow.close();
			school.isInfoWindowShown[i] = false;
		}
	},

	buildAllMark: function(school) {
	  var i;
	  var houseInfo;
	  var housePos;
	  for(i = 0; i < school.houseInfoList.length; i++) {
	    houseInfo = school.houseInfoList[i];
	    housePos = new google.maps.LatLng(houseInfo.Latitude, houseInfo.Longitude);
	    partyMap.createMarker(housePos, houseInfo.Name, '<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info, school);  
	  	school.isMarkShown[i] = true;
	  	school.isInfoWindowShown[i] = false;
	  }
	},

	hideAllMark: function(school) {
		var i;
		for(i = 0; i < school.markers.length; i++) {
			school.markers[i].setMap(null);
			school.isMarkShown[i] = false;
			school.isInfoWindowShown[i] = false;
			console.log(school.isInfoWindowShown[i]);
		}
		school.allMarkHidden = true;
		school.allMarkShown = false;
	},

	showAllMark: function(school) {
		var i;
		for(i = 0; i < school.markers.length; i++) {
			school.markers[i].setMap(scuMap);
			school.isMarkShown[i] = true;
		}
		school.allMarkShown = true;
		school.allMarkHidden = false;
	},

	listItemsListeners: function(school) {
		var i;
		listItems[0].addEventListener('click', function() { 
			partyMap.hideAllMark(partyMap.SCU);
		});
		for(i = 0; i < school.markers.length; i++) {
			partyMap.addTheListener(school, i);
		}
	},

	addTheListener: function (school, i) {
		listItems[i+1].addEventListener('click', function() { 
		partyMap.clickList(partyMap.SCU, i);
		});
	}
};//partyMap







