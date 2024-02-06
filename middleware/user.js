const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../index");

function userMiddleware(req,res,next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username) {
        next();
    } else { 
        res.status(403).json({
            msg: "you are not authenticate"
        })
    }
}
module.exports = userMiddleware;