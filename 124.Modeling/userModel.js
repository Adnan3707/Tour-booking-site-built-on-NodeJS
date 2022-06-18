const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role:{
    type: String,
    enum: [""],
    default: 'user'
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,12);
  this.passwordConfirm = undefined;
  next();
})
userSchema.methods.correctPassword = async function(password,userpassword) {
 return await bcrypt.compare(password,userpassword)
}
 // Authenticate user (not working for date of token)
userSchema.methods.changedPasswordAfter = async function(JWTtime){
  if(this.passwordChangedAt){
    const passStamp = parseInt(await this.passwordChangedAt.getTime() /1000, 10);
    console.log(passStamp,JWTtime);
    return JWTtime < passStamp ;
    //JWTtime > passStamp ;

  }
  return false ;
}
 // Create Password reset Token 
 userSchema.methods.createPasswordResetToken =  function(){
   const resetToken = crypto.randomBytes(32).toString('hex');
   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

   this.passwordResetExpires = Date.now()+10 * 60 * 1000;
   console.log('log 1'+ resetToken , this.passwordResetToken);
   return resetToken;
 }

const Users = mongoose.model("Users", userSchema);
module.exports = Users;