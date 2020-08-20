import React from 'react';
import { Landing } from './Landing';
import { Footer } from './Footer';
import { useAuth } from '../Auth/authHook';
import { Questions } from './Questions';

const Home = ({ questions }) => {

    const { userId } = useAuth()

    return (
        <>
            {
                userId
                    ? <Questions questions={questions} />
                    : (
                        <>
                            <Landing />
                            <Questions questions={questions} />
                            <Footer />
                        </>
                    )
            }
        </>
    )
}

export default Home