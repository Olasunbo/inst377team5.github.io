let libaryURL = "https://data.princegeorgescountymd.gov/resource/7k64-tdwr.json?$$app_token=jEPGhTNlit9z8D7fmRGAzgP9b"; //json file where all the information is coming from
let libaryinfo = []; // list of details about the libary 
let temp = []; // might be needed
let mapData = [];
let settings = { method: "Get" };
let map;
//Get Libary coordinates and plop them on map
window.onload = async function getLibaryData(){
    console.log("I HAVE BEEN CALLED")
    await fetch(libaryURL, settings)
      .then(response => response.json())
      .then(data =>libaryinfo.push(...data));
    initMap(),
    console.log("My Function is here too")
    //console.log(data);
    //console.log(data); 
  };



function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: new google.maps.LatLng(38.859040, -76.898850),
      mapTypeId: "terrain",
    });
    droppoints();


    //
    // Create a <script> tag and set the USGS URL as the source   



    function droppoints(){
        for(let x = 0; x < libaryinfo.length; x++){
        console.log("I have been called too")
        // if you get time call them into a put request and make them into a table
        var branchname = libaryinfo[x]["branch_name"];
        var liblat = libaryinfo[x]["location_1"]["latitude"];
        var liblong = libaryinfo[x]["location_1"]["longitude"];
        //console.log(branchname, liblat, liblong);
        var directions = "http://maps.google.com/?q="+branchname;
        const latLng = new google.maps.LatLng(liblat, liblong);
        //const libnam = new google.maps.Title(branchname);
        const marker = new google.maps.Marker({
            position: latLng, 
            map: map,
            title: branchname,
            url: directions
        });
        const infoWindow = new google.maps.InfoWindow({
            content:branchname
        });
        marker.addListener('mouseover',function(){
            infoWindow.open(map, marker);
        });
        marker.addListener('mouseout', function(){
            infoWindow.close();
        });
        marker.addListener('click', function(){
            window.location.href = directions;
        });

    }
    };


};

