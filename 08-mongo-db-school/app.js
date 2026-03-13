const express = require('express');
const movieRoutes = require('./routes/movie.routes');
const movieApiLimiter = require('./middlewares/rateLimit');

const app = express();

app.use(express.json());

// yalnız /api route-lar limitlənir
app.use('/api', movieApiLimiter);

app.use('/api/movies', movieRoutes);

module.exports = app;