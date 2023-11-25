const User = require('../Models/user');
const jwt = require('jsonwebtoken');

const getProfile = async (req, res) => {
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
    req.user = user;
    return res.json({
        success: true,
        data: user
    })
}

const editProfile = async (req, res) => {
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
    req.user = user;
    const { email, username } = req.body
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        email, username
    },
        {
            new: true,
            runValidators: true
        })
    return res.status(200).json({
        success: true,
        data: updatedUser
    })
}

module.exports = {
    getProfile,
    editProfile
}