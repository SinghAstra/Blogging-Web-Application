const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const asyncErrorWrapper = require("express-async-handler")

const registerUser = asyncErrorWrapper(async (req, res) => {
    let { username, email, password } = req.body;
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)
    const newUser = User.create({ username, email, password });
    const payload = {
        id: newUser.id,
        username: username,
        email: email
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })
    res.status(200)
        .json({
            "success": true,
            "data": {
                token
            }
        })
})


const logInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            "success": false,
            "message": "Missing Credentials."
        })
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({
            "success": false,
            "message": "Invalid Credentials."
        })
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (comparePassword) {
        const payload = {
            id: user.id,
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
    const { URI, RESET_PASSWORD_EXPIRE, SMTP_HOST, SMTP_PORT, EMAIL_USERNAME, EMAIL_PASS } = process.env;
    const resetEmail = req.body.email;
    if (!resetEmail) {
        return res.json({
            "success": false,
            "message": "Missing Credentials."
        })
    }
    const user = await User.findOne({ email: resetEmail });
    if (!user) {
        return res.json({
            "success": "false",
            "message": "Invalid credentials."
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
            secure: true
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
        await transporter.sendMail(mailOptions);
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

const resetPassword = async (req, res) => {
    const { resetPasswordToken } = req.query;
    let { password } = req.body;
    if (!resetPasswordToken || !password) {
        return res.json({
            "success": false,
            "message": "Missing Credentials."
        })
    }
    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return res.json({
            success: false,
            message: "Invalid Credentials or Session Expired."
        })
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.json({
        success: true,
        message: "Password has been reset Successfully."
    })
}

const getPrivateData = async (req, res) => {
    const { JWT_SECRET_KEY } = process.env;
    const authorization = req.headers.authorization
    if (!(authorization && authorization.startsWith("Bearer"))) {
        return res.json({
            "success": false,
            "message": "You are not authorised to access this route."
        })
    }
    const access_token = authorization.split(" ")[1]
    const decoded = jwt.verify(access_token, JWT_SECRET_KEY);
    if (!decoded) {
        return res.json({
            "success": false,
            "message": "You are not authorised to access this route."
        })
    }
    const user = await User.findById(decoded.id);
    return res.json({
        "message": "success",
        user
    })

}

module.exports = {
    registerUser,
    logInUser,
    forgotPassword,
    resetPassword,
    getPrivateData
}