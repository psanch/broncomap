var listItems = document.getElementById("houseListUl").getElementsByTagName("li");
var lastWindowShown = partyMap.SCU.windows[0];
var lastItemClicked = listItems[0];
var lastMarkerShown = partyMap.SCU.markers[0];
listItemsListeners(partyMap.SCU);