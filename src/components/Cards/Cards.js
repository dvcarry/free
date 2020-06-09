import React from 'react';
import Card from './Card';
import { withRouter } from 'react-router-dom';

const Cards = props => {
    
    const questions = [{id: 1, title: 'Что делать?'}, {id: 2, title: 'Как делать'}]
    questions.push({id: 0, title: 'Фрирайтинг'})

    const createPost = id => {
        props.history.push('/post/' + id)
    }

    const questionsPool = questions.map(item => <Card key={item.id} title={item.title} click={() => createPost(item.id)}/>)

    return (
        <div className='cards'>
            {questionsPool}
        </div>
    )
}

export default withRouter(Cards)