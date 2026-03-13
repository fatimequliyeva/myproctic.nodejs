const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://Fatime:Fatime1930@cluster0.whz60re.mongodb.net/MovieApp';

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;