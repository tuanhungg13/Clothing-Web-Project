const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const dbconnection = await mongoose.connect(process.env.MONGODB_URL_CLOUD);
        if (dbconnection.connection.readyState === 1) {
            console.log('Db connection is successfully')
        }
        else {
            console.log('db connection is failed')
        }
    } catch (error) {
        console.log(`database connection is failed!: ${error}`)

    }
}

module.exports = dbConnect;