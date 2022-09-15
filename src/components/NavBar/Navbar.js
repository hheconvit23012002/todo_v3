import React from "react";
import { Link } from 'react-router-dom'
const menus = [
    {
        id: 1,
        to: '',
        name: 'Trang chủ'
    },
    {
        id: 2,
        to: '/todolist',
        name: 'Quản lý todo'
    },
    {
        id: 3,
        to: '/action',
        name: 'Thêm todo'
    },

]

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-inverse">
                <ul className="nav navbar-nav">
                    {
                        menus.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Link to={item.to} className='my-link'>{item.name}</Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </nav>
        </div>
    )
}

export default NavBar