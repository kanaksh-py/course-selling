const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_SECRET;

function userMiddleware(req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,JWT_USER_PASSWORD);
    if (decoded) {
        req.userId = decoded.id;
        next();
    } else{
        res.status(403).json({
            message: "You are not signed in T_T"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}