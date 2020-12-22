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
   }
}