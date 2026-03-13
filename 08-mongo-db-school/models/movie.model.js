const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
{
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true, min: 1 },
    genre: { type: [String], required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    imdbRating: { type: Number, min: 0, max: 10, default: 0 },
    country: { type: String, required: true },
    posterUrl: { type: String, required: true },
    trailerUrl: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    boxOffice: { type: Number, default: 0 }
},
{ timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);