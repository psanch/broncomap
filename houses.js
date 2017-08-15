var partyMap = {
		
	SCU: {

//House data

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

//SCU specific variables

		center: {lat: 37.3477714, lng: -121.9416224},
		zoom: 15,
		markers: [],

//Creates ul in html with house info

		makeHouseList: function() {
		var i;
		//text of list item
		var listItemContent;
		//array of list items
		var houseListElements = [];
		//html container div for list items
		var htmlList = document.getElementById("houseListUl");
		//gives list items the desired attrbutes
		var listAttribute = document.createAttribute("class");
		listAttribute.value = "list-group-item";
		//creates list items, adds attributes, and appends to htmlList for each entry
			for(i=0; i<this.houseInfoList.length; i++) {
			  	
				var houseInfo = this.houseInfoList[i]

				var listAttributeClone = listAttribute.cloneNode();
				houseListElements[i] = document.createElement("li");
				houseListElements[i].setAttributeNode(listAttributeClone);

				listItemContent = document.createTextNode(houseInfo.Name + ':    ' + houseInfo.Info)

				houseListElements[i].appendChild(listItemContent);

				htmlList.appendChild(houseListElements[i]);
			}
		},

//Initializes map with given parameters and calls createMarker() for each house

		initMap: function() {
  		
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
				createMarker(i,housePos, houseInfo.Name, '<b>' + houseInfo.Name + '</b>' + '</br>' + houseInfo.Address + '</br>' + houseInfo.Info);  
				console.log(partyMap.SCU.markers[i]);
			};

//creates a marker for the house at the passed location and creates info window that is shown on click

			function createMarker(i,latlon,title,iwContent) {
			  	var marker = new google.maps.Marker({
					position: latlon,
					title: title,
					label: title[0],
					map: map
				});

				partyMap.SCU.markers.push(marker);
  				
  				var htmlListElements = document.getElementsByClassName("list-group-item");

				google.maps.event.addListener(marker, 'click', function () {
					infowindow.setContent(iwContent);
					infowindow.open(map, marker);
			  	});
	    	}
		}//initMap
	},//SCU

	

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

		makeHouseList: function() {
		  var i;
		  var listItemContent;
		  var houseListElements = [];
		  var htmlList = document.getElementById("houseListUl");
		  var listAttribute = document.createAttribute("class");
		  listAttribute.value = "list-group-item";

		  for(i=0; i<this.houseInfoList.length; i++) {
		  	var houseInfo = this.houseInfoList[i]
		    var listAttributeClone = listAttribute.cloneNode();
		    houseListElements[i] = document.createElement("li");
		    houseListElements[i].setAttributeNode(listAttributeClone);
		    
		    listItemContent = document.createTextNode(houseInfo.Name + ':    ' + houseInfo.Info)
		    
		    houseListElements[i].appendChild(listItemContent);
		    
		    htmlList.appendChild(houseListElements[i]); 
		  }
		},
		
		initMap: function() {
  
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
		}//initMap
	}//SJSU
};






