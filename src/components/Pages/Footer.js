import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className='footer'>
            <span><NavLink to='/policy'>Политика конфидициальности</NavLink></span>
            <span>dvcarry@gmail.com</span>
            <span>2020 FreePaper.ru</span>
        </div>
    )
}