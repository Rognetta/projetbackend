const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(

    {
        nom : {

            type : String,
            required : true
        },

        birth : {

            type : Date
        },

        followers : {
            type : Number
        },

        albums : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        }
    });

module.exports = mongoose.model('artist', artistSchema, 'artist');