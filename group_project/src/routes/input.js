let express = require('express')
let router = express.Router()
let db = require('../database');

// Create a new review
// POST localhost:<port>/task
router.post('/inputs', (req, res) => {
    // now we have access to req.body due to body-parser (see index.js)
    if (!req.body) {
        return resizeBy.status(400).send('Request body is missing')
    }

    let inputs = {
        reviews: req.body.content,
        occur: req.body.during, // Example 2020-11-24
    }
    
    if(!inputs.reviews == null){
        res.json({
            "message": "error: Must input a review before submitting"
        })
        return;
    }
    var sql ='INSERT INTO input (review, created) VALUES (?,?)'
    var params =[inputs.reviews, inputs.occur]
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

//GET all reviews
router.get('/allReviews', (req, res) => {
    console.log("Get all inputs");
    let sql = "select review from inputs";
    db.all(sql,  (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        
        res.end(JSON.stringify(row));
        });
    })

//GET
router.get('/inputs', (req, res) => {
    if (!req.query.inputId) {
        return res.status(400).send('Missing URL parameter id')
    }
    let sql = "select input.id, review, created"+
      " where input.id = ?"
    console.log("req.query.inputId: " + req.query.inputId)
    let params = [req.query.inputId]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})


