const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(

    {
        title : {

            type : String,
            required : true
        },

        duration : {

            type : Number
        },

        listenings : {
            type : Number
        },

        likes : {
            type : Number
        },

        featuring : {
            type : mongoose.Schema.Types.ObjectId
        }
    });

module.exports = mongoose.model('track', trackSchema, 'track');