const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = { connectDB };