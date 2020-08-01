import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import logo from './../../assets/logo.png'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Menu = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    const clickHandler = () => {
        auth.logout()
        history.push('/')
    }

    return (
        <nav className='menu'>
            <div className="menu_left">
                <NavLink to='/'><img className='logo' src={logo} alt='logo'/></NavLink>
                <NavLink to='/answers'>История</NavLink>
            </div>
            {
                auth.isAuthenticated
                    // ? <button className='noborder' onClick={clickHandler}>Выйти</button>
                    ? <NavLink to='/profile'><Avatar icon={<UserOutlined />}/></NavLink>
                    : <div className="menu_right"><NavLink to='/auth'>Регистрация</NavLink></div>
            }
        </nav>
    )
}

export default Menu