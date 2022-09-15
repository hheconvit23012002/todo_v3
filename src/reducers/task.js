import * as types from "../constans/ConfigType"


var initialState = []

var findIndex = (list,id) =>{
    var result =-1;
    list.forEach((item,index)=> {
        if(item.id === id) {
            result = index
        }
    });
    return result
}

var myReducers = (state=initialState,action) => {
    var index = -1
    switch(action.type) {
        case types.SHOW_ITEM:
            state = action.itemTodo
            return [...state]
        case types.DELETE_ITEM:
            index = findIndex(state,action.id)
            state.splice(index,1);
            return [...state]
        case types.UPDATE_STATUS:
            index = findIndex(state,action.id)
            var tmp = state[index]
            tmp.isDone = !state[index].isDone
            state[index] = tmp
            return [...state]
        case types.ADD_ITEM:
            state.push(action.item)
            return [...state]
        case types.EDIT_ITEM:
            state = state.map((value)=>{
                return value.id === action.task.id ? action.task : value
            })
            return [...state]
        case types.SORT_TODO:
            // console.log('b')
            state = action.tasks
            state.sort((a,b) =>{return a.name > b.name ? action.typeSort : -action.typeSort})
            // console.log(action.typeSort)
            return [...state]
        default : return state
    }
}


export default myReducers

