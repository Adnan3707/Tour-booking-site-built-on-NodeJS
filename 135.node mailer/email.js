
/*
// Testing
class email{
    constructor(name,last){
        this.name=name;
        this.last=last;
    }
    test(){
        return (this.name , this.last);
    }
  }
  module.exports = email
  
*/

const nodemailer = require('nodemailer');
const pug =require('pug');
const htmlToText =require('html-to-text')
// new Email(user, url).sendWelcome();
class Email{
    constructor(user , url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url =url ;
    // this.from =`Adnan Farooq <${process.env.EMAIL_FROM}>`;
    this.from =`${process.env.EMAIL_FROM}`;
    }
    getinfo(){
        return {name:this.firstName, email: this.to , url: this.url ,from: this.from}
    }
    newTransport(){
        // For SendGrid i.e For real email
    return nodemailer.createTransport({
        // no need to input host and port fot service: sendgrid  because Nodemailer has predefined for sendgrid
        service: 'SendGrid',
        auth:{
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    })
    /*
    return nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        })
        */
    }
    // Send the actual email
   async send(template, subject){
    // 1) Render HTML based on pug template           
    const html=pug.renderFile(`C:/Projects/views/email/${template}.pug`,{
       firstName: this.firstName,
       url: this.url,
       subject
   })
    // 2) Define email options
    const mailOptions = {from: this.from , to: this.to,html , subject, html ,text: htmlToText.fromString(html)}

    // 3) Create a trasport and send email
   await this.newTransport().sendMail(mailOptions)
    }
 async sendWelcome(){
    await this.send('welcome', 'Welcome to the Natours Family!')
}
}
module.exports = Email ;
 
// Old Email Handler

/*
const SendMail = async (options) =>{
    // Create Transpoter
const Transpoter = nodemailer.createTransport({
host : process.env.EMAIL_HOST,
port : process.env.EMAIL_PORT,
auth:{
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
}
})
// Mail options
const mailOptions = {from: 'adnanfarooq@gmail.com', to: options.email, subject: options.subject,text: options.text}

// Send Mail 
await Transpoter.sendMail(mailOptions)

module.exports=SendMail;
}
*/
