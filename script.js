//API Pour carte de pollution de l'air
//création de la map leaflet
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


//permet d'activer la map (bouton)



//click menu 


////////////////////////////////////////////////////fonction pour changer de layer sur la map/////////////////////////////////////////////////////

/*
function layerchange(){
    //pollution de l'air
    if($('input[name=PollutionAir]').is(':checked') ){
    
    getAPIPollutionAir('https://api.waqi.info/map/bounds/?token=759f43417454ac9ceb83d8f0ff749abdf3a652e9&latlng=89.99994526655283,589.2187500000001,-89.9947414962234,-1431.5625', 'PollutionAir');
    
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
*/

///////////////////////////////////Initialisation des variables ////////////////////////////////////////

//pollutionmarine
var marker_pollutionMarine;
var markersClusterMarine;
var popup
//group de marker pour la polution marinne
var marker;
//pollution air
var markers_polutionAir = {};
//group de marker pour la polution de l'air
var markersClusterAirPolution;
//89.99994526655283 589.2187500000001 -89.9947414962234 -1431.5625 world bound

/////////////////////////////////// Fonctions //////////////////////////////////////////////////////////

map.on("moveend", function(){
});

function buttonPollutionAir(){
    if($('input[name=PollutionAir]').is(":checked") ){
        console.log("checked");
        getAPIPollutionAir();
    }
    else if ($('input[name=PollutionAir]').is(":not(:checked)") ){
        console.log("unchecked");
        map.removeLayer(markersClusterAirPolution);
    }
}

function getAPIPollutionAir(url = 'https://api.waqi.info/map/bounds/?token=759f43417454ac9ceb83d8f0ff749abdf3a652e9&latlng=89.99994526655283,589.2187500000001,-89.9947414962234,-1431.5625', keyName = 'PollutionAir') {

    const users_string = localStorage.getItem(keyName);
    if (users_string == null) {
        //console.log("rien n'est mémorisé");

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (my_json) {
            //console.log(my_json);

            const string = JSON.stringify(my_json);
            localStorage.setItem(keyName, string);
            //appeller fonction
            marker_polutionDeLair(my_json);
        });

    } else {
        //console.log("données déjà enregistrers");
        my_json = JSON.parse(users_string);
        //  console.log(my_json);

        //appeller fonction
        marker_polutionDeLair(my_json);
    }
}


//marqueur polution de l'air
function marker_polutionDeLair(data){ 
    markersClusterAirPolution = L.markerClusterGroup();

    var AirIcon = L.Icon.extend({
        options: {
            iconSize:     [50, 60],
            shadowSize:   [50, 64],
            iconAnchor:   [30, 65],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });
    /*
    var GairIcon = new AirIcon({iconUrl: 'image/green-mask.png'}),
        YairIcon = new AirIcon({iconUrl: 'image/yellow-mask.png'}),
        RairIcon = new AirIcon({iconUrl: 'image/red-mask.png'}),
        PairIcon = new AirIcon({iconUrl: 'image/purple-mask.png'});
        */

    //console.log("se lance");
    data.data.forEach(station => {
        var marker = markersClusterAirPolution.addLayer(L.marker([station.lat, station.lon]));
        markers_polutionAir[station.uid] = marker;
    });
    map.addLayer(markersClusterAirPolution);
}


//easystring pour stocker plus de valeur 
////////////////////////////////////////////Pollution Marine ////////////////////////////////////////////////////////////////////
function buttonPollutionMarine(){
    if($('input[name=PollutionPlastique]').is(":checked") ){
        console.log("checked");
        pollutionMarine();
    }
    else if ($('input[name=PollutionPlastique]').is(":not(:checked)") ){
        console.log("unchecked");
        map.removeLayer(marker);
    }
}

function pollutionMarine(){
    d3.csv('data/MLW_Data.csv').then( function(d) {
    //Tableau d'objet "data" 
    //création des icone de marqueur 
    markersCluster = L.markerClusterGroup();
    var MarineIcon = L.Icon.extend({
        options: {
            iconSize:     [65, 70],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });
    var greenIcon = new MarineIcon({iconUrl: 'image/green_marineflag.png'}),
        redIcon = new MarineIcon({iconUrl: 'image/red_marineflag.png'});
    //parcourt le tableau d'objet data
    //(d[0])
    d.forEach(function(data) {

        //Vérification de si la plage est propre ou non 
        if(data.EventType == "Cleanup"){
        //création de tout les marker en cluster avec longitude et latitude 
        marker = markersCluster.addLayer(L.marker([data.lat_y1, data.lon_x1], {icon: greenIcon}).bindPopup('<p>'+data.BeachName+'<br /> Netoyage fait le '+data.EventDate +'</p>').openPopup());
    
        }else if(data.EventType == "Monitoring"){
            marker = markersCluster.addLayer(L.marker([data.lat_y1, data.lon_x1], {icon: redIcon}).bindPopup('<p>'+data.BeachName+'<br /> Dernier nettoyage fait le'+data.EventDate+ '</p>').openPopup());
        } 
        //créationdu popup adresse 
        
        //ajout du cluster sur la map
        map.addLayer(marker);
        });
    });
}

/////////////////////////////////////////////////// Menu ////////////////////////////////////////////////////////

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

