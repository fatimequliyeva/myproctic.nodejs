const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie.controller');
const movieValidator = require('../middlewares/movie.validator');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieValidator, movieController.createMovie);
router.put('/:id', movieValidator, movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;