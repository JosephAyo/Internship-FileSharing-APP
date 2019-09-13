const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fileshare', {useNewUrlParser: true});
//create new Schema named Profile
const Profile = new mongoose.Schema({
    fileName: {
        type: String,
        default: '',
        trim: true
    }
},{collection:'data'});

module.exports = mongoose.model('Profile', Profile);