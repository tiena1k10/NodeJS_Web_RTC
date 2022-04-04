const User = require("../models/User");
const jwt = require("jsonwebtoken")

const handleError = (err=>{
    var error = {fullname:"",email: "",password:""};
    if (err.name === 'MongoError' && err.code === 11000) 
       error.email = "This email is already being used";
    if(err.message==="Minimun password length is 6 characters")
        error.password="Minimun password length is 6 characters";
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path]= properties.message;
        });
    }
    return error;

});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, "My Secret String", {
        expiresIn: maxAge,
    });
}

module.exports.singup_get = (req,res)=>{
    res.render("signup");
}
module.exports.login_get = (req,res)=>{
    res.render("login");
}
module.exports.singup_post = async (req,res) =>{
    const {fullname,email,password} = req.body;
    
    try{
        if(password.length < 6 ){
            throw new Error("Minimun password length is 6 characters");
        }
        const user = await User.create({fullname,email,password});
        res.status(201).json({redirect: true});
        return;
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors});
    }
}
module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie("jwt",token,{httpOnly: true, maxAge: maxAge*1000});
        res.status(200).json({user : {
            id: user._id
        }});
    }catch(e){
        var errors = {email:"",password:""};
        if(e.message.includes("email"))
            errors.email="incorect email"
        if(e.message.includes("password"))
            errors.password="incorect password"
        res.status(400).json({errors})
    }
}
module.exports.logout_get = (req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    res.redirect("/");
}
