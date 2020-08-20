import React from 'react';
import Cards from '../Cards/Cards';

export const Questions = ({ questions }) => {
    return (
        <>
            <h1>Выбери вопрос на сегодня</h1>
            {
                questions && <Cards questions={questions} />
            }
        </>
    )
}