import reducer from './reducer'
import adminReducer from './adminReducer'
import { combineReducers } from "redux";

export default combineReducers({
    rootReducer:reducer,
    admin:adminReducer
})