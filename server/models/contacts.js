// Filename: contacts.js
//   Ibrahem Aqel Sit (# 301139448)
//   Creation date: 2021/09/29

let mongoose = require('mongoose');

// create a model class
let contactsModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contacts', contactsModel);