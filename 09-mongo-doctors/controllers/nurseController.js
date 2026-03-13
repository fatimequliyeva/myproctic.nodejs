const updateNurse = async (req, res) => {
    try {
        const { id } = req.params

        const nurse = await NurseModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!nurse) {
            return res.status(404).json({
                success: false,
                message: "Nurse not found"
            })
        }

        res.status(200).json({
            success: true,
            data: nurse
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteNurse = async (req, res) => {
    try {
        const { id } = req.params

        const nurse = await NurseModel.findByIdAndDelete(id)

        if (!nurse) {
            return res.status(404).json({
                success: false,
                message: "Nurse not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Nurse deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllNurse,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse
}