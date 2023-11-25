const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

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


const forgotPassword = async(req,res) => {
    const {URI,EMAIL_USERNAME} = process.env;
    const resetEmail = req.body.email;
    const user = await User.findOne({email:resetEmail});
    console.log("user is ",user);
    if(!user){
        return res.json({
            "success":"false",
            "message":"Invalid credentials. User Not Found."
        })
    }
    const { RESET_PASSWORD_EXPIRE } = process.env
    const randomHexString = crypto.randomBytes(20).toString("hex")
    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex")
    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordExpire = Date.now()+ parseInt(RESET_PASSWORD_EXPIRE)
    await user.save();
    const resetPasswordUrl = `${URI}/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    console.log("resetPasswordUrl is ",resetPasswordUrl);
    return res.status(200)
        .json({
            user
        })
}

module.exports = {
    registerUser,
    logInUser,
    forgotPassword
}