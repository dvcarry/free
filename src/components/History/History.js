import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { fetchGetAnswers } from '../../data/api';
import { Answer } from './Answer';

export const History = () => {

    const [answers, setAnswers] = useState(null)
    const [loading, setLoading] = useState(false)
    console.log("History -> answers", answers)

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
            {
                answers 
                ? answers.map(item => <Answer {...item}/>)
                : <p>Нет ни одной записи. Стоит только начать.</p>
            }
        </div>
    )
}