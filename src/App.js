import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Post from './components/Post/Post';
import Home from './components/Home';
import Menu from './components/Layout/Menu';
import Auth from './components/Auth/Auth';
import { BrowserRouter } from "react-router-dom";
import { useAuth } from './components/Auth/authHook';
import { AuthContext } from './components/Auth/AuthContext';

function App() {

    const { token, userId, login, logout } = useAuth()
    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
            <BrowserRouter>
                <Menu />
                <div className="App" >
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/post/:id' component={Post} />
                        <Route path='/auth' component={Auth} />
                        <Route render={ () => <h1>404 not found</h1>} />
                        <Redirect to={"/"} />
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}

export default App;