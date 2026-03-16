// routes/userRoute.js
const express = require('express');
const router = express.Router();

// test route
router.get('/', (req, res) => {
  res.send('User route işləyir!');
});

module.exports = router;