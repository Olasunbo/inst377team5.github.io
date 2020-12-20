/*
 ------ SUBMIT NEW TASK ------
*/
function submitReview() {
    console.log("Called submitReview");
  
    let inputParam = document.getElementById("givereview").value;
    let when = datetime('now');
    console.log("Input:" + inputParam);
    data = { 
      'content': inputParam, 
      'during': when,
    };
  
    console.log(JSON.stringify(data))
    let inputURL = "http://localhost:4000/inputs";
    const fetchPromise = fetch(inputURL, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, body: JSON.stringify(data)
    });
  
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((inputs) => {
        console.log("Here POST");
        console.log(inputs);
        let inputsID, inputscontent, inputswhen;
        let message = "ERROR: " + inputs.message;
        if (typeof inputs.id !== "undefined") {
        inputscontent = inputs.data.reviews;
        inputswhen = inputs.data.occur;
        inputsID = inputs.data.id;
          message = "Message: " + inputs.message + " ID: " + inputsID + "<br>Review: " + inputscontent + "<br> When: " + inputswhen;
        }
        document.getElementById("postReviewContent").innerHTML = message;
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("postReviewContent").innerHTML = "Invalid Review id: " + rewiewIdParam;
      });
  
  }
  
 
  
  /*
     ------------   Code for onload of page ------------
     1) Fills out drop down boxes
  */  
  
  let groupValues = []; //?? don't know where this is applied
  let settings = { method: "Get" };
  
  async function getPageData(prepend = "") {
    await fetch('./allReviews', settings)
      .then(res => res.json())
      .then((json) => {
        let listSize = json.data.length;
        json.data.forEach(element => {
          let liTag = document.createElement("li");   // Create a <p> element
          let groupName = prepend + "group"
          liTag.innerHTML = element.name;       // Insert text
          liTag.setAttribute("value", element.id);
          document.getElementById(groupName).appendChild(liTag);          // Append <p> to <body>
        });
      })
  };
  
  window.onload = async function loadPage() {
    getPageData();
    getPageData("update");
  
  
  }