
//API Pour carte de pollution de l'air





  var map = L.map('map').setView([51.505, -0.09], 3);
var test = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 10,
  minZoom : 1,
  zoomControl : false
}).addTo(map);
map.removeControl(map.zoomControl)





function activemap(){
    //selectionne et créer une div à remplacer avec la div map
    let RemoveMap = document.getElementById('map')
    let create = document.createElement("div");
    create.id = "map"
    $('#EnableMap').change(function() {
        if(this.checked){
        //Recréer la variable map pour l'appel de leaflet 
            map = L.map('map').setView([51.505, -0.09], 3);
            test = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 10,
            minZoom : 1,
            zoomControl : false
            }).addTo(map);
            map.removeControl(map.zoomControl)  
    } else  {
                RemoveMap.innerHTML =""
                // Supprime la div de la map 
                RemoveMap.replaceWith(create)
    }
});

}

////////////////////////////////////////////////////fonction pour changer de layer sur la map/////////////////////////////////////////////////////


function layerchange(){
 //pollution de l'air
 if($('input[name=PollutionAir]').is(':checked') ){
   
    getAPI('https://api.waqi.info/map/bounds/?token=759f43417454ac9ceb83d8f0ff749abdf3a652e9&latlng=89.99994526655283,589.2187500000001,-89.9947414962234,-1431.5625', 'PollutionAir');
   
} else {
    localStorage.removeItem('PollutionAir')
    map.removeLayer(markersClusterAirPolution);
}

//pollution plastique 
if( $('input[name=PollutionPlastique]').is(':checked') ){
    pollutionMarine();
    
} else {
    map.removeLayer(marker);
}
}









///////////////////////////////////Initialisation des variables ////////////////////////////////////////

//pollutionmarine
var marker_pollutionMarine;
var markersClusterMarine;
var popup;
var marker;
//pollution air
var markers_polutionAir = {};
//group de marker pour la polution de l'air
var markersClusterAirPolution = L.markerClusterGroup();
//boundarys of the map x1, y1, x2, y2
//var boundMap = [map.getBounds()._northEast.lat, map.getBounds()._northEast.lng, map.getBounds()._southWest.lat, map.getBounds()._southWest.lng];

//89.99994526655283 589.2187500000001 -89.9947414962234 -1431.5625 world bound

//Functions ////////////////////////////////////////////////////////

map.on("moveend", function(){
});



function getAPI() {
    const url = "https://api.waqi.info/feed/montpellier/?token=759f43417454ac9ceb83d8f0ff749abdf3a652e9";

    // soit les utilisateurs existent et sont stockés dans localStorage
    // si oui, on renvoie le JSON
    // si non, on sollicite l'API, on sauvegarde et on renvoit

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (my_json) {
            // console.log(my_json);
            console.log(my_json);
            console.log(my_json.data.city.geo);
            const string = JSON.stringify(my_json);
           
                var marker = L.marker(my_json.data.city.geo).addTo(map);
             
              
              
        });


      

        
}
getAPI();

//Interaction bouton menu
function changeClass() { 
    document.getElementById('menu').className = "menuoff"; 
    document.getElementById('menubars').className = "menubars"; 
}
function changeClassNew() { 
    document.getElementById('menu').className = "menu";
    document.getElementById('menubars').className = "menubarsoff";  
}


//Barre recherche 







//Histograme 

//filtre 
var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
var collapseList = collapseElementList.map(function (collapseEl) {
  return new bootstrap.Collapse(collapseEl)
})
