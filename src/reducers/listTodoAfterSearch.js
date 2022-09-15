import * as types from '../constans/ConfigType'



var initialState = []

var myReducers = (state=initialState,action) => {
    switch(action.type) {
        case types.SEARCH_LIST_TODO:
            state = action.data.filter((value) => {
                if(value.name === action.input){
                    // console.log('ok')
                    return  value
                }else{
                    return null
                }
            })
            console.log(state)
            return [...state]
        default : return state
    }
}

export default myReducers