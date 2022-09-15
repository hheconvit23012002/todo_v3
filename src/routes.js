import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ListTodoPage from "./pages/ListTodoPage/ListTodoPage";
import ActionPage from "./pages/ActionPage/ActionPage";
const routes = [
    {
        id: 1,
        path: '',
        main : () => <HomePage />
    },
    {
        id: 2,
        path : '*',
        main : () => <NotFoundPage />
    },
    {
        id: 3,
        path : '/todolist',
        main : () => <ListTodoPage />
    },
    {
        id: 4,
        path : '/action',
        main : () => <ActionPage />
    },
    {
        id: 5,
        path : '/edit/id=:id',
        main : () => <ActionPage />
    }
]

export default routes