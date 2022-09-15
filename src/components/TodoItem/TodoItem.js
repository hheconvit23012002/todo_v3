import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import * as actions from './../../actions/index'
function TodoItem(props) {
    const { index, id, name, status } = props
    // console.log(index + ' '+ id + ' ' + name + ' ' + status)
    function onDelete(id) {
        if (confirm('Bạn chắc chắn muốn xóa chứ ?')) { // eslint-disable-line
            props.onCallApiDeleteItem(id)
        }
    }
    function onUpdateStatus(id,isDone){
        props.onCallApiUpdateStatus(id,!isDone)
    }
    function handleEdit(){
        props.onEditItem({id,name,isDone:status})
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{id}</td>
            <td style={{ textDecoration: status ? "line-through" : null }}>{name}</td>
            <td>
                <input type="checkbox" className="input-item" checked={status} onChange={() => onUpdateStatus(id,status)}></input>
            </td>
            <td className="flex">
                <Link
                    to={`/edit/id=${id}`}
                    className="btn btn-success mr-10"
                    onClick={handleEdit}
                >
                    Sửa
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(id)}
                >
                    Xóa
                </button>
            </td>
        </tr>
    )
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        onCallApiDeleteItem: (id) => {
            dispatch(actions.callApiDeleteItem(id))
        },
        onCallApiUpdateStatus: (id,isDone) => {
            dispatch(actions.callApiUpdateStatus(id,isDone))
        },
        onEditItem: (item) => {
            dispatch(actions.SearchItem(item))
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoItem)