const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/graphql-mongoose-example')
        console.log('db connected')

    } catch (error) {
        console.log('error connecting to the database', error)
    }
}


module.exports = connectDB;