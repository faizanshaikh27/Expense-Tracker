const mongoose = require('mongoose')

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to Database')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDb