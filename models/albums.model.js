const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(

    {
        title : {

            type : String,
            required : true
        },

        date : {

            type : Date
        },

        genre : {
            type : String
        },

        cover_URL : {
            type : String
        },

        tracks : {
            type : mongoose.Schema.Types.ObjectId
        }
    });

module.exports = mongoose.model('Album', albumSchema);