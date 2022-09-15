import * as types from '../constans/ConfigType'


var data = JSON.parse(localStorage.getItem('isItemEdit'))

var initialState = data ? data : {
    id:null,
    name :'',
    isDone:false
}

var myReducers = (state=initialState,action) => {
    switch(action.type) {
        case types.SEARCH_ITEM:
            localStorage.setItem('isItemEdit',JSON.stringify(action.task))
            return action.task
        default : return state
    }
}

export default myReducers