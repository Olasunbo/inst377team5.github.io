let libaryURL = "https://data.princegeorgescountymd.gov/resource/7k64-tdwr.json?$$app_token=jEPGhTNlit9z8D7fmRGAzgP9b"; //json file where all the information is coming from
let libaryinfo = []; // list of details about the libary 
let temp = []; // might be needed
let mapData = [];
let settings = { method: "Get" };
let map;
//Get Libary data from json
window.onload = async function getLibaryData(){
    await fetch(libaryURL, settings)
      .then(response => response.json())
      .then(data =>libaryinfo.push(...data));
    initMap()
    //console.log(data);
    //console.log(data); 
  };


//Build map with google API
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: new google.maps.LatLng(38.859040, -76.898850),
      mapTypeId: "terrain",
    });
    droppoints();  


//Get libary coordinates and branch name to add to map
    function droppoints(){
        for(let x = 0; x < libaryinfo.length; x++){
        // if you get time call them into a put request and make them into a table
        var branchname = libaryinfo[x]["branch_name"];
        var liblat = libaryinfo[x]["location_1"]["latitude"];
        var liblong = libaryinfo[x]["location_1"]["longitude"];
        //console.log(branchname, liblat, liblong);
        var directions = "http://maps.google.com/?q="+branchname;
        const latLng = new google.maps.LatLng(liblat, liblong);
        //const libnam = new google.maps.Title(branchname);
        //Add libary info to map
        const marker = new google.maps.Marker({
            position: latLng, 
            map: map,
            title: branchname,
            url: directions
        });
        //Make a window with branch name
        const infoWindow = new google.maps.InfoWindow({
            content:branchname
        });
        //Window shows up when you hover near
        marker.addListener('mouseover',function(){
            infoWindow.open(map, marker);
        });
        //Then goes away when you hover away
        marker.addListener('mouseout', function(){
            infoWindow.close();
        });
        //Clicking marker will get you directions
        marker.addListener('click', function(){
            window.location.href = directions;
        });

    }
    };


};

