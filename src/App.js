
import './App.css';
import NavBar from './components/NavBar/Navbar';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import React  from 'react';
function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                {
                    routes.map((item) => {
                        return (
                            <Route key={item.id} path={item.path} element = {item.main()} />
                        )
                    })
                }
            </Routes>
        </div>
    );
}

export default App;
