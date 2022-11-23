const express = require('express')
const dotenv = require('dotenv').config({ path: "./config/.env" })

const app = express()

const connectDataBase = require('./database/connexion')

const router = require('./route/userRoute')

connectDataBase()

//Routes
app.use('/', router)

app.listen(
    process.env.VITE_APP_PORT, () => {
        console.log(`server listening in http://localhost:${process.env.VITE_APP_PORT}`)
    })