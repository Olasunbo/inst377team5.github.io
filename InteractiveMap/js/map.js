function initMap(){
    let location = {lat: 38.859040, lng: -76.898850};
   ;
    
    //new map
    let map = new google.maps.Map(document.getElementById("map"),{
        //map options
        zoom: 10,
        center: location
    });

    addMarker({
        coords:{lat: 38.859040, lng: -76.898850},
        content:'<h2>Hillcrest Heights Branch Libray</h2><h3>2398 Iverson St, Hillcrest Heights, MD 20748</h3>'
    });
   
    addMarker({
        coords:{lat: 38.837926994749715, lng: -76.75424599096701},
        content:'<h2>County Correctional Center Library</h2><h3>13400 Dille Dr, Upper Marlboro, MD 20772</h3>'
    });
    addMarker({
        coords:{lat: 38.92137815873382, lng: -76.74166273844901},
        content:'<h2>South Bowie Branch Library</h2><h3>15301 Hall Rd, Bowie, MD 20721</h3>'
    });
    addMarker({
        coords:{lat: 38.84537834168984, lng: -76.95606871434686},
        content:'<h2>Oxon Hill Branch Library</h2><h3> 6200 Oxon Hill Rd, Oxon Hill, MD 20745</h3>'
    }); //Hillcrest Heights Branch Libray
    
    
    // Add Marker Function
    function addMarker(props){
        let marker = new google.maps.Marker({
        position: props.coords, 
        map: map
    });
    //Check for customization
    if(props.iconImage){
        //set icon image
        marker.setIcon(props.iconImage);
    }
    //Check Content
    if(props.content){
        let infoWindow = new google.maps.InfoWindow({
            content:props.content
        });
        marker.addListener('click',function(){
            infoWindow.open(map, marker);
        });
    }


}
}