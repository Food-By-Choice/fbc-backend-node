const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/authRoute.js')
const distributorRoute = require('./routes/distrtibutorRoute.js')
const deliveryBoyRoute = require('./routes/deliveryBoyRoute.js')

require('dotenv').config()

const app = express();

app.use(cors(
    // {
    // origin : 'http://127.0.0.1:5500',
    // credentials : true,
    // allowedHeaders : ['Cookie', 'Content-Type', 'Set-Cookie', 'Authorization']
    // }
))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/auth', authRoute)
app.use('/distributor', distributorRoute)
app.use('/delivery-boy', deliveryBoyRoute)

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology : true, useNewUrlParser : true } )
    .then(() => {
        app.listen(process.env.REST_PORT, () => {
            console.log('Server Started at', process.env.REST_PORT);
        })
    })
    .catch(err => console.log(err))
