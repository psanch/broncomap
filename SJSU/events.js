var listItems = document.getElementById("houseListUl").getElementsByTagName("li");
var lastWindowShown = partyMap.SJSU.windows[0];
var lastItemClicked = listItems[0];
var lastMarkerShown = partyMap.SJSU.markers[0];
listItemsListeners(partyMap.SJSU);