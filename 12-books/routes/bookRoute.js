const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');
const path = require('path');

// Multer storage (müvəqqəti serverdə saxlayır)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/add', upload.single('coverImage'), bookController.addNewBook);
router.put('/:id', upload.single('coverImage'), bookController.updateBookById);
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
