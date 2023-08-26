const nodemailer=require("nodemailer")
const otpVerification=require("..//module/otpVerification")
const bcrypt=require("bcrypt")
require("dotenv").config()

const MailGen=require("mailgen")


module.exports=async (id,email,name)=>{
    const transporter=await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER_NAME,
            pass:process.env.GMAIL_USER_PASSWORD
        }
    })

    const otp=Math.floor(1000+Math.random()*9000)

    const haspOtp=bcrypt.hashSync(otp.toString(),8)

    const newOtpVerification=await otpVerification({
        userId:id,
        otp:haspOtp,
        createdAt:Date.now(),
        expiresAt:Date.now()+ 360000
    })
     await newOtpVerification.save()
     

    const mailGenerator=new MailGen({
        theme:'default',
        product:{
            name:'Project-1',
            link:"http://localhost:4000"

        }
    })
   let emailData={
    body:{
        name:name,
        intro:'welcome to project-1! we\'re very excited to have on board',
        action:{
            instructions:`to get started wit MailGene, please enter otp`,
            button:{
                color:"green",
                text:otp

            }
        },
        outro:'Need help, or have question? just reply to this email,we\'d love to help'
    }
   }

   const emailBody= await mailGenerator.generate(emailData)
   const emailText=await mailGenerator.generatePlaintext(emailData)
    

    


    const info=await transporter.sendMail({
        from:process.env.GMAIL_USER_NAME,
        to:email,
        subject:"verified email",
        text:emailText,
        html:emailBody


    })
    return {status:`opt send to ${email}`,userId:id,email:email,name:name}

}
