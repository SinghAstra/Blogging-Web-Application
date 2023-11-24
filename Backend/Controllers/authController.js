const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res) =>{
    let {username,email,password} = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt)
    const newUser = new User({username,email,password});
    const { JWT_SECRET_KEY,JWT_EXPIRE } = process.env;
    const payload = {
        username : username,
        email : email
    }
    const token = jwt.sign(payload ,JWT_SECRET_KEY, {expiresIn :JWT_EXPIRE} )
    newUser.save()
    .then(data=>{
        res.status(200)
        .json({
            "success":true,
            token
        })
    })
}

const logInUser = async(req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    const comparePassword = bcrypt.compareSync(password,user.password);
    if(comparePassword){
        const payload = {
            username : user.username,
            email : user.email
        }
        const { JWT_SECRET_KEY,JWT_EXPIRE } = process.env;
        const token = jwt.sign(payload ,JWT_SECRET_KEY, {expiresIn :JWT_EXPIRE} )
        return res.status(200)
        .json({
            "success":true,
            token
        })
    }else{
        return res.status(200)
        .json({
            "success":false,
            "message":"Invalid credentials."
        })
    }
}

module.exports = {
    registerUser,
    logInUser
}