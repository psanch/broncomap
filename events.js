
var listAttribute = document.createAttribute("class");
listAttribute.value = "list-group-item";

var htmlList = document.getElementById("houseListUl");

var houseListElements = [];

var listItemContent;

function makeHouseList(markers) {
  var i;
  for(i=0; i<houseInformation.Name.length; i++) {
    var listAttributeClone = listAttribute.cloneNode();
    houseListElements[i] = document.createElement("li");
    houseListElements[i].setAttributeNode(listAttributeClone);
    
    listItemContent = document.createTextNode(houseInformation.Name[i] + ':    ' + houseInformation.Info[i])
    
    houseListElements[i].appendChild(listItemContent);
    
    htmlList.appendChild(houseListElements[i]); 
  }
}

  function addMarkerEvent(markElement) {
    
  }