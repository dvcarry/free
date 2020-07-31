import React from 'react';
import Header from './Header';
import Cards from './Cards/Cards';

const Home = ({ questions }) => {

    return (
        <>
            <Header />
            {
                questions && <Cards questions={questions} />
            }
        </>
    )
}

export default Home