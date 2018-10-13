import { 
    login,
    logout,
    insertCrime,
    showCrime,
    hideCrime,
    deleteCrime,
    insertComplain,
    insertMissPerson,
    showComplain,
    hideComplain,
    deleteComplain
} from "./actionNames";


export function LoginAction(uid){
    return dispatch=>{
        dispatch({
            type:login,
            payload:uid
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
export function showCrimeAction(crimeIndex){
    return dispatch=>{
        dispatch({
            type:showCrime,
            payload:crimeIndex
        })
    }
}
export function hideCrimeAction(){
    return dispatch=>{
        dispatch({
            type:hideCrime
        })
    }
}
export function insertComplaint(comp){
    return dispatch=>{
        dispatch({
            type:insertComplain,
            payload:comp
        })
    }
}
export function insertMissingPerson(misperson){
    return dispatch=>{
        dispatch({
            type:insertMissPerson,
            payload:misperson
        })
    }
}
export function deleteCrimeAction(crimeId){
    return dispatch=>{
        dispatch({
            type:deleteCrime,
            payload:crimeId
        })
    }
}

export function showComplainAction(complainIndex){
    return dispatch=>{
        dispatch({
            type:showComplain,
            payload:complainIndex
        })
    }
}
export function hideComplainAction(){
    return dispatch=>{
        dispatch({
            type:hideComplain
        })
    }
}
export function deleteComplainAction(complainId){
    return dispatch=>{
        dispatch({
            type:deleteComplain,
            payload:complainId
        })
    }
}