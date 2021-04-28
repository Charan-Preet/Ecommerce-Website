const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: __dirname + '/.env' })

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://ecommerce-charanpreet.netlify.app",
        ],
        credentials: true,
    })
);

app.listen(PORT, () => console.log(`Server has started at port:${PORT}`))

//set up mongoose

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
        if (err) throw err;
        console.log("MongoDb connection establised");
    }
);

app.use('/users', require('./routes/userRouter'))
app.use('/items', require('./routes/itemRouter'))

