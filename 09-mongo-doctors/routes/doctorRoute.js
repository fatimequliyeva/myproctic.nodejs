const express = require('express')
const router = express.Router()

const {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    updateDoctorPhoto
} = require('../controllers/doctorController')
const doctorController = require("../controllers/doctorController")
const { validateDoctor } = require('../middleware/doctorValidator')
const multer = require('multer')

// Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: multer.memoryStorage() })


router.get('/', getAllDoctors)
router.get('/:id', getDoctorById)

router.post("/", upload.array("images", 5), doctorController.createDoctor)
router.put('/:id', validateDoctor, updateDoctor)

router.delete('/:id', deleteDoctor)

// şəkil upload

router.post("/", upload.array("images", 5), createDoctor)

module.exports = router