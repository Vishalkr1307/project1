import { getLocaldata, postLocaldat } from "../../utlies/LocalData"
import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS, ADD_VERIFY_OTP_FAILURE, ADD_VERIFY_OTP_REQUEST, ADD_VERIFY_OTP_SUCCESS } from "./actionType"

const init={
    isLoading:false,
    isError:false,
    token:getLocaldata("token")||"",
    isAuth:getLocaldata("token")?true:false,
    user:{},
    verifyStatus:"",
    forgetPassword:false,
    resetPassword:""
    

}

export const authReducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_LOGIN_REQUEST:
            return {...store,isLoading:true}
        case ADD_LOGIN_SUCCESS:
            return {...store,isLoading:false,user:payload,isError:false}
        case ADD_LOGIN_FAILURE:
            return {...store,isLoading:false,isAuth:false,isError:payload}
        case ADD_REGISTER_REQUEST:
            return {...store,isLoading:true}
        case ADD_REGISTER_SUCCESS:
            return {...store,isLoading:false,user:payload,isError:false}
        case ADD_REGISTER_FAILURE:
            return {...store,isLoading:false,isError:payload}

        case ADD_VERIFY_OTP_REQUEST:
            return {...store,isLoading:true}
        case ADD_VERIFY_OTP_SUCCESS:
            postLocaldat("token",payload.token)
            return {...store,isLoading:false,token:payload.token,isAuth:true,verifyStatus:payload.status,isError:false,forgetPassword:true}
        case ADD_VERIFY_OTP_FAILURE:
            return {...store,isLoading:false,isAuth:false,isError:payload}
        case ADD_FORGET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_FORGET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,user:payload,isError:false}
        case ADD_FORGET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isAuth:false,isError:payload}
        case ADD_RESET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,isError:false,resetPassword:payload}
        case ADD_RESET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_RESEND_OTP_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESEND_OTP_SUCCESS:
            return {...store,isLoading:false,user:payload,isError:false}
        case ADD_RESEND_OTP_FAILURE:
            return {...store,isLoading:false,isError:payload}

        default:
            return {...store}
    }

}