//API Pour carte de pollution de l'air

var OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var OSM_ATTRIB = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>contributors';
var osmLayer= L.tileLayer(OSM_URL,{attribution: OSM_ATTRIB}); 
var WAQI_URL = "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_";
var WAQI_ATTR = 'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>';
var waqiLayer = L.tileLayer(WAQI_URL, {attribution: WAQI_ATTR}); 

//var scriptMap = document.getElementById("ScriptMap");
  var generatediv = d3.select("body").append("div").attr('id', 'map');
function activemap(){
  
    if (document.getElementById("EnableMap").checked == true){
            var map = L.map('map', {
    zoomControl: false}).setView([51.505, -0.09], 11);
map.addLayer(osmLayer).addLayer(waqiLayer);
    }else{
        document.getElementById("map").remove();
        d3.select("body").prepend(generatediv)
    }
  
}
//canvas.JS
    window.onload = function () {
        var chart = new CanvasJS.Chart("chartContainer", {
            backgroundColor: ""
           });
        chart.options.axisY = { prefix: "$", suffix: "K" };
        chart.options.title = { text: "Taux de pollution par ville" };
        var series1 = { //dataSeries - first quarter
            type: "column",
            name: "Pollution",
            showInLegend: true
        };
        chart.options.data = [];
        chart.options.data.push(series1);
        series1.dataPoints = [
                { label: "Montpellier", y: 58 },
                { label: "Seattle", y: 69 },
                { label: "Pékin", y: 80 },
                { label: "tokyo", y: 74 },
                { label: "Berlin", y: 64 }
        ];
    
        
        chart.render();
    }
   
    chart.options.data.push(series1);
	chart.render();


//click menu 

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