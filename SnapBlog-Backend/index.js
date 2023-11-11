const express = require('express');
const  route = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.dbURL).then(()=>{
    console.log("Connected to the Database Succesfully");
}).catch(err=>{
    console.log("Error while Connecting to Database");
})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', route);

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})