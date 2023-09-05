import axios from "axios";
import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, DELETE_ONE_TASK_FAILURE, DELETE_ONE_TASK_REQUEST, DELETE_ONE_TASK_SUCCESS, GET_ONE_TASK_FAILURE, GET_ONE_TASK_REQUEST, GET_ONE_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./actionype";

export const getTaskRequest=(payload)=>({
    type:GET_TASK_REQUEST,
    payload

})
export const getTaskFailure=(payload)=>({
    type:GET_TASK_FAILURE,
    payload

})
export const getTaskSuccess=(payload)=>({
    type:GET_TASK_SUCCESS,
    payload

})

export const getOneTaskRequest=(payload)=>({
    type:GET_ONE_TASK_REQUEST,
    payload
});
export const getOneTaskSuccess=(payload)=>({
    type:GET_ONE_TASK_SUCCESS,
    payload
});
export const getOneTaskFailure=(payload)=>({
    type:GET_ONE_TASK_FAILURE,
    payload
});

export const updateTaskRequest=(payload)=>({
    type:UPDATE_TASK_REQUEST,
    payload
})

export const updateTaskSuccess=(payload)=>({
    type:UPDATE_TASK_SUCCESS,
    payload
});

export const updateTaskFailure=(payload)=>({
    type:UPDATE_TASK_FAILURE,
    payload
});

export const deleteTaskRequest=(payload)=>({
    type:DELETE_ONE_TASK_REQUEST,
    payload
})
export const deletTaskSuccess=(payload)=>({
    type:DELETE_ONE_TASK_SUCCESS,
    payload
})

export const deleteTaskFailure=(payload)=>({
    type:DELETE_ONE_TASK_FAILURE,
    payload
});

export const addTaskRequest=(payload)=>({
    type:ADD_TASK_REQUEST,
    payload

})
export const addTaskSuccess=(payload)=>({
    type:ADD_TASK_SUCCESS,
    

})
export const addTaskFailure=(payload)=>({
    type:ADD_TASK_FAILURE,
    payload

})


export const getTaskData=(payload)=>(dispatch)=>{
    dispatch(getTaskRequest())
    axios.get("/task").then((res)=>dispatch(getTaskSuccess(res.data))).catch((err)=>dispatch(getTaskFailure(err)))
}
export const postTaskData=(token,payload)=>(dispatch)=>{
    dispatch(addTaskRequest())
    
    axios.post("/task", payload,{
        headers:{Authorization: `Bearer ${token}`}
    }

    ).then((res)=>{
        dispatch(addTaskSuccess(res.data))
        dispatch(getTaskData())
    }).catch((err)=>dispatch(addTaskFailure(err.response.data)))
}

export const getOneTaskData=(payload)=>(dispatch)=>{
    dispatch(getOneTaskRequest())
    axios.get(`/task/${payload}`).then((res)=>dispatch(getTaskData())
    ).catch((err)=>dispatch(addTaskFailure(err.response.data)))

}
export const updateTaskData=(id,payload)=>(dispatch)=>{
    dispatch(updateTaskRequest())
    axios.patch(`/task/${id}`, payload).then((res)=>dispatch(getTaskData()))
}
export const deletTaskData=(payload)=>(dispatch)=>{
    dispatch(deleteTaskRequest())
    axios.delete(`/task/${payload}`)
}