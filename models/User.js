const mongooes = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");




const userSchema = new mongooes.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        // unique: [true, "This email is already being used"],
        lowercase: true,
        validate : [isEmail,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password!"],
        minLenght: [6, "Minimun password length is 6 characters"],
    },
    fullname:{
        type: String,
        required: [true, "Please enter a fullname!"],
    }

});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth)
            return user;
        throw new Error("incorect password");
    }
    throw new Error("incorrect email");
}

const User = mongooes.model("user",userSchema);




module.exports = User;