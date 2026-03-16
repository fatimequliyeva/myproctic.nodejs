const express = require('express')
const cors = require('cors')
const dns = require('dns')
const path = require('path')
const multer = require('multer')

const connectDB = require('./config')
const doctorRoute = require('./routes/doctorRoute')
const departmentRoute = require('./routes/departmentRoute')

const app = express()
const PORT = process.env.PORT || 3000

// DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1'])

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static uploads
app.use(express.static(path.join(__dirname, 'uploads')))

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

// image upload route
app.post('/api/imageUpload', upload.single('imageUrl'), (req, res) => {
  try {

    console.log('file:', req.file)

    res.status(200).json({
      success: true,
      file: req.file
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// Routes
app.use('/api/doctors', doctorRoute)
app.use('/api/departments', departmentRoute)

// Connect DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} link: http://localhost:${PORT}`)
  })
})