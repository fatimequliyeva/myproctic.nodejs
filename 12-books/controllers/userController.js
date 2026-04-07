const UserModel = require('../models/userModel');

const userController = {

    // 🔐 yalnız admin görsün
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find({})
                .select('-password -verificationToken'); // 🔥 gizlət

            res.status(200).json({
                message: 'Success',
                data: users
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await UserModel.findById(id)
                .select('-password -verificationToken');

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                    success: false
                });
            }

            res.status(200).json({
                message: 'Success',
                data: user
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedUser = await UserModel.findByIdAndDelete(id);

            // ❗ ƏVVƏL yoxla
            if (!deletedUser) {
                return res.status(404).json({
                    message: 'User not found or already deleted',
                    success: false
                });
            }

            res.status(200).json({
                message: 'User deleted successfully',
                data: deletedUser
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },
};

module.exports = userController;