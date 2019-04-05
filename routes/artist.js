const express = require('express');

var router = express.Router();
var user = require('../controllers/artist.controller.js');

router.get('/', user.findAll);
router.get('/:id', user.findOne);

router.delete('/:id', user.delete);
router.post('/:id', user.update);

router.put('/', user.create);

module.exports = router;