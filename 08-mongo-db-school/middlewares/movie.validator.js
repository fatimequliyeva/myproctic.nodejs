const movieValidator = (req, res, next) => {
    const {
        title,
        description,
        language,
        releaseDate,
        duration,
        genre,
        director,
        cast,
        imdbRating,
        country,
        posterUrl,
        trailerUrl,
        isPublished,
        boxOffice
    } = req.body;

    if (
        !title ||
        !description ||
        !language ||
        !releaseDate ||
        !duration ||
        !genre ||
        !director ||
        !cast ||
        imdbRating === undefined ||
        !country ||
        !posterUrl ||
        !trailerUrl ||
        isPublished === undefined ||
        boxOffice === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    next();
};

module.exports = movieValidator;