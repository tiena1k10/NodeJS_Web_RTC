const jwt = require("jsonwebtoken");
const User = require("../models/User")
module.exports.requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"My Secret String",(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect("/login");
            }else{
                next();
            }
        });
    }else{
        res.redirect("/login");
    }
}
module.exports.checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"My Secret String", async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = {
                    name: user.fullname,
                }
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}
module.exports.requireLoggedout = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"My Secret String",(err,decodedToken)=>{
            if(err){
                console.log(err);
                next();
            }else{
                res.redirect("/");
            }
        });
    }else{
        next();
    }
}