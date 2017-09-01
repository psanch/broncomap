	function initMap (school) {

		var myLatLng = school.center;
		var mapZoom = school.zoom;

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: mapZoom,
			center: myLatLng
		});
		school.map = map;
	}//initMap


	function createMarker (i, school, latlon, title, iwContent, map) {
	  	var infowindow = new google.maps.InfoWindow();
	  	var houseInfo = school.houseInfoList[i];
	  	var marker = new google.maps.Marker({
			position: latlon,
			title: title,
			map: null
		});

		switch(houseInfo.Type) {
			case 'residencehall':
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
				break;

			case 'greek':
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
				break;
				
			case 'offcampus':
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
				break;

		}

		school.windows.push(infowindow);
		school.windows[i].setContent(iwContent);

		marker.addListener('click', function() {
			clickList(school, i);
		});
		school.markers.push(marker);
	}//createMarker

	function removeMarker (mark, school) {
		school.markers[mark].setMap(null);
	}

	function makeHouseList (school) {
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
	}//makehouselist

/*	toggleAllMark (school) {
	  var i;
	  var houseInfo;
	  var housePos;
	  var allButton = document.getElementById("houseListUl").getElementsByTagName("li")[0]
	  if(school.allMarkShown == false) {
	  	  showAllMark(school);
		  allButton.innerHTML = "HIDE ALL";
	  }
	  else {
  		hideAllMark(school);
  		allButton.innerHTML = "SHOW ALL";
	  }
	} */

	function clickList (school, i) {
		if(school.allMarkShown == false) {
  			switchItem(school, i);
  		}
  		school.markers[i].setMap(school.map);
  		school.windows[i].open(school.map, school.markers[i]);
		school.isMarkShown[i] = true;
		listItems[i].classList.add("active");
	}

	function switchItem (school, i) {
		var allButtons = document.getElementById("houseListUl").getElementsByTagName("li");
		if(lastWindowShown != school.windows[i]) {
			lastWindowShown.close();
			lastMarkerShown.setMap(null);
			lastWindowShown = school.windows[i];
			lastMarkerShown = school.markers[i];
			listItems[i].classList.add("active");
			lastItemClicked.classList.remove("active");
			lastItemClicked = allButtons[i];
		}
	}

	//currently unused//
	function toggleWindow (school, i) {
		var infowindow = school.windows[i];
		var houseInfo = school.houseInfoList[i];
		if(school.isInfoWindowShown[i] == false) {
			infowindow.open(school.map, school.markers[i]);
			school.isInfoWindowShown[i] = true;
		}
		else {
			infowindow.close();
			school.isInfoWindowShown[i] = false;
		}
	}

	function createMapsLink (school, i) {
		var houseInfo = school.houseInfoList[i]
		var mapsLink = document.createElement('a');
		var linkText = document.createTextNode("View in Google Maps");
		var linkAddress = 'https://maps.google.com?q=' + houseInfo.Latitude + ',' + houseInfo.Longitude;
		mapsLink.appendChild(linkText);
		mapsLink.href = linkAddress;
		return mapsLink;
	}

	function buildAllMark (school) {
	  var i;
	  var houseInfo;
	  var housePos;
	  var allButtons = document.getElementById("houseListUl").getElementsByTagName("li");
	  for(i = 0; i < school.houseInfoList.length; i++) {

	  	mapsLink = createMapsLink(school, i);
	    houseInfo = school.houseInfoList[i];
	    housePos = new google.maps.LatLng(houseInfo.Latitude, houseInfo.Longitude);
	    createMarker(i, school,housePos, houseInfo.Name, '<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info, school);  
	  	school.isMarkShown[i] = true;
	  	school.isInfoWindowShown[i] = false;
	  	showAllMark(school);
	  }
	}

	function hideAllMark (school) {
		var i;
		var allButtons = document.getElementById("houseListUl").getElementsByTagName("li");
		var tipWindow = document.getElementById("tipwindow");
		for(i = 0; i < school.markers.length; i++) {
			school.windows[i].close();
			school.markers[i].setMap(null);
			school.isMarkShown[i] = false;
			school.isInfoWindowShown[i] = false;
			allButtons[i].classList.remove("active");
		}
		school.allMarkHidden = true;
		school.allMarkShown = false;
		tipWindow.innerHTML = 'Click "show all" to show all markers';
	}

	function showAllMark (school) {
		var i;
		var tipWindow = document.getElementById("tipwindow");
		for(i = 0; i < school.markers.length; i++) {
			school.markers[i].setMap(school.map);
			school.isMarkShown[i] = true;
		}
		school.allMarkShown = true;
		school.allMarkHidden = false;
		tipWindow.innerHTML = 'Try satellite view!';
	}

	function listItemsListeners (school) {
		var i;
		var hideAllButton = document.getElementById('hideall');
		var showAllButton = document.getElementById('showall');
		hideAllButton.addEventListener('click', function() { 
			hideAllMark(school);
		});
		showAllButton.addEventListener('click', function() {
			showAllMark(school);
		});
		for(i = 0; i < school.markers.length; i++) {
			addTheListener(school, i);
		}
	}

	function addTheListener  (school, i) {
		listItems[i].addEventListener('click', function() { 
			clickList(school, i);
		}, {passive: true});
	}