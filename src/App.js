import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Post from './components/Post/Post';
import Home from './components/Pages/Home';
import Menu from './components/Layout/Menu';
import Auth from './components/Auth/Auth';
import { BrowserRouter } from "react-router-dom";
import { useAuth } from './components/Auth/authHook';
import { AuthContext } from './components/Auth/AuthContext';
import { useState } from 'react';
import { fetchTodayQuestions } from './data/api';
import { AnimatePresence } from 'framer-motion';
import { History } from './components/History/History';
import { Read } from './components/Post/Read';
import { Profile } from './components/Auth/Profile';
import { About } from './components/Layout/About';
import { Policy } from './components/Pages/Policy';

function App() {

    const [questions, setQuestions] = useState(null)
    const { token, userId, login, logout, user } = useAuth()
    const isAuthenticated = !!token

    const getQuestions = async () => {
        const { data: allQuestions } = await fetchTodayQuestions(userId)
        setQuestions(allQuestions)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <AuthContext.Provider value={{ token, userId, login, logout, user, isAuthenticated }}>
            <BrowserRouter>
                <Menu />
                <div className="App" >
                    <AnimatePresence>
                        <Switch>
                            <Route exact path='/' render={() => <Home questions={questions} />} />
                            <Route path='/post/:id' render={() => <Post questions={questions} getQuestions={getQuestions}/>} />
                            <Route path='/answers' render={() => <History />} />
                            <Route path='/posts/:post_id' render={() => <Read />} />
                            <Route path='/auth' component={Auth} />
                            <Route path='/profile' component={Profile} />
                            <Route path='/about' component={About} />
                            <Route path='/policy' component={Policy} />
                            <Route render={() => <h1>404 not found</h1>} />
                            <Redirect to={"/"} />
                        </Switch>
                    </AnimatePresence>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;