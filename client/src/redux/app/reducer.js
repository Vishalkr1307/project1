import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS } from "./actionype"

const init={
    loading: false,
    error:false,
    task:[],
    success:false,
}
export const appReducer=(store=init,{type,payload})=>{
    switch(type){
        case GET_TASK_REQUEST:
            return {...store,loading:true}
        case GET_TASK_SUCCESS:
            return {...store,loading:false,task:payload}
        case GET_TASK_FAILURE:
            return {...store,error:true}
        case ADD_TASK_REQUEST:
            return {...store,loading:true}
        case ADD_TASK_SUCCESS:
            return {...store,success:true}
        case ADD_TASK_FAILURE:
            return {...store,error:payload,success:false}
        default:
            return {...store}

    }

}