const User = require('../Models/user');
const bcrypt = require('bcrypt');


const registerUser = async(req,res) =>{
    let {username,email,password} = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt)
    const newUser = new User({username,email,password});
    newUser.save()
    .then(data=>{
        res.status(200)
        .json({
            "success":true,
            data
        })
    })
}

module.exports = {
    registerUser
}