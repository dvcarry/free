import React, { useEffect } from 'react';
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
import { useState } from 'react';
import { fetchTodayQuestions } from './data/api';
import { AnimatePresence } from 'framer-motion';
import { History } from './components/History/History';
import { Read } from './components/Post/Read';

function App() {

    const [questions, setQuestions] = useState(null)
    const { token, userId, login, logout, user } = useAuth()
    console.log("App -> userId", userId)
    const isAuthenticated = !!token


    const getQuestions = async () => {
        const { data: allQuestions } = await fetchTodayQuestions(userId)
        setQuestions(allQuestions)
    }

    useEffect(() => {
        // const getQuestions = async () => {
        //     const { data: allQuestions } = await fetchTodayQuestions(userId)
        //     console.log("getQuestions -> allQuestions", allQuestions)
        //     setQuestions(allQuestions)
        // }
        getQuestions()
    }, [userId])




    return (
        <AuthContext.Provider value={{ token, userId, login, logout, user, isAuthenticated }}>
            <BrowserRouter>
                <Menu />
                <div className="App" >
                    <AnimatePresence>
                        <Switch
                            // location={location}
                            // key={location.pathname}
                        >
                            <Route exact path='/' render={() => <Home questions={questions} />} />
                            <Route path='/post/:id' render={() => <Post questions={questions} getQuestions={getQuestions}/>} />
                            <Route path='/answers' render={() => <History />} />
                            <Route path='/posts/:post_id' render={() => <Read />} />
                            <Route path='/auth' component={Auth} />
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