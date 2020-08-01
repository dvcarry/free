import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';

export const Profile = () => {

    const auth = useContext(AuthContext)
    console.log("Profile -> auth", auth)
    const history = useHistory()

    const clickHandler = () => {
        auth.logout()
        history.push('/')
    }

    return (
        <div>
            <h2>Просто писатель</h2>
            <p>Почта: {auth.user && auth.user.email}</p>
            <p>Минимальное количество минут: {auth.user && auth.user.timer}</p>
            <p>Минимальное количество символов: {auth.user && auth.user.symbols}</p>
            <button onClick={clickHandler}>Выйти из профиля</button>
        </div>
    )
}