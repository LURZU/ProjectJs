
//API Pour carte de pollution de l'air





  //permet d'activer la map (bouton)
  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);



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
