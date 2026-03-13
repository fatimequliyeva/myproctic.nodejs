const express = require('express')
const cors = require('cors')
const dns = require('dns')
const connectDB = require('./config')
const doctorRoute = require('./routes/doctorRoute')
const departmentRoute = require('./routes/departmentRoute')
const path = require('path')
const multer  = require('multer')
const { log } = require('console')


const app = express()
const PORT = process.env.PORT || 3000

// DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1'])

// Middlewares
app.use(cors())
app.use(express.json())
// app.use(express.static('uploads'))
app.use( express.static(path.join(__dirname, 'uploads')))



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname )
  }
})

const upload = multer({ storage: storage })
app.post('/api/imageUpload',upload.single('imageUrl'),(req,res,next)=>{
    try {
        console.log('file',req.file);
        
    } catch (error) {
        console.log(error.message);
        
    } 

})





// Routes
app.use('/api/doctors', doctorRoute)
app.use('/api/departments', departmentRoute)

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} link: http://localhost:${PORT}`)
    })
})