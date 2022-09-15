import * as types from "../constans/ConfigType"
import ApiCaller from "../utill/ApiCaller"


export const  callApiGetItem = () => {
    return dispatch => {
        return  ApiCaller('items','GET',null).then(res => {
            dispatch(ShowItem(res.data))
            // console.log(res.data)
        })
    }
}


export const ShowItem = (itemTodo) => {
    return {
        type : types.SHOW_ITEM,
        itemTodo
    }
}

export const callApiDeleteItem = (id) => {
    return dispatch => {
        return ApiCaller(`items/${id}`,'DELETE',null).then(res => {
            dispatch(DeleteItem(id))
            // console.log(res.data)
        })
    }
}

export const DeleteItem = (id) => {
    return {
        type : types.DELETE_ITEM,
        id
    }
}


export const callApiUpdateStatus = (id,isDone) => {
    return dispatch => {
        return ApiCaller(`items/${id}`,'PUT',{isDone}).then(res => {
            dispatch(UpdateStatus(id))
            // console.log(res.data)
        })
    }
}

export const UpdateStatus = (id) => {
    return {
        type : types.UPDATE_STATUS,
        id
    }
}

export const callApiAddItem = (item) => {
    return dispatch => {
        return ApiCaller(`items`,'POST',item).then(res => {
            dispatch(AddItem(res.data))
        })
    }
}

export const AddItem = (item) => {
    return {
        type : types.ADD_ITEM,
        item
    }
}

export const callApiGetItemUpdate = (id) => {
    return dispatch => {
        return ApiCaller(`items/${id}`,'GET',null).then(res => {
            dispatch(SearchItem(res.data))
            console.log('chay day')
            // console.log(res.data)
        })
    }
}

export const SearchItem = (task) => {
    return {
        type: types.SEARCH_ITEM,
        task
    }
}

export const callApiUpdateItem = (item) => {
    return dispatch => {
        return ApiCaller(`items/${item.id}`,'PUT',item).then(res => {
            dispatch(EditItem(res.data))
        })
    }
}

export const EditItem = (task) => {
    return {
        type: types.EDIT_ITEM,
        task
    }
}


export const callApiSortTodo = (data) => {
    return dispatch => {
        return ApiCaller(`items`,'PUT',data).then(res => {
            dispatch(SortTodo(res.data))
        })
    }
}

export const SortTodo = (tasks,typeSort) => {
    return {
        type: types.SORT_TODO,
        typeSort,
        tasks
    }
}

export const SearchListTodo = (data,input) => {
    return {
        type : types.SEARCH_LIST_TODO,
        data,
        input
    }
}
