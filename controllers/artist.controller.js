const Artist = require('../models/artist.model.js');

// Create and Save a new Artist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        return res.status(400).send({
            message: 'Name can not be empty'
        });
    }

    // Create a new Artist
    const artist = new Artist({

        nom: req.body.nom,
        birth: req.body.birth,
        followers : req.body.followers,
        albums : req.body.albums || ''
    });

    // Save Artist in the database
    artist
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly artist integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new artist in database we send an appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the artist.'
            });
        });
};

// Retrieve and return all Artists from the database.
/** @member {Object} */

exports.findAll = (req, res) => {
    Artist.find()
        .then(artists => {
            res.send(artists);
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving artists.'
            })
        });
};

// Find a single Artist with a id
/** @member {Object} */

exports.findOne = (req, res) => {
    Artist.findById(req.params.id)
        .then(artist => {
            if (!artist) {
                return res.status(404).send({
                    message: 'Artist not found with id ' + req.params.id
                });
            }
            res.send(artist);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Artist not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving artist with id ' + req.params.id
            });
        });
};

// Update a Artist identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nom) {
        return res.status(400).send({
            message: 'first name can not be empty'
        });
    }

    // Find artist and update it with the request body
    Artist.findByIdAndUpdate(
        req.params.id,
        {
            nom: req.body.nom,
            birth: req.body.birth,
            followers : req.body.followers,
            albums : req.body.albums || ''
        },
        { new: true }
    )
        .then(artist => {
            if (!artist) {
                return res.status(404).send({
                    message: 'Artist not found with id ' + req.params.id
                });
            }
            res.send(artist);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Artist not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error updating artist with id ' + req.params.id
            });
        });
};

// Delete an Artist with the specified id in the request
exports.delete = (req, res) => {
    Artist.findByIdAndRemove(req.params.id)
        .then(artist => {
            if (!artist) {
                return res.status(404).send({
                    message: 'Artist not found with id ' + req.params.id
                });
            }
            res.send({ message: 'Artist deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Artist not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete artist with id ' + req.params.id
            });
        });
};