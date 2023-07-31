const express = require('express')
const app = express()
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require ('body-parser')
require('dotenv').config()
var cors = require("cors")
const cookieParser = require('cookie-parser')

//database connection

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>console.log("DB connected"))
.catch((err) => console.log(err))

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true}));
app.use(cookieParser())
app.use(cors())


//port
const port = process.env.PORT || 8000 

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`) 
});