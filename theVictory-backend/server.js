const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes.routes');
const postRouter = require('./routes/post.routes')
const fileUpload = require('express-fileupload');
require('dotenv').config({ path: "./config/.env" })
require('./config/database')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    fileUpload({
        createParentPath: true
    })
)

app.use('/api/users', userRoutes)
app.use('/api/posts', postRouter)

app.listen(`${process.env.PORT}`, () => {
    console.log(`server listen in port ${process.env.PORT}`)
})