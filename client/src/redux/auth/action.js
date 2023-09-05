import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS, ADD_VERIFY_OTP_FAILURE, ADD_VERIFY_OTP_REQUEST, ADD_VERIFY_OTP_SUCCESS } from "./actionType";
import axios from "axios"
export const addLoginRequest=(payload)=>({
    type:ADD_LOGIN_REQUEST,
    payload
})
export const addLoginFailure=(payload)=>({
    type:ADD_LOGIN_FAILURE,
    payload
})
export const addLoginSuccess=(payload)=>({
    type:ADD_LOGIN_SUCCESS,
    payload
})
export const addRegisterRequest=(payload)=>({
    type:ADD_REGISTER_REQUEST,
    payload
})
export const addRegisterFailure=(payload)=>({
    type:ADD_REGISTER_FAILURE,
    payload
})
export const addRegisterSuccess=(payload)=>({
    type:ADD_REGISTER_SUCCESS,
    payload
})

export const addVerifyOtpRequest=(payload)=>({
    type:ADD_VERIFY_OTP_REQUEST,
    payload
})
export const addVerifyOtpSuccess=(payload)=>({
    type:ADD_VERIFY_OTP_SUCCESS,
    payload
})
export const addVerifyOtpFailure=(payload)=>({
    type:ADD_VERIFY_OTP_FAILURE,
    payload
})

export const addResendOtpRequest=(payload)=>({
    type:ADD_RESEND_OTP_REQUEST,
    payload
})
export const addResendSuccess=(payload)=>({
    type:ADD_RESEND_OTP_SUCCESS,
    payload
})
export const addResendFailure=(payload)=>({
    type:ADD_RESEND_OTP_FAILURE,
    payload
})

export const addForgetRequest=(payload)=>({
    type:ADD_FORGET_PASSWORD_REQUEST,
    payload
})
export const addForgetSuccess=(payload)=>({
    type:ADD_FORGET_PASSWORD_SUCCESS,
    payload
})
export const addForgetFailure=(payload)=>({
    type:ADD_FORGET_PASSWORD_FAILURE,
    payload
})
export const addRestPasswordRequest=(payload)=>({
    type:ADD_RESET_PASSWORD_REQUEST,
    payload

})
export const addRestPasswordSuccess=(payload)=>({
    type:ADD_RESET_PASSWORD_SUCCESS,
    payload

})
export const addRestPasswordFailure=(payload)=>({
    type:ADD_RESET_PASSWORD_FAILURE,
    payload

})
export const postLoginData=(payload)=>(dispatch)=>{
    dispatch(addLoginRequest())
    axios.post("/auth/login", payload).then((res)=>dispatch(addLoginSuccess(res.data))).catch((err)=>dispatch(addLoginFailure(err.response.data)))
}
export const postRegisterData=(payload)=>(dispatch)=>{
    dispatch(addRegisterRequest())
    axios.post("/auth/register", payload).then((res)=>dispatch(addRegisterSuccess(res.data))).catch((err)=>dispatch(addRegisterFailure(err.response.data)))
}
export const postVerifyOtp=(id,payload)=>(dispatch)=>{
    dispatch(addVerifyOtpRequest())
    axios.post(`/auth/verifyotp/${id}`, payload).then((res)=>dispatch(addVerifyOtpSuccess(res.data))).catch((err)=>dispatch(addVerifyOtpFailure(err.response.data)))
}
export const postResendData=(payload)=>(dispatch)=>{
    dispatch(addResendOtpRequest())
    axios.post("auth/resendverifyotp", payload).then((res)=>dispatch(addResendSuccess(res.data))).catch((err)=>dispatch(addResendFailure(err.response.data)))
}
export const postForgetData=(payload)=>(dispatch)=>{
    dispatch(addForgetRequest())
    axios.post("/auth/login/forgetpassword", payload).then((res)=>dispatch(addForgetSuccess(res.data))).catch((err)=>dispatch(addForgetFailure(err.response.data)))
}

export const postResetPasswordData=(id,payload)=>(dispatch)=>{
    dispatch(addRestPasswordRequest())
    axios.patch(`/auth/login/forgetpassword/resetpassword/${id}`,payload).then((res)=>dispatch(addRestPasswordSuccess(res.data))).catch((err)=>dispatch(addRestPasswordFailure(err.response.data)))
}