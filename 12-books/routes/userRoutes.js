const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { authenticate, authorize } = require('../middlewares/authMiddleware');

// 🔐 yalnız admin bütün userləri görə bilər
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);

// 🔐 login olan user görə bilər (istəsən sonradan limit qoyarıq)
router.get('/:id', authenticate, userController.getUserById);

// 🔐 yalnız admin user silə bilər
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUserById);

module.exports = router;