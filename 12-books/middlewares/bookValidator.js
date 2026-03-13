const bookValidator = (req, res, next) => {
  const body = req.body || {};
  const { title, description, price, author, stock, genre, language } = body;

  if (!title || !description || !price || !author || !stock || !genre || !language) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  next();
};

module.exports = bookValidator;
