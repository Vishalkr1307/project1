const express=require("express")
const router=express.Router()
const User=require("../module/user")
const {body,validationResult}=require("express-validator")
const formatOfError=require("../util/valadation")
const newToken=require("../util/token")
const SentMail=require("..//util/sentMail")
const OtpVerification=require("..//module/otpVerification")
const bcrypt=require("bcrypt")
const passport=require("..//config/passport")
passport.serializeUser(({user,token},done)=>{
    done(null,{user,token})

})
passport.deserializeUser(({user,token},done)=>{
    done(null,{user,token})
})

const createEmailChain=()=>body("email").isEmail().withMessage("Please enter a valid email")
const createPasswordChain=()=>body("password").isLength({min:5}).withMessage("password must be at least 5 characters")

router.post("/register",createEmailChain(),createPasswordChain(),async (req,res)=>{

    try{
        const error=validationResult(req)
        
        // 
        if(!error.isEmpty()){
            return res.status(400).send(formatOfError(error.array()).join(","))
        }
        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).send("User already exists")
        }
        user=await User.create(req.body)
        let userOtp=await SentMail(user._id.toString(),user.email,user.name)

        return res.status(200).send(userOtp)

    }
    catch(err){
        console.log(err)
        return res.status(400).send("Bad request")
    }
})

router.post("/login",createEmailChain(),async (req,res)=>{
    try{

        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOfError(error.array()).join(","))
        }

       

        let user=await User.findOne({email:req.body.email})
        
        if(!user){
            return res.status(400).send("User not found")
        }
        
        const matchPassword=user.checkPassword(req.body.password)
        if(!matchPassword){
            return res.status(400).send(" passwords do not match")
        }
        
        const sentMail=await SentMail(user._id.toString(),user.email,user.name)
        

        return res.status(200).send(sentMail)

        



    }
    catch(err){
        
        res.status(400).send("Bad request")
    }
})

router.post("/verifyotp/:id",async (req,res)=>{
    try{
        const {otp}=req.body
        const userId=req.params.id

        if(!userId || !otp) return res.status(400).send("please enter otp and UserId")

        const userOtpData=await OtpVerification.find({userId: userId}).lean().exec()
       if(userOtpData <=0){
        return res.status(400).send("user does not exist")
       }
       else{
        const {expiresAt}=userOtpData[0]
        const hashOtp=userOtpData[0].otp
        if(expiresAt.getTime()<new Date().getTime()){
            await OtpVerification.deleteMany({userId: userId})
            return res.status(400).send("otp has been expired")
        }
        else{
            const checkOtp=bcrypt.compareSync(otp,hashOtp)

            if(!checkOtp){
                return res.status(400).send("otp has not been valid")
            }
            else{
                const user= await User.findByIdAndUpdate(req.params.id,{verify:true})
                const token=newToken(user)


                await OtpVerification.deleteMany({userId:userId})
                

                return res.status(200).send({
                    status:"Verified successfully",
                    message:"user email verified successfully",
                    token
                })
            }
        }

       }


    }
    catch(err){
        return res.status(400).send("Bad request")
    }
})
router.post("/resendverifyotp",async (req,res)=>{
    try{
        const {userId,email,name}=req.body

        if(!userId || !email || !name){
            return res.status(400).send("userId and email are required")
        }
        else{
            await OtpVerification.deleteMany({userId:userId})
            let otpData=await SentMail(userId,email,name)
            return res.status(200).send(otpData)
        }

    }
    catch(err){
        return res.status(400).send("Bad request")
    }
})

router.post("/login/forgetpassword",async (req,res)=>{
    try{
        const {email}=req.body
        const user=await User.findOne({email: email}).lean().exec()
        if(!user){
            return res.status(400).send("user not found")
        }
        let userOtp=await SentMail(user._id.toString(),user.email,user.name)
        return res.status(200).send(userOtp)

        
    }
    catch(err){
        return res.status(400).send("Bad request")
    }

})
router.patch("/login/forgetpassword/resetpassword/:id",async (req,res)=>{
    try{
        let id=req.params.id
        const {newPassword} = req.body
        const hashPassword=bcrypt.hashSync(newPassword,8)
        const user=await User.findByIdAndUpdate(id,{password:hashPassword})

        return res.status(200).send({status:"you password has been updated",user})

    }
    catch(err){
        return res.status(400).send("Bad request")
    }
})
router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/login'
}));
router.get("/google/success",async (req,res)=>{
    try{
        
        

        return res.status(200).send("Successfully logged in")


    }
    catch(err){
        return res.status(400).send("bad request");
    }

})


module.exports=router