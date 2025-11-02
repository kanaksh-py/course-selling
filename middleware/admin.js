const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_SECRET;

function adminMiddleware(req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);
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
    adminMiddleware: adminMiddleware
}