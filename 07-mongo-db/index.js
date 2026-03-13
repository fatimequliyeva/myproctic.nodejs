const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(express.json());
const USERNAME = 'fatimashg_db_user'
const PW = 'k7NB5zh6EqEpy6iZ'
const DB_URL = "mongodb+srv://fatimashg_db_user:k7NB5zh6EqEpy6iZ@cluster0.whz60re.mongodb.net/BooksProject?appName=Cluster0"

const BookSchema = new Schema({
    title: String,
    price: Number,
    author: String,
    description: String,
    stock: Number

})

const BookModel = mongoose.model('Book', BookSchema)
const bookValidator=(req,res,next)=>{
    const { title, price, author, description, stock } = req.body
        if (!title || !price || !author || !description || !stock) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            })
        }
 next()
}
//getdata all

app.get('/api/books', async (req, res) => {
    try {
        const books = await BookModel.find({})
        res.status(200).json({
            message: "success",
            data: books
        }

        )

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })

    }

})

//getdata by id
app.get('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookModel.findById(id)
        if (!book) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            })
        }

        res.status(200).json({
            message: "success",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
})
// app.get('/api/books/:id', async (req, res) => { try { const { id } = req.params const book = await BookModel.findById(id) req.status(200).json({ message: "success", data: book }) } catch (error) { res.status(500).json({ message: error.message, success: false }) } })



//delete data by import {  } from '
app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookModel.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found',
                success: false
            })
        }

        res.status(200).json({
            message: "book deleted",
            data: deletedBook

        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })

    }
})
app.post('/api/books', bookValidator, async (req, res) => {
    try {
        
        const newBook = new BookModel({
            ...req.body
        })
        await newBook.save()

        res.status(200).json({
            message: 'Book created succesfully ',
            data: newBook
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })

    }
})

app.put('/api/books/:id', bookValidator, async (req, res) => {
    try {
        const { id } = req.params
        const updatedBook = await BookModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        if (!updatedBook) {
            return res.status(404).json({
                message: 'book note found',
                success: false
            })
        }


        res.status(200).json({
            message: 'Book sucessfulyy',
            data:updatedBook

        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
})






















mongoose.connect(DB_URL)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}, link:http://localhost:3000/`)
})
