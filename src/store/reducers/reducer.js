import { 
    login,
    logout,
    insertCrime
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:false,
    userName:'',
    crimes:[]
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return{
            ...state,
            isLoggedIn:true,
            userName:action.payload
        }
       
        case logout:
        return {
            ...state,
            isLoggedIn:false,
            userName:''
        }
        case insertCrime:
        return{
            ...state,
            crimes:[...state.crimes,action.payload]
        }
        default:
        return state
    }
}
