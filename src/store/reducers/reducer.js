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
    showAllMissing
} from "../actions/actionNames";
const initialState = {
    isLoggedIn: false,
    uid: '',
    crimes: [],
    showCrimeModal: false,
    showCrime: {},
    complains: [],
    missingPersons: [],
    showComplainModal:false,
    showComplain:{},
    showMissingModal:false,
    showMissing:{},
    URLS:0,
    allMissing:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case login:
            return {
                ...state,
                isLoggedIn: true,
                uid: action.payload
            }

        case logout:
            return {
                ...state,
                isLoggedIn: false,
                uid: ''
            }
        case insertCrime:
            return {
                ...state,
                crimes: [...state.crimes, action.payload]
            }
        case showCrime:
            return {
                ...state,
                showCrime: state.crimes[action.payload],
                showCrimeModal: true
            }
        case hideCrime:
            return {
                ...state,
                showCrime: {},
                showCrimeModal: false
            }
        case deleteCrime:
            let updatedCrimes = state.crimes.filter((crime) => {
                return crime.crimeId !== action.payload
            })
            return {
                ...state,
                crimes: updatedCrimes
            }
        case insertComplain:
            return {
                ...state,
                complains: [...state.complains, action.payload]
            }
        case insertMissPerson:
            return {
                ...state,
                missingPersons: [...state.missingPersons, action.payload]
            }
        case showComplain:
        return{
            ...state,
            showComplain:state.complains[action.payload],
            showComplainModal:true
        }
        case hideComplain:
        return{
            ...state,
            showComplain:{},
            showComplainModal:false
        }
        case deleteComplain:
        let updatedComplains = state.complains.filter((complain)=>complain.complainId!==action.payload)
        return{
            ...state,
            complains:updatedComplains
        }
        case showMissing:
        if(action.payload.screen==='missing'){
            return {
                ...state,
                showMissing:state.missingPersons[action.payload.index],
                showMissingModal:true
            }
        }
        else if(action.payload.screen==='home'){
            return {
                ...state,
                showMissing:state.allMissing[action.payload.index],
                showMissingModal:true
            }
        }
        else
        break;
        case hideMissing:
        return{
            ...state,
            showMissing:{},
            showMissingModal:false
        }
        case deleteMissing:
        let updatedMissing = state.missingPersons.filter((missing)=>missing.missingId!==action.payload)
        return{
            ...state,
            missingPersons:updatedMissing
        }
        case countURLS:
        let urls = state.missingPersons[action.payload].downlaodUrls.length
        return{
            ...state,
            URLS:urls
        }
        case showAllMissing:
        return{
            ...state,
            allMissing:[...state.allMissing,action.payload]
        }
        default:
            return state
    }
}