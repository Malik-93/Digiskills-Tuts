import { combineReducers } from 'redux';
import { TodoReducer } from "../Reducers/todo-reducer";

const rootReducer = combineReducers({ TodoReducer })

export default rootReducer
