import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import logo from './../../assets/logo.png'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Menu = () => {

    const auth = useContext(AuthContext)

    return (
        <nav className='menu'>
            <div className="menu_left">
                <NavLink to='/'><img className='logo' src={logo} alt='logo' /></NavLink>
                <NavLink to='/'>Вопросы</NavLink>
                <NavLink to='/answers'>Ответы</NavLink>
            </div>
            <div className='menu_right'>
                {
                    auth.isAuthenticated
                        ? <NavLink to='/profile'><Avatar icon={<UserOutlined />} /></NavLink>
                        : <NavLink to='/auth'>Регистрация</NavLink>
                }

            </div>

        </nav>
    )
}

export default Menu