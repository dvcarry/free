import React from 'react';
import Animator from '../Animate/Animator';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const Answer = ({ question, text, user_id, date, url }) => {

    const history = useHistory()

    const clickHandler = () => {
        history.push('/posts/' + url)
    }

    return (
        <Animator>
            <div className='answer border' onClick={clickHandler}>
                <div>
                    {/* <span>{user_id}</span> */}
                    <Avatar icon={<UserOutlined />}/>
                    <span>{new Date(date).toLocaleDateString()}</span>

                </div>
                <h3>{question}</h3>
                <div className='answer_text'>{text}...</div>
            </div>
        </Animator>

    )
}