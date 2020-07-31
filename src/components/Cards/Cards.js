import React from 'react';
import Card from './Card';
import { withRouter } from 'react-router-dom';
import Animator from '../Animate/Animator';

const Cards = props => {

    const cards = [...props.questions, { id: 0, name: 'Фрирайтинг' }]

    const createPost = id => {
        props.history.push('/post/' + id)
    }

    const questionsPool = cards.map(item => <Card key={item.id} title={item.name} click={() => createPost(item.id)} />)

    return (
        <Animator>
            <div className='cards'>
                {questionsPool}
            </div>
        </Animator>

    )
}

export default withRouter(Cards)