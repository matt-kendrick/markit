const express = require('express');
const controller = require('../controllers/bookmarkController');

const router = express.Router();

router 
    .route('/')
    .get(controller.getAll)
    .post(controller.create);

router
    .route('/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete)
    ;

module.exports = router;