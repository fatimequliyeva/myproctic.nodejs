const rateLimit = require('express-rate-limit');

const movieApiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 20, 
    message: {
        success: false,
        message: 'Çoxlu sorğu göndərilib. Biraz sonra yenidən cəhd edin.'
    }
});

module.exports = movieApiLimiter;