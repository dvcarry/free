import React from 'react';
import { useAuth } from './Auth/authHook';

const Header = () => {

    const { userId } = useAuth()

    if (userId) return <h1>Выбери вопрос на сегодня</h1>

    return (
        <div>
            <h1>Узнай себя с помощью фрирайтинга</h1>
            <div className='subheader'>
                <p>
                    Получай каждый день два новых вопроса на выбор либо пиши на свободную тему.
                    Ставь себе минимальные ограничители по времени или количеству знаков.
                    Следи за историей своих текстов и других участников.
                </p>
                <p>
                    Выбери вопрос на сегодня.
                </p>
            </div>

        </div>
    )
}

export default Header