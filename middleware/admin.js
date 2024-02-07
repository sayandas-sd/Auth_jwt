const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../json_token");

function adminMiddleware(req,res,next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        
        if(decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "you are not authenticate"
            })
        }
    } catch(err) {
        res.status(403).json({
            msg: "Incorrect input" 
        })
    }
}
module.exports = adminMiddleware;