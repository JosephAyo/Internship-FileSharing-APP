var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url,(err,db)=>{
        Profile.find({}).select('fileName')
        .then(function(result) {
            res.json({
            confirmation: 'success',
            data: result
            });
        })
        .catch(function(err){
            res.json({
            confirmation: 'failed',
            message: (`this error occurred: ${err.message}`)
            });
        });
        db.close();
    });
});

const Profile =require('../models/Profile');

const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/fileshare';


module.exports = router;
