const mongoose = require('mongoose')

mongoose.connect(`${process.env.DATABASE_URI},`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connexion successful')
}).catch(err => {
    console.log('connexion impossible')
})