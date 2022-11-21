const express = require('express')

const app = express()

//const dotenv = require('dotenv').config({ path: './config/.env' })


app.listen(
    import.meta.env.VITE_APP_PORT, () => {
        console.log(`server listen on port  htpp://localhost :${import.meta.env.VITE_APP_PORT}`)
    })