const express=require('express') //server ucun framework
const{nanoid}=require('nanoid')//unikal id
const app=express() //serverin obyekdi
const port=3000 //portum
const cors = require('cors')



const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}

app.use(cors(corsOptions))
app.use(express.json()) //json formatinda olsun miidleware


const books=require('./data') //datadki kitablari caqrdm

app.get('/api/books',(req,res)=>{
    try {
        console.log('query',req.query);
        const {search= ''}=req.query;
        let filteredBooks=books.filter((book)=>book.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
|| book.author.toLocaleLowerCase().includes(search.toLocaleLowerCase())  )
        res.status(200).json({
            data:filteredBooks,
            message:'Kitablar ugurla getirildi',
            success:true,
            error:null
        })
        
    } catch (error) {
        res.status(500).json({
            data:null,
            message:'Xeta bash verdi',
            success:false,
            error:error.message
        })
    }
})

app.get('/api/books/:id',(req,res)=>{
    try {
        const{id}=req.params
        const book=books.find((book)=>book.id===id)
        if(!book){
            return res.status(404).json({
                data:null,
                message:'Kitab tapilmadi'
            })
        }
        res.status(200).json({
            data:book,
            message:'Kitab ugurla getirildi',
            success:true,
            error:null
        })
        
    } catch (error) {
        res.status(500).json({
            data:null,
            message:'Xeta bash verdi',
            success:false,
            error:error.message
        })
    }
})

app.delete('/api/books/:id',(req,res)=>{
    try {
        const{id}=req.params
        const idx=books.findIndex((book)=>book.id===id)
        if(idx=== -1){
            return res.status(404).json({message:"Kitab tapilmadi"})
        }
        const deleteBook=books.splice(idx,1)
        res.status(200).json({
            message:'Kitab ugurla silindi',
            data:deleteBook[0],
            updatedBooks:books
        })
        
    } catch (error) {
        res.status(500).json({
            data:null,
            message:'Xeta bash verdi',
            error:error.message
        })
    }
})
app.post('/api/books', (req, res) => {
  try {
    const { title, author, price, description, stock, genre, language, coverImageURL } = req.body

    if (!title || !author || !price || !description || !stock || !genre || !language || !coverImageURL) {
      return res.status(400).json({ message: 'Butun tələb olunan sahələr doldurulmalıdır' })
    }

    const newBook = { id: nanoid(8), ...req.body }
    const updatedBooks = [...books, newBook]

    res.status(201).json({
      message: 'Kitab ugurla yaradildi',
      book: newBook,
      updatedBooks: updatedBooks
    })
  } catch (error) {
    res.status(500).json({ message: 'Xeta bash verdi', error: error.message })
  }
})


app.put('/api/books/:id',(req,res)=>{
    try{
        const{id}=req.params
        const{title,author,price,description,stock,genre,language,coverImageURL}=req.body
        const idx=books.findIndex((book)=>book.id===id)
        if(idx===-1){
            return res.status(404).json({message:"Kitab tapilmadi"})
        }
        books[idx]={...books[idx],...req.body}
        res.status(200).json({
            message:'Kitab ugurla yenilendi',
            book:books[idx],
            updatedBooks:books
        })
    } catch (error) {
        res.status(500).json({
            message:'Xeta bash verdi',
            error:error.message
        })
    }
})

app.patch('/api/books/:id', (req, res) => {
  try {
    const { id } = req.params
    const idx = books.findIndex((book) => book.id === id)

    if (idx === -1) return res.status(404).json({ message: 'Kitab tapilmadi' })

    const updatedBook = { id, ...req.body }

    
    if (!req.body.title) updatedBook.title = books[idx].title
    if (!req.body.author) updatedBook.author = books[idx].author


    books[idx] = updatedBook

    res.status(200).json({
      message: 'Kitab ugurla yenilendi',
      book: books[idx],
      updatedBooks: books
    })
  } catch (error) {
    res.status(500).json({ message: 'Xeta bash verdi', error: error.message })
  }
})


app.listen(port, () => {
  console.log(`server ayaqdadi isleyir ${port}, url: http://localhost:${port}`);
})
