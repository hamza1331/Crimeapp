import {
adminLogin,
adminLogout,
insertComplainAdmin,
insertCrimeAdmin,
insertMissingAdmin,
deleteComplainAdmin,
deleteCrimeAdmin,
deleteMissingAdmin,
showMissingAdmin,
showComplainAdmin,
showCrimenAdmin,
hideComplainAdmin,
hideCrimenAdmin,
hideMissingAdmin,
updateReportStatus,
updateComplainStatus,
updateMissingStatus
} from "../actions/actionNames";
const initialState = {
    adminLoggedIn:false,
    uid:'',
    allComplains:[],
    allCrimes:[],
    allMissing:[],
    showCrimeModal: false,
    showComplainModal:false,
    showMissingModal:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case adminLogin:
        return{
            ...state,
            adminLoggedIn:true,
            uid:action.payload
        }
        case adminLogout:
        return{
            ...state,
            adminLoggedIn:false,
            uid:''
        }
        case insertComplainAdmin:
        return{
            ...state,
            allComplains:[...state.allComplains,action.payload]
        }
        case insertMissingAdmin:
        return{
            ...state,
            allMissing:[...state.allMissing,action.payload]
        }
        case insertCrimeAdmin:
        return{
            ...state,
            allCrimes:[...state.allCrimes,action.payload]
        }
        case deleteComplainAdmin:
        let updatedComplains = state.allComplains.filter((complain)=>complain.complainId!==action.payload)
        return{
            ...state,
            allComplains:updatedComplains
        }
        case deleteMissingAdmin:
        let updatedMissing = state.allMissing.filter((missing)=>missing.missingId!==action.payload)
        return{
            ...state,
            allMissing:updatedMissing
        }
        case deleteCrimeAdmin:
        let updatedCrimes = state.allCrimes.filter((crime)=>crime.crimeId!==action.payload)
        return{
            ...state,
            allCrimes:updatedCrimes
        }
        case showComplainAdmin:
        return{
            ...state,
            showComplainModal:true
        }
        case showMissingAdmin:
        return{
            ...state,
            showMissingModal:true
        }
        case showCrimenAdmin:
        return{
            ...state,
            showCrimeModal:true
        }
        case hideComplainAdmin:
        return{
            ...state,
            showComplainModal:false
        }
        case hideCrimenAdmin:
        return{
            ...state,
            showCrimeModal:false
        }
        case hideMissingAdmin:
        return{
            ...state,
            showMissingModal:false
        }
        case updateReportStatus:
        let newReports=state.allCrimes
        newReports[action.payload.updateIndex].status=action.payload.status
        return{
            ...state,
            allCrimes:newReports
        }
        case updateComplainStatus:
        let newComplains=state.allComplains
        newComplains[action.payload.updateIndex].status=action.payload.status
        return{
            ...state,
            allComplains:newComplains
        }
        case updateMissingStatus:
        let newMissing=state.allMissing
        newMissing[action.payload.updateIndex].status=action.payload.status
        return{
            ...state,
            allMissing:newMissing
        }
        default:
            return state
    }
}