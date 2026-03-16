const validateDoctor = (req, res, next) => {

    // if (!req.body) {
    //     return res.status(400).json({
    //         message: "Body is required"
    //     })
    // }

    const { name } = req.body

    if (!name) {
        return res.status(400).json({
            message: "Name field is required"
        })
    }

    next()
}

module.exports = { validateDoctor }