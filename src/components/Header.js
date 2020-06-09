import React, { useContext } from 'react';
import { AuthContext } from './Auth/AuthContext';

const Header = () => {

    const auth = useContext(AuthContext)

    return (
        <div>
            <h1>Пиши что хочешь</h1>
            <p>Каждый день два новых вопроса на выбор, либо пустые страницы</p>
        </div>
    )
}

export default Header