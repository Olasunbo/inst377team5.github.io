let express = require('express')
let inputRouter = express.Router()
let db = require('../database');

//GET all reviews
inputRouter.get('/allReviews', (req, res) => {
    
    console.log("Get all reviews");
    let sql = "select * from input";
    db.all(sql,  (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.end(JSON.stringify(row));
      });
})


// Create a new review
// POST localhost:<port>/task
inputRouter.post('/inputs', async (req, res) => {
    // now we have access to req.body due to body-parser (see index.js)
    if (!req.body) {
        return resizeBy.status(400).send('Request body is missing')
    }

    let inputs = {
        inputParam: req.body.inputParam,
       // occur: req.body.during,  Example 2020-11-24
    }
    console.log("req.body.inputParam: " + req.body.inputParam)
    let params =[inputs.inputParam]
    var sql ='INSERT INTO input (review) VALUES (?)'
    
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": inputs,
            "id" : this.lastID
        })
    });
    
})




//Export the router
module.exports = inputRouter

