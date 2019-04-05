const Track = require('../models/track.model.js');

// Create and Save a new Track
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: 'title can not be empty'
        });
    }

    // Create a new Track
    const track = new Track({

        title: req.body.title,
        duration: req.body.duration,
        listenings : req.body.listenings,
        likes : req.body.likes,
        featuring : req.body.featuring || ''
    });

    // Save Track in the database
    track
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly Track integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new Track in database we send an
            // appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the track.'
            });
        });
};

// Retrieve and return all Tracks from the database.
/** @member {Object} */

exports.findAll = (req, res) => {
    Track.find()
        .then(tracks => {
            res.send(tracks);
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Tracks.'
            })
        });
};

// Find a single Track with a id
/** @member {Object} */

exports.findOne = (req, res) => {
    Track.findById(req.params.id)
        .then(track => {
            if (!track) {
                return res.status(404).send({
                    message: 'Track not found with id ' + req.params.id
                });
            }
            res.send(track);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Track not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving Track with id ' + req.params.id
            });
        });
};

// Update a Track identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nom) {
        return res.status(400).send({
            message: 'Track name can not be empty'
        });
    }

    // Find Track and update it with the request body
    Track.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            duration: req.body.duration,
            listenings : req.body.listenings,
            likes : req.body.likes,
            featuring : req.body.featuring || ''
        },
        { new: true }
    )
        .then(track => {
            if (!track) {
                return res.status(404).send({
                    message: 'Track not found with id ' + req.params.id
                });
            }
            res.send(track);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Track not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.id
            });
        });
};

// Delete a Track with the specified id in the request
exports.delete = (req, res) => {
    Track.findByIdAndRemove(req.params.id)
        .then(track => {
            if (!track) {
                return res.status(404).send({
                    message: 'Track not found with id ' + req.params.id
                });
            }
            res.send({ message: 'Track deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Track not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete Track with id ' + req.params.id
            });
        });
};
