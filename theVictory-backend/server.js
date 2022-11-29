const express = require('express')
const dotenv = require('dotenv').config({ path: "./config/.env" })
const cors = require('cors')

const app = express()

const connectDataBase = require('./database/connexion')

const router = require('./route/userRoute')

connectDataBase()

//Cors
app.use(cors())

//Routes
app.use('/user', router)

app.listen(
    process.env.VITE_APP_PORT, () => {
        console.log(`server listening in http://localhost:${process.env.VITE_APP_PORT}`)
    })