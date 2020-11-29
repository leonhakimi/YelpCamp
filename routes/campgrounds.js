const express = require('express');
const router = express.Router();
const camprgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware')
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})

router.route('/')
    .get(catchAsync(camprgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(camprgrounds.createCampground))

router.get('/new', isLoggedIn, camprgrounds.renderNew)

router.route('/:id')
    .get(catchAsync(camprgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(camprgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(camprgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(camprgrounds.renderEditForm))



module.exports = router;