const { model } = require('mongoose');

const urlSchema = {
    originalUrl : String,
    miniUrl : String
}

const Url = model('Url', urlSchema );

module.exports = Url;   