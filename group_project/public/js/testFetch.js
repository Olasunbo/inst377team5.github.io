/* 
* testFetch.js file that tests the fetch API function with PG country libraries JSON
*/

//PG country libraries JSON URL
testFetchUrl = ""

//array that will hold the JSON
testArray = [];
libraryAddressArray = [];

//fetches JSON then pushes into array
fetch(testFetchUrl)
.then(blob => blob,json())
.then(data => testArray.push(...data));

//testFetchFunction fetches JSON fromURL
function testFetchFunction()
{
    //tells user that libraries have been fetched
    document.getElementById("fetchLibraries").innerHTML = "All Libraries Received!";
    /*
    * loops throught JSON array and pushes each location and address
    * into library array
    */ 
   for(x in testArray)
   {
       libraryAddressArray.push(testArray[x]["location_1"]);
       //console.log(libraryAddressArray[x]["latitude"]);
       //console.log(libraryAddressArray[x]["longitude"]);
   }
   console.log(libraryAddressArray);
}

//getLibraryLatLong function retrives latitude and longitude coordinates of a library
function getLibraryLatLong()
{
    let libraryNumber = document.getElementById("get_library_lat_long").value;

    //shows user lat and long corrdinates
    document.getElementById("libraryLat").innerHTML = "Library Latitude = " + libraryAddressArray[libraryNumber]["latitude"];
    document.getElementById("libraryLong").innerHTML = "Library Langitude = " + libraryAddressArray[libraryNumber]["longitude"];
}