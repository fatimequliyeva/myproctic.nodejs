const Movie = require('../models/movie.model');

// GET ALL
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET BY ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// CREATE
exports.createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();

        res.status(201).json({
            success: true,
            message: 'Movie created successfully',
            data: newMovie
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE
exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Movie updated successfully',
            data: updatedMovie
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE
exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Movie deleted successfully',
            data: deletedMovie
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};