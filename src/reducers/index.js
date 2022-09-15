
import { combineReducers } from "redux";
import task from './task';
import itemEditing from './itemEditing'
import listTodoAfterSearch from './listTodoAfterSearch'
const myReducers = combineReducers({
    task,
    itemEditing,
    listTodoAfterSearch
})

export default myReducers