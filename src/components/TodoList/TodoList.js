
import React, { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { connect } from 'react-redux'
import * as actions from './../../actions/index'

function TodoList(props) {
    const [typeSort, setTypeSort] = useState(1)
    const [valueSearch, setValueSearch] = useState('')
    const [onSearch, setOnSearch] = useState(false)
    useEffect(() => {
        props.onCallApiFetchData();
    }, [])
    function handleSort() {
        // console.log('a')
        props.onSortTodo(props.tasks, typeSort)
        setTypeSort(-typeSort)
    }
    function handleSearch(e) {
        e.preventDefault()
        props.onSearch(props.tasks, valueSearch)
        setOnSearch(true)
        setValueSearch('')
    }
    return (

        <div>
            <div className="margin-bottom-20">
                <button type="button" className="btn btn-default btn-sort" onClick={handleSort}>Sort by name</button>

                <form className="flex margin-top-20px" onSubmit={(e) => handleSearch(e)}>
                    <div className="form-group cover-input-search">
                        <input type="text" className="form-control" id="" placeholder="Search by name" onChange={(e) => setValueSearch(e.target.value)} value={valueSearch} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>

            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Todo List</h3>
                </div>

                <div className="panel-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã</th>
                                <th>Tên</th>
                                <th>Trạng Thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                onSearch ?
                                    props.listSearch.map((value, index) => {
                                        return (
                                            <TodoItem key={value.id} index={index + 1} id={value.id} name={value.name} status={value.isDone} />
                                        )
                                    }) :
                                    props.tasks.map((value, index) => {
                                        return (
                                            <TodoItem key={value.id} index={index + 1} id={value.id} name={value.name} status={value.isDone} />
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                onSearch ? <button onClick={() => setOnSearch(false)}>Trở về</button> : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.task,
        listSearch: state.listTodoAfterSearch
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCallApiFetchData: () => {
            dispatch(actions.callApiGetItem())
        },
        onSortTodo: (data, typeSort) => {
            dispatch(actions.SortTodo(data, typeSort))
        },
        onSearch: (data, input) => {
            dispatch(actions.SearchListTodo(data, input))
        }
        // onCallApiUpdateStatus: () => {
        //     dispatch(actions.callApiUpdateStatus(item))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)