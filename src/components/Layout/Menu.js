import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { Button } from 'antd';

const Menu = () => {

    const auth = useContext(AuthContext)

    const clickHandler = () => {
        auth.logout()
    }

    return (
        <nav className='menu'>
            <div className="menu_left"><NavLink to='/'>Домой</NavLink></div>
            {
                auth.isAuthenticated 
                ? <Button type="link" onClick={clickHandler}>Выйти</Button>
                : <div className="menu_right"><NavLink to='/auth'>Регистрация</NavLink></div>
            }          
            
            {/* <div className="menu_right"><NavLink to='/auth'>{auth.isAuthenticated ? 'Выход' : 'Регистрация'}</NavLink></div> */}
        </nav>
    )
}

export default Menu