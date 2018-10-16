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
    deleteComplain,
    showMissing,
    hideMissing,
    deleteMissing,
    countURLS,
    showAllMissing,
    adminLogin,
    adminLogout,
    insertComplainAdmin,
    insertCrimeAdmin,
    insertMissingAdmin,
    deleteComplainAdmin,
    deleteCrimeAdmin,
    deleteMissingAdmin,
    showComplainAdmin,
    showCrimenAdmin,
    showMissingAdmin,
    hideComplainAdmin,
    hideCrimenAdmin,
    hideMissingAdmin,
    updateReportStatus,
    updateComplainStatus,
    updateMissingStatus
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
export function showMissingAction(missingDetail){
    return dispatch=>{
        dispatch({
            type:showMissing,
            payload:missingDetail
        })
    }
}
export function hideMissingAction(){
    return dispatch=>{
        dispatch({
            type:hideMissing
        })
    }
}
export function deleteMissingAction(missingId){
    return dispatch=>{
        dispatch({
            type:deleteMissing,
            payload:missingId
        })
    }
}
export function countURLSAction(missingIndex){
    return dispatch=>{
        dispatch({
            type:countURLS,
            payload:missingIndex
        })
    }
}
export function showAllMissingAction(missing){
    return dispatch=>{
        dispatch({
            type:showAllMissing,
            payload:missing
        })
    }
}
export function adminLoginAction(uid){
    return dispatch=>{
        dispatch({
            type:adminLogin,
            payload:uid
        })
    }
}
export function adminLogoutAction(){
    return dispatch=>{
        dispatch({
            type:adminLogout
        })
    }
}
export function insertMissingAdminAction(misperson){
    return dispatch=>{
        dispatch({
            type:insertMissingAdmin,
            payload:misperson
        })
    }
}
export function insertComplainAdminAction(complain){
    return dispatch=>{
        dispatch({
            type:insertComplainAdmin,
            payload:complain
        })
    }
}
export function insertReportAdminAction(crime){
    return dispatch=>{
        dispatch({
            type:insertCrimeAdmin,
            payload:crime
        })
    }
}
export function deleteCrimeAdminAction(crimeId){
    return dispatch=>{
        dispatch({
            type:deleteCrimeAdmin,
            payload:crimeId
        })
    }
}
export function deleteComplainAdminAction(complainId){
    return dispatch=>{
        dispatch({
            type:deleteComplainAdmin,
            payload:complainId
        })
    }
}
export function deleteMissingAdminAction(missingId){
    return dispatch=>{
        dispatch({
            type:deleteMissingAdmin,
            payload:missingId
        })
    }
}
export function showComplainAdminAction(){
    return dispatch=>{
        dispatch({
            type:showComplainAdmin
        })
    }
}
export function showCrimeAdminAction(){
    return dispatch=>{
        dispatch({
            type:showCrimenAdmin
        })
    }
}
export function showMissingAdminAction(){
    return dispatch=>{
        dispatch({
            type:showMissingAdmin
        })
    }
}
export function hideCrimeAdminAction(){
    return dispatch=>{
        dispatch({
            type:hideCrimenAdmin
        })
    }
}
export function hideComplainAdminAction(){
    return dispatch=>{
        dispatch({
            type:hideComplainAdmin
        })
    }
}
export function hideMissingAdminAction(){
    return dispatch=>{
        dispatch({
            type:hideMissingAdmin
        })
    }
}
export function updateReportStatusAction(updateDetails){
    return dispatch=>{
        dispatch({
            type:updateReportStatus,
            payload:updateDetails
        })
    }
}
export function updateComplainStatusAction(updateDetails){
    return dispatch=>{
        dispatch({
            type:updateComplainStatus,
            payload:updateDetails
        })
    }
}
export function updateMissingStatusAction(updateDetails){
    return dispatch=>{
        dispatch({
            type:updateMissingStatus,
            payload:updateDetails
        })
    }
}