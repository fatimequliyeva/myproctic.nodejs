const BookModel = require('../models/bookModel');
const { cloudinary } = require('../config');

const bookController = {

  // 1️⃣ Bütün kitabları gətirmək
  getAllBooks: async (req, res) => {
    try {
      const books = await BookModel.find({}).populate('genre', 'name');
      res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.log("GET ALL BOOKS ERROR:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 2️⃣ ID ilə kitabı gətirmək
  getBookById: async (req, res) => {
    try {
      const { id } = req.params;

      const book = await BookModel.findById(id).populate('genre', 'name');

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found"
        });
      }

      res.status(200).json({ success: true, data: book });

    } catch (error) {
      console.log("GET BOOK BY ID ERROR:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 3️⃣ Yeni kitab əlavə etmək
  addNewBook: async (req, res) => {
    try {

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      let imageUrl = null;

      if (req.file) {

        // Windows path fix
        const filePath = req.file.path.replace(/\\/g, "/");

        const result = await cloudinary.uploader.upload(filePath, {
          folder: "books"
        });

        imageUrl = result.secure_url;
      }

      const newBook = new BookModel({
        ...req.body,
        coverImageURL: imageUrl
      });

      await newBook.save();

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook
      });

    } catch (error) {

      console.log("ADD BOOK ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 4️⃣ Kitabı update etmək
  updateBookById: async (req, res) => {
    try {

      const { id } = req.params;

      let updateData = { ...req.body };

      if (req.file) {

        const filePath = req.file.path.replace(/\\/g, "/");

        const result = await cloudinary.uploader.upload(filePath, {
          folder: "books"
        });

        updateData.coverImageURL = result.secure_url;
      }

      const updatedBook = await BookModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
      });

    } catch (error) {

      console.log("UPDATE BOOK ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 5️⃣ Kitabı silmək
  deleteBookById: async (req, res) => {
    try {

      const { id } = req.params;

      const deletedBook = await BookModel.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found"
        });
      }

      // Cloudinary şəkil silmək
      if (deletedBook.coverImageURL) {

        const publicId = deletedBook.coverImageURL
          .split('/')
          .pop()
          .split('.')[0];

        await cloudinary.uploader.destroy(`books/${publicId}`);
      }

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook
      });

    } catch (error) {

      console.log("DELETE BOOK ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

};

module.exports = bookController;