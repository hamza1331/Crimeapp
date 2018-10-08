import { 
    login,
    logout,
    insertCrime
} from "./actionNames";


export function LoginAction(username){
    return dispatch=>{
        dispatch({
            type:login,
            payload:username
        })
    }
}
export function insertCrimeAction(crime){
    return dispatch=>{
        dispatch({
            type:insertCrime,
            payload:crime
        })
    }
}
export function LogoutAction(){
    return dispatch=>{
        dispatch({
            type:logout
        })
    }
}