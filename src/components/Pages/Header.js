import React from 'react';
import { useAuth } from '../Auth/authHook';
import picture from './../../assets/main.png'

const Header = () => {

    const { userId } = useAuth()

    if (userId) return <h1>Выбери вопрос на сегодня</h1>

    return (
        <section className='section_main'>
            <div>
                <h1>Узнай себя<br />с помощью фрирайтинга</h1>
                <div className='subheader'>
                    <p>
                        Получай каждый день два новых вопроса на выбор либо пиши на свободную тему.
                        Ставь себе минимальные ограничители по времени или количеству знаков.
                        Следи за историей своих текстов и других участников.
                </p>
                </div>
            </div>
            
            <img className='img_main' src={picture} />

        </section>
    )
}

export default Header