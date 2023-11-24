const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const IndexRoute = require('./Routers/index');
require('dotenv').config();

mongoose.connect(process.env.dbURL).then(()=>{
    console.log("Connected to the Database Succesfully");
}).catch(err=>{
    console.log("Error while Connecting to Database");
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.json({"message":"SnapBlog API is up and running."})
})

app.use('/api', IndexRoute);

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})