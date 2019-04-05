const Track = require('../models/track.model.js');

// Create and Save a new Track
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: 'title can not be empty'
        });
    }

    // Create a new User
    const track = new Track({

        title: req.body.title,
        duration: req.body.duration,
        listenings : req.body.listenings,
        likes : req.body.likes,
        featuring : req.body.featuring || ''
    });

    // Save User in the database
    track
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly user integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new user in database we send an
            // appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the track.'
            });
        });
};

// Retrieve and return all Users from the database.
/** @member {Object} */

exports.findAll = (req, res) => {
    Track.find()
        .then(tracks => {
            res.send(tracks);
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            })
        });
};

// Find a single User with a UserId
/** @member {Object} */

exports.findOne = (req, res) => {
    Track.findById(req.params.id)
        .then(track => {
            if (!track) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.id
                });
            }
            res.send(track);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.id
            });
        });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nom) {
        return res.status(400).send({
            message: 'first name can not be empty'
        });
    }

    // Find user and update it with the request body
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
                    message: 'User not found with id ' + req.params.id
                });
            }
            res.send(track);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.id
            });
        });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    Track.findByIdAndRemove(req.params.id)
        .then(track => {
            if (!track) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.id
                });
            }
            res.send({ message: 'User deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete user with id ' + req.params.id
            });
        });
};