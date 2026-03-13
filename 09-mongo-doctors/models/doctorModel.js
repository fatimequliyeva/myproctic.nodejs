const mongoose = require('mongoose')
const { Schema } = mongoose

const DoctorSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    age: Number,
    position: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
    photo: {
        type: String, // şəkilin URL-i
        default: null,
    }
}, { timestamps: true , versionKey: false })

const DoctorModel = mongoose.model('Doctor', DoctorSchema)

module.exports = DoctorModel
