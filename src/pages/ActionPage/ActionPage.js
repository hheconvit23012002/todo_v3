import React, { useEffect, useState } from "react";
import * as actions from './../../actions/index'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function ActionPage(props) {
    // console.log(props.itemEditing)
    var location = useLocation()
    let param = useParams();
    const [inputText, setInputText] = useState('')
    const [inputCheck, setInputCheck] = useState(false)
    const [inputLevel, setInputLevel] = useState(1)
    const [inputDate, setInputDate] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (param.id) {
            setInputText(() => { return props.itemEditing.name })
            setInputCheck(() => { return props.itemEditing.isDone })
            setInputLevel(() => { return props.itemEditing.level})
            setInputDate(() => { return props.itemEditing.deadline })
            // console.log(props.itemEditing.deadline.toString().substring(0, 16))
        } else {
            setInputText('')
            setInputCheck(false)
            setInputLevel(1)
            setInputDate("")
        }
    }, [location])
    
    // useEffect(() => {
    //     async function fetchData() {
    //         if (param.id) {
    //         props.onChooseItemEdit(param.id)
    //             // setInputText(() => { return props.itemEditing.name })
    //             // setInputCheck(() => { return props.itemEditing.isDone })
    //         }
    //          else {
    //             setInputText('')
    //             setInputCheck(false)
    //         }
    //     }
    //     fetchData()
    // }, [])


    const onChange = (e) => {
        if (e.target.type === 'text') {
            setInputText(e.target.value)
        } else if(e.target.type === "checkbox"){
            setInputCheck(e.target.checked)
        } else if(e.target.type === "datetime-local"){
            setInputDate(e.target.value)
        }
        else{
            setInputLevel(e.target.value)
        }
    }
    async function onSave(e) {
        e.preventDefault();
        var ok = 0
        if (param.id) {
            ok = await new Promise((resolve) => {
                resolve(
                    ok = props.onEditItem({
                        id: param.id,
                        name: inputText,
                        level:inputLevel,
                        deadline:inputDate,
                        isDone: inputCheck
                    })
                )
            })
        } else {
            ok = await new Promise((resolve) => {
                resolve(
                    ok = props.onCallApiAddItem({
                        name: inputText,
                        level:inputLevel,
                        deadline:inputDate,
                        isDone: inputCheck
                    })
                )
            })
        }
        // console.log(ok)
        if (ok) {
            alert(`thất bại! lỗi : ${ok}`)
        }
        else {
            if (confirm('Thành công')) { // eslint-disable-line

                navigate("../todolist")
            }
        }

    }

    function goBack() {

        navigate(-1)
        // let checkOut = true
        // if (textRef.current.value !== '' || checkRef.current.checked === true) {
        //     checkOut = false
        // }
        // if (checkOut === false) {
        //     if (confirm(`Bạn chưa lưu bạn có muốn thoát ra không`)) { // eslint-disable-line
        //         textRef.current.value = ''
        //         checkRef.current.checked = false
        //         navigate(-1)

        //     }
        // } else {
        //     navigate(-1)
        // }
    }

    // console.log('day nhe')
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <form onSubmit={(e) => onSave(e)}>
                <div className="form-group">
                    <label>Tên Sản Phẩm: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="txtName"
                        onChange={(e) => onChange(e)}
                        value={inputText}
                    // onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mức độ: </label>
                    <select value={inputLevel} onChange={(e) => onChange(e)}>
                        <option value={1}>Làm ngay</option>
                        <option value={2}>Từ từ</option>
                        <option value={3}>Không Làm cũng được</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Deadline: </label>
                    <input type="datetime-local" className="form-control" value={inputDate} onChange={(e) => onChange(e)}></input>
                </div>
                <div className="form-group">
                    <label>Trạng Thái: </label>
                </div>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="chkbStatus"
                            onChange={(e) => onChange(e)}
                            checked={inputCheck}
                        // onChange={this.onChange}
                        // checked={chkbStatus}
                        />

                    </label>
                </div>
                <div onClick={() => goBack()} className="btn btn-danger mr-10">
                    Trở Lại
                </div>
                <button type="submit" className="btn btn-primary">Lưu Lại</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCallApiAddItem: (item) => {
            dispatch(actions.callApiAddItem(item))
        },
        onChooseItemEdit: (id) => {
            dispatch(actions.callApiGetItemUpdate(id))
        },
        onEditItem: (item) => {
            dispatch(actions.callApiUpdateItem(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPage)