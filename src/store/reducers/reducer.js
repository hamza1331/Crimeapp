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
    showComplain:{}
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
        default:
            return state
    }
}