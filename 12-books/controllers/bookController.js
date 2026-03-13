const BookModel = require('../models/bookModel');
const { cloudinary } = require('../config');

const bookController = {
  // 1. Bütün kitabları gətirmək
  getAllBooks: async (req, res) => {
    try {
      const books = await BookModel.find({}).populate('genre', 'name');
      res.status(200).json({ message: 'Success', data: books });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },

  // 2. ID ilə kitabı gətirmək
  getBookById: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await BookModel.findById(id).populate('genre', 'name');
      if (!book) {
        return res.status(404).json({ message: 'Book not found', success: false });
      }
      res.status(200).json({ message: 'Success', data: book });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },

  // 3. Yeni kitab əlavə etmək (Cloudinary ilə şəkil upload)
  addNewBook: async (req, res) => {
    try {
      let imageUrl = null;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "books"
        });
        imageUrl = result.secure_url;
      }

      const newBook = new BookModel({
        ...req.body,
        coverImageURL: imageUrl
      });

      await newBook.save();
      res.status(201).json({ message: 'Book created successfully', data: newBook });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },

  // 4. Kitabı yeniləmək (Cloudinary ilə şəkil update)
  updateBookById: async (req, res) => {
    try {
      const { id } = req.params;
      let updateData = { ...req.body };

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "books"
        });
        updateData.coverImageURL = result.secure_url;
      }

      const updatedBook = await BookModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found', success: false });
      }
      res.status(200).json({ message: 'Book updated successfully', data: updatedBook });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },

  // 5. Kitabı silmək (Cloudinary şəkil silmə ilə)
  deleteBookById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await BookModel.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found or already deleted', success: false });
      }

      // Əgər kitabda şəkil varsa, Cloudinary-dən silirik
      if (deletedBook.coverImageURL) {
        const publicId = deletedBook.coverImageURL.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`books/${publicId}`);
      }

      res.status(200).json({ message: 'Book deleted successfully', data: deletedBook });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }
};

module.exports = bookController;
