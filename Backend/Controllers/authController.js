const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
    let { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)
    const newUser = new User({ username, email, password });
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        username: username,
        email: email
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })
    newUser.save()
        .then(data => {
            res.status(200)
                .json({
                    "success": true,
                    token
                })
        })
}

const logInUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (comparePassword) {
        const payload = {
            username: user.username,
            email: user.email
        }
        const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })
        return res.status(200)
            .json({
                "success": true,
                token
            })
    } else {
        return res.status(200)
            .json({
                "success": false,
                "message": "Invalid credentials."
            })
    }
}

const forgotPassword = async (req, res) => {
    const { URI, RESET_PASSWORD_EXPIRE , SMTP_HOST, SMTP_PORT, EMAIL_USERNAME, EMAIL_PASS} = process.env;
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });
    if (!user) {
        return res.json({
            "success": "false",
            "message": "Invalid credentials. User Not Found."
        })
    }
    const randomHexString = crypto.randomBytes(20).toString("hex")
    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex")
    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE)
    await user.save();
    const resetPasswordUrl = `${URI}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    try {
        let transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASS
            },
            secure:true
        })
        const emailTemplate = `
        <h3 style="color : red "> Reset Your Password </h3>
        <p> This <a href=${resetPasswordUrl}   
        target='_blank'  >Link </a> will expire in 1 hours </p> 
        `;
        let mailOptions = {
            from: EMAIL_USERNAME,
            to: resetEmail,
            subject: " ✔ Reset Your Password  ✔",
            html: emailTemplate
        }
        let info = await transporter.sendMail(mailOptions);
        console.log(`Message send : ${info.messageId}`)
        return res.status(200)
            .json({
                success: true,
                message: "Email Send"
            })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(200)
        .json({
            success: false,
            message: "Email Not Send"
        })
    }
}

const resetPassword = async (req,res) => {
    const {resetPasswordToken} =  req.query;
    let {password} = req.body;
    const user = await User.findOne({
        resetPasswordToken:resetPasswordToken,
        resetPasswordExpire:{ $gt: Date.now() }
    })
    if(!user){
        return res.json({
            success:false,
            message:"Invalid Credentials or Session Expired."
        })
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.json({
        success:true,
        message:"Password has been reset Successfully."
    })
}

module.exports = {
    registerUser,
    logInUser,
    forgotPassword,
    resetPassword
}