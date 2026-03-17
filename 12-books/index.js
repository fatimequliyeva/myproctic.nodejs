const express = require('express');
const { connectDB } = require('./config');
const logger = require('./middlewares/logger');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoute')
const genreRoute = require('./routes/genreRoute');
const bookRoute = require('./routes/bookRoute');
const uploadRoute = require('./routes/uploadRoute');

const cors = require('cors');

const app = express();   // <-- Əvvəlcə app yaradılır
const port = 8080;

// Middlewares
app.use(cors());         // bütün origin-lərə icazə verir
app.use(express.json());
app.use(logger);

// Route-lar

app.use('/api/books', bookRoute) // book route
app.use('/api/genres', genreRoute) // genre route
app.use('/api/users', userRoute) // user route
app.use('/api/auth', authRoute) // auth route
// uploads qovluğunu statik açırıq
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Server işləyir!');
});

// DB qoşulma
connectDB();

// Serveri işə sal
app.listen(port, () => {
  console.log(`Server http://localhost:${port} ünvanında işləyir`);
});
