/*
 ------ SUBMIT NEW REVIEW ------
*/
function submitReview() {

  console.log("Called submitReview");
  let inputParam = document.getElementById("givereview").value;
    
  console.log("Input:" + inputParam);
  data = { 'inputParam': inputParam };
  
  //console.log(JSON.stringify(data))
  let inputURL = "http://localhost:4000/inputs";
  const fetchPromise = fetch(inputURL, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data)
  }); 

  let inputsID;
  
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((inputs) => {
      console.log("Here POST inputs");
      console.log(inputs);
      let message = "ERROR";
      
    if (typeof inputs.id !== "undefined") {
      inputscontent = inputs.data.inputParam;
      inputsID = inputs.id;
      message = "Message: " + inputs.message + " ID: " + inputsID + "<br>Review: " + inputscontent; /*+ "<br> When: " + inputswhen;*/
    }
    else if(typeof inputs !== "undefined"){
      message = "Message: " + inputs.message ;
    }
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("postReviewContent").innerHTML = "Invalid Review id: " + data.inputParam;
    });
    
  
  }

/* 

-------LOAD ALL PRIOR REVIEWS---------

*/
//get the SQLite table 
let searchURL = "http://localhost:4000/allReviews";
const feed = [];
const fetchPromise = fetch(searchURL);
fetchPromise
  .then(response => response.json())
  .then(data => feed.push(...data)) 

//create variable to add all contents to page
const critique = document.getElementById('record')

//display feed in a list form
function addLTag(content) {
  let lTag = document.createElement("li");   // Create a <li> element
  lTag.innerHTML = content;       // Insert text
  critique.appendChild(lTag);          // Append <li> to <body>
}

//get content 
function displayFeed(){
  console.log("Called Display Feed")
  return feed.map(comment =>{
    addLTag(
      `${comment.created}
      ${comment.review}`
    )
  }).join('');

}

//Reload page and feed will be there
window.onload = function(){
  displayFeed();
}

