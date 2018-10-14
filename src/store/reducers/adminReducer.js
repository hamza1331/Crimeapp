import {
adminLogin,
adminLogout
} from "../actions/actionNames";
const initialState = {
    adminLoggedIn:false,
    uid:''
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
        default:
            return state
    }
}