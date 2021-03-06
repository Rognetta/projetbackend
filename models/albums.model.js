const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(

    {
        title : {

            type : String,
            required : true
        },

        release : {

            type : Date
        },

        genre : {
            type : String
        },

        cover_URL : {
            type : String
        },

        tracks : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        }
    });

module.exports = mongoose.model('album', albumSchema, 'album');