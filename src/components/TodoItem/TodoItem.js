import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import * as actions from './../../actions/index'
import moment from 'moment'
function TodoItem(props) {
    const { index, id, name, level, deadline, status } = props
    useEffect(() => {
        const interval = setInterval(() => {
            var x = moment(new Date(deadline)).format()
            var timeCurrent = moment(new Date()).format()
            // console.log(x + ' ' + timeCurrent)
            if (x === timeCurrent) {
                props.onCallApiUpdateStatus(id, !status)

                alert("đến hạn")
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [deadline])
    // console.log(index + ' '+ id + ' ' + name + ' ' + status + ' ' + level)
    function onDelete(id) {
        if (confirm('Bạn chắc chắn muốn xóa chứ ?')) { // eslint-disable-line
            props.onCallApiDeleteItem(id)
        }
    }
    function onUpdateStatus(id, isDone) {
        props.onCallApiUpdateStatus(id, !isDone)
    }
    function handleEdit() {
        props.onEditItem({ id, name, level, deadline, isDone: status })
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{id}</td>
            <td style={{ textDecoration: status ? "line-through" : null }}>{name}</td>
            <td>
                <input type="checkbox" className="input-item" checked={status} onChange={() => onUpdateStatus(id, status)}></input>
            </td>
            <td style={{ textDecoration: status ? "line-through" : null }}>{
                (() => {
                    if (level === 1) {
                        return "Làm ngay"
                    } else if (level === 2) {
                        return "Từ từ"
                    } else {
                        return "Không làm cũng được"
                    }
                })()
            }</td>
            <td style={{ textDecoration: status ? "line-through" : null }}>{deadline}</td>
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
        onCallApiUpdateStatus: (id, isDone) => {
            dispatch(actions.callApiUpdateStatus(id, isDone))
        },
        onEditItem: (item) => {
            dispatch(actions.SearchItem(item))
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoItem)