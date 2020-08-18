import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchGetAnswer } from '../../data/api';
import { useState } from 'react';
import Animator from '../Animate/Animator';

export const Read = () => {

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)

    const { post_id } = useParams()

    useEffect(() => {
        setLoading(true)
        const getAnswer = async () => {
            const { data } = await fetchGetAnswer(post_id)
            setPost(data)
            setLoading(false)
        }
        getAnswer(false)
    }, [post_id])

    if (loading) return <p>...</p>
    if (!post) return <p>...</p>

    return (
        <Animator>
            <h2>{post.question}</h2>
            <p>{post.text}</p>
        </Animator>
    )
}