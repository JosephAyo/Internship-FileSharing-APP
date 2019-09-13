var express = require('express');

const Profile =require('../models/Profile');

const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/fileshare';

function dbUpload(filename){
    MongoClient.connect(url,(err,db)=>{
        //Find all documents in the customers collection:
        Profile.create({fileName: filename});
        db.close();
    });
}

module.exports = dbUpload;
