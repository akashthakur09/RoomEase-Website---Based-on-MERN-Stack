const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    // let authHeader = req.headers.Authorization || req.headers.authorization;
    let authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is Not authorized");
            }
            
            req.user  = decoded.user;
            // console.log(decoded.user);
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("user is not autorizeddd");
        }
    }
});

module.exports = validateToken;