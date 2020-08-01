const express = require('express');
const controller = require('../controllers/bookmarkController');

const router = express.Router();

router 
    .route('/:userCode/')
    .get(controller.getAll)
    .post(controller.create);

router
.route('/:userCode/categories/')
.get(controller.getUserCategories);

router
    .route('/:userCode/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete);

module.exports = router;