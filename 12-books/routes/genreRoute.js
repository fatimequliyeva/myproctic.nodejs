const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.get('/', genreController.getAllGenres);
router.get('/:id', genreController.getGenreById);
router.post('/', genreController.addNewGenre);   // <-- vacib
router.put('/:id', genreController.updateGenreById);
router.delete('/:id', genreController.deleteGenreById);

module.exports = router;
