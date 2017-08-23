var listItems = document.getElementById("houseListUl").getElementsByTagName("li");
var allMarkShown = true;
console.log(listItems);
listItems[0].addEventListener('click', function() { 
  allMarkShown = partyMap.toggleAllMark(partyMap.SCU, allMarkShown);
  console.log(allMarkShown);
});

partyMap.listItemsListeners(partyMap.SCU);