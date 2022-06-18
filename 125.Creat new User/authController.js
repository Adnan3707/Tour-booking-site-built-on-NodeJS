const crypto = require('crypto');
const {promisify}= require('util');
const jwt = require("jsonwebtoken");
const User = require("C:/Projects/124.Modeling/userModel.js");
const { stringify } = require('json-buffer');

const Email = require("C:/Projects/135.node mailer/email.js");

// const sendEmail = require("C:/Projects/135.node mailer/email.js");



const Token = id =>{
  return jwt.sign({id: id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES
  })
}
{
//const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
//  expiresIn: process.env.JWT_EXPIRES
//})
}

// Get all Users
/*
exports.getUsers = async (req, res, next) => {
  const newUser = await User.find({});
  console.log('trigeredss')
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
}
*/

exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = Token(newUser._id)

  // Send Email
  const url ='http://127.0.0.1:3000/';
  const adn = new Email(newUser,url);
  adn.sendWelcome()


 { 
  //jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
  //  expiresIn: process.env.JWT_EXPIRES
 // })
 }

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });

};
exports.login = async (req, res, next) => {
   // 1) Check if the email ,Password is entered
   const {email, password} =req.body;
  // 2) Error in first Step
   if(!email || !password) {console.log("Please enter your email and Password")}
   // 3) Check if User  exists
  const user= await User.findOne({email: email});
   // Check Enter Password and database Password is correct
  const correct = await user.correctPassword(password,user.password);
   if(user && correct){
     console.log("Incorrect Email or Password")
     // If everything is correct Create token
      const token =Token(user._id)
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
        ),
        secure : true,
        httpOnly: true
      };
      // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
      res.cookie('jwt', token, cookieOptions);
        //  res.cookie('jwt',token)
      res.status(200).json({status:'Success',token: token});
        next();
    }
    else{
      console.log("Incorrect Email or Password")
      res.status(200).json({
        status : 'Incorrect Email or Password'
      })
    }
  /* 
 // If everything is correct Create token
 const token =Token(user._id)
 const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
  ),
  secure : true,
  httpOnly: true
};
// if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
res.cookie('jwt', token, cookieOptions);
  //  res.cookie('jwt',token)
res.status(200).json({status:'Success',token: token});
  next();
  */
 }
 // Authenticate user (not working for date of token)
exports.protect = async (req, res ,next) => {
  // 1 getting Token from URL
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    token=req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  // 2 Checking if token exists in the URL
  if(!token){
    return res.status(401).json({message:'Token Not found'});
    //console.log("Error")
}

   // 3 Validate token
  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
//  res.status(202).json({message:'done'})
  console.log(decoded);

   // 4 Check if User Exists
   const currentUser = await User.findById(decoded.id);
   if(!currentUser) {console.log('no User found')}

   // 5 Check if password Changed (DATE ) -- Not Working yet
   if(currentUser.changedPasswordAfter(decoded.iat)){
     console.log("Password changed after Token issued -- Date not authorising ")
   }
   // Pass current User to next middleware
   req.user=currentUser;
  next()
}
exports.restrictTo = (... roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
        return res.status(404).json({message:'Unathorized Permission'})
    }
    next();
  }
}
exports.forgotPassword = async (req, res , next) => {
  console.log("clicked")
  // Enter Email
  const user = await User.findOne({email : req.body.email });
  console.log(user)
  if(!user){res.status(404).json({message:'User Not Found'})}
  
  // reset token
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false})

  // Link  for password
  const resetURL = `${req.protocol}://${req.get('host')}/user/login/reset/link/${resetToken}`
  
  //Recieve on mailtrap
  const message = `\nForgot your password? Submit a PATCH request with your new password and passwordConfirm to:\n ${resetURL} \nIf you didn't forget your password, please ignore this email!`;



  sendEmail({email:user.email,   subject: 'Your password reset token (valid for 10 min)',
 text:message})
  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!'
  });

  next();
}
exports.resetPassword = async (req, res , next) =>{
  // 1) Get token i.e Unhashed
    const Hashedtoken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  // 2) Verify Hashed Token in USer Database & If expired 
  const user = await User.findOne({passwordResetToken: Hashedtoken , passwordResetExpires : {$gt: Date.now()}})

  if(!user){res.status(404).json({message:'no User Found'})}
  // 3) Set Password 
  user.password = req.body.password;
  user.passwordConfirm =req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  user.save();
  // 4) Send Token  
  const token = Token(user._id);
  res.status(200).json({status:'Success',token})
}