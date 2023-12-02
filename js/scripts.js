

var date = getTodaysDate();
var apiLink = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + date + "&end_date=" + date + "&api_key=16ZWg9vNoKBD0Ims63QJ3mftRzhVlu7Hzxtl7bee";

init();

async function init(){
    document.getElementById("current-date").appendChild(document.createTextNode(date));
    getNeoAPI(apiLink);
}

function getNeoAPI(apiLink){
    return fetch(apiLink)
    .then(response => {
      return response.json()
    }).then(data => {
        const links = data.links;
        const neos = data.near_earth_objects;
        createNeosElements(neos);
        linkButtons(links);

    });
}



function createNeosElements(neos){
    var astList = document.getElementById("asteroid-list");

    var asts = neos[date];

    console.log(asts);
    for(var i = 0; i < asts.length; i++){
        
        var ast = asts[i];
        var div = document.createElement('div');
        div.classList.add("asteroid-info")

        var astName = document.createElement('h2');
        var astSize = document.createElement('p');
        var astHazard = document.createElement('p');
        astName.appendChild(document.createTextNode("Asteroid Name: " + ast.name));
        astSize.appendChild(document.createTextNode("Estimated Size: " + 
                ast.estimated_diameter.meters.estimated_diameter_min.toFixed(2) + " - "+ 
                ast.estimated_diameter.meters.estimated_diameter_max.toFixed(2) + " meters"));
        astHazard.appendChild(document.createTextNode("Potentially Hazardous: " +ast.is_potentially_hazardous_asteroid));

        
        if(ast.is_potentially_hazardous_asteroid){
            div.style.backgroundColor = "#FF7276";
        }
        div.appendChild(astName);
        div.appendChild(astSize);
        div.appendChild(astHazard);
        astList.appendChild(div);

        
    };

}

function linkButtons(links){
        var nextLink = links.next;
        var previousLink = links.prev;
        var nextButton = document.getElementById('next-button');
        var previousButton = document.getElementById('previous-button');

        wireButton(nextButton, nextLink);
        wireButton(previousButton, previousLink);      
}

function wireButton(button, link){
        console.log(link);
        
        button.onclick = function(){
            var list = document.getElementById('asteroid-list')
            list.innerHTML = "";
            var loadingRing = addLoadingRing(list);
            date = getDateFromLink(link);
            getNeoAPI(link).then(e => {
                loadingRing.remove();
            });
            setDate();
            
        };
}

function addLoadingRing(list){
    var div = document.createElement('div');
    div.classList.add("lds-dual-ring")
    list.appendChild(div);
    return div;

}

// ******* UTILITY **************
function setDate(){
    document.getElementById("current-date").textContent = date;
}

function getDateFromLink(link){
    var splitLink = link.split('=');
    return splitLink[1].substring(0,10);

}

function getTodaysDate(){
    var date = new Date().toISOString().substring(0,10);

    return date;
}