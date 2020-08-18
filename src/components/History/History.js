import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { fetchGetAnswers } from '../../data/api';
import { Answer } from './Answer';
import { NavLink } from 'react-router-dom';

export const History = () => {

    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(false)

    const auth = useContext(AuthContext)

    useEffect(() => {
        if (auth.userId) {
            setLoading(true)
            const getAnswers = async () => {
                const {data: answersData} = await fetchGetAnswers(auth.userId)
                setAnswers(answersData)
                setLoading(false)
            }
            getAnswers()
        }

    }, [auth.userId])    

    if (loading) return <p>...</p>

    return (
        <div>
            <p><NavLink to='/'>Перейти к вопросам</NavLink></p>
            {
                answers.length > 0
                ? answers.map(item => <Answer {...item}/>)
                : <p>Нет ни одной записи. Стоит только начать.</p>
            }
        </div>
    )
}