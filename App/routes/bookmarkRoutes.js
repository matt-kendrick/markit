const express = require('express');
const controller = require('../controllers/bookmarkController');

const router = express.Router();

router 
    .route('/:userCode/')
    .get(controller.getAll)
    .post(controller.create);

router
.route('/:userCode/category/')
.get(controller.getUserCategories);

router
.route('/:userCode/category/:categorySlug')
.get(controller.getByUserCategory);

router
    .route('/:userCode/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete);

module.exports = router;