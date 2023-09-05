export const postLocaldat=(name,user)=>{
    if(name && user){
        localStorage.setItem(name,user)
    }

}
export const getLocaldata=(name)=>{
    if(name){
        return localStorage.getItem(name)
    }
}