const express = require('express')
const app = express()
const fast2sms = require('fast-two-sms')
require('dotenv').config();
app.set('view engine','ejs')
app.get('/',(req,res)=>{
  res.render("index.ejs")
})
function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
var newOTP=generateOTP()
console.log(newOTP);
app.use(express.urlencoded({extended:true}))
//Sign up 
//when users click on signup, he/she should enter mobile number
//we call this post api to send that mobile number a otp, as soon as the otp is sent, 
//i.e if response is a success, a new text box should come up for validating the otp
//so we have one more button, validate OTP
//as soon as user click on that, the form's value wrt that input should be compare with the OTP
//already generated, if yes, main page-->store phone number
//if users is on sign up page and again enters the number, check in database and display error message

app.post('/sendMessage',async (req,res)=>{
    const response = await fast2sms.sendMessage({authorization:process.env.API_KEY, message:req.body.message,numbers:[req.body.number]})
    res.send(response)
})
let port = 3000
app.listen(port,()=>{
  console.log("server started on port",port);
})

