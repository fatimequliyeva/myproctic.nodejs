const express = require('express');
const multer = require('multer');
const bookController = require('../controllers/bookController');
const bookValidator = require('../middlewares/bookValidator');

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// CRUD əməliyyatları
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// burada upload.single birinci olmalıdır ki, req.body dolsun
router.post('/', upload.single('coverImageURL'), bookValidator, bookController.addNewBook);

router.put('/:id', upload.single('coverImageURL'), bookValidator, bookController.updateBookById);
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
