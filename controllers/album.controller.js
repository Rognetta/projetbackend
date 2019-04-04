const Album = require('../models/albums.model.js');

// Create and Save a new Album
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: 'title can not be empty'
        });
    }

    // Create a new User
    const album = new Album({

        title: req.body.title,
        date: req.body.date,
        genre : req.body.genre,
        cover_URL : req.body.cover_URL,
        tracks : req.body.tracks || ''
    });

    // Save User in the database
    album
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly user integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new user in database we send an
            // appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the album.'
            });
        });
};

// Retrieve and return all Users from the database.
/** @member {Object} */

exports.findAll = (req, res) => {
    Album.find()
        .then(users => {
            res.send(users);
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            });
        });
};

// Find a single User with a UserIdù
/** @member {Object} */

exports.findOne = (req, res) => {
    Album.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.firstName) {
        return res.status(400).send({
            message: 'first name can not be empty'
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(
        req.params.userId,
        {
            title: req.body.firstName,
            content: req.body.lastName || ''
        },
        { new: true }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.userId
            });
        });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            res.send({ message: 'User deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Could not delete user with id ' + req.params.userId
            });
        });
};