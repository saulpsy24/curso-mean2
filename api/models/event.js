'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = Schema({
    title: String,
    description: String,
    brand: String,
   
    space:{
        type: Schema.ObjectId,ref:'Space'
    },
    image:String
        
});

module.exports = mongoose.model('Event', eventSchema);