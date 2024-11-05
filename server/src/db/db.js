const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('db connected')

    } catch (error) {
        console.log('error connecting to the database', error)
    }
}


module.exports = connectDB;