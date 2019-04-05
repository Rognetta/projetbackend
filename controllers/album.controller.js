const Album = require('../models/albums.model.js');

// Create and Save a new Album
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: 'title can not be empty'
        });
    }

    // Create a new Album
    const album = new Album({

        title: req.body.title,
        date: req.body.release,
        genre : req.body.genre,
        cover_URL : req.body.cover_URL,
        tracks : req.body.tracks || ''
    });

    // Save Album in the database
    album
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly Album integrated
            res.send(data);
        })
        .catch(err => {
            /* In case of error during insertion of a new Album in database we send an appropriate message*/
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the album.'
            });
        });
};

// Retrieve and return all Albums from the database.
/** @member {Object} */

exports.findAll = (req, res) => {
    Album.find()
        .then(albums => {
            res.send(albums);
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Albums.'
            })
        });
};

// Find a single Album with a id
/** @member {Object} */

exports.findOne = (req, res) => {
    Album.findById(req.params.id)
        .then(album => {
            if (!album) {
                return res.status(404).send({
                    message: 'Album not found with id ' + req.params.id
                });
            }
            res.send(album);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Album not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.id
            });
        });
};

// Update a Album identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        return res.status(400).send({
            message: 'album title can not be empty'
        });
    }

    // Find Album and update it with the request body
    Album.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            date: req.body.release,
            genre : req.body.genre,
            cover_URL : req.body.cover_URL,
            tracks : req.body.tracks || ''
        },
        { new: true }
    )
        .then(album => {
            if (!album) {
                return res.status(404).send({
                    message: 'Album not found with id ' + req.params.id
                });
            }
            res.send(album);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Album not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error updating album with id ' + req.params.id
            });
        });
};

// Delete an Album with the specified id in the request
exports.delete = (req, res) => {
    Album.findByIdAndRemove(req.params.id)
        .then(album => {
            if (!album) {
                return res.status(404).send({
                    message: 'Album not found with id ' + req.params.id
                });
            }
            res.send({ message: 'Album deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Album not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete album with id ' + req.params.id
            });
        });
};