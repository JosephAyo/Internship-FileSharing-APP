var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var app = express();
const uploadsFolder = 'C:/Users/JOSEPH AYO/Documents/uploads';
const fs = require('fs');
const ip = require('ip');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split('.')[0] + '.' + file.originalname.split('.')[1]);
    }
});

var upload = multer({
    storage: storage
});

var indexRouter = require('./routes/index');

var url = 'mongodb://localhost/fileshare';
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url,(err,db)=>{
	console.log('Database connected successfully');
	db.close();
});

const api = require('./routes/api');
const dbUpload = require('./routes/up');

// set routes
app.use('/api',api);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.post('/', upload.single('avatar'), (req, res, next) => {

    console.log(`uploaded file:${req.file.filename} size: ${req.file.size} bytes`);
    dbUpload(req.file.filename);
    fs.readdir(uploadsFolder, (err, files) => {
        files.forEach(file => {
        console.log(file);
        });
    });
    res.redirect('/');
});


app.post('/files', function (req, res) {
    var name=req.body.fileToDownload;
    res.download( uploadsFolder+'/' + name);
});

const port = process.env.PORT || 8000;

app.listen(port,ip.address(), () => {
    console.log(`app is listening on port ${port}`);
});

module.exports = app;