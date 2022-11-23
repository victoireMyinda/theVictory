const mongoose = require('mongoose')

const connectDataBase = async() => {
    try {
        const conn = await mongoose.connect(`${process.env.VITE_APP_MONGO_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connecteed: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDataBase