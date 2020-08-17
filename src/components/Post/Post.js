import React, { useCallback, useEffect, useRef, useState, useContext } from 'react'
import { withRouter } from 'react-router-dom';
import Textarea from 'react-expanding-textarea'
import { AuthContext } from '../Auth/AuthContext';
import { Modal } from 'antd';
import Auth from '../Auth/Auth';
import { fetchAddAnswers } from './../../data/api'
import Animator from '../Animate/Animator';

const Post = props => {

    const [symbols, changeSymbols] = useState(0)
    const [modalVisible, changeVisible] = useState(false)
    const [timer, setTimer] = useState(0)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const auth = useContext(AuthContext)

    const userSymbols = auth.user ? auth.user.symbols : 1100
    const userTimer = auth.user ? auth.user.timer : 16

    

    useEffect(() => {
        const getTitle = async () => {
            if (props.match.params.id === '0') {
                setTitle('Фрирайтинг')
            } else {
                console.log('ques', props.questions, props.match.params.id)
                // if (!props.questions.some(item => item.id === +props.match.params.id)) {
                //     throw console.error('dfdf');
                // }
                setTitle(props.questions.find(item => item.id === +props.match.params.id).name)
            }
        }
        getTitle()
    }, [props.match.params.id, props.questions])

    useEffect(() => {
        const postTimer = setInterval(() => setTimer(prevState => prevState + 1), 60000)
        return () => clearInterval(postTimer)
    }, [])

    
    useEffect(() => {
        textareaRef.current.focus()
    }, [])

    const textareaRef = useRef(null)

    const handleChange = useCallback(e => {
        setText(e.target.value)
        changeSymbols(e.target.value.length)
    }, [])

    const clickHandler = () => {
        if (!auth.isAuthenticated) {
            changeVisible(true)
        } else {
            const date = new Date()
            fetchAddAnswers(auth.userId, title, text, date)
            props.getQuestions()
            props.history.push("/")
        }

    }

    const handleCancel = e => {
        changeVisible(false)
    };




    return (
        <>
            <Animator>
                <h2>{title ? title : null}</h2>
                <Textarea
                    className="textarea"
                    id="my-textarea"
                    maxLength="3000"
                    name="pet[notes]"
                    onChange={handleChange}
                    placeholder="Только начни печатать..."
                    ref={textareaRef}
                />
            </Animator>
            <div className="panel">
                {/* <Button onClick={clickHandler}>Сохранить</Button> */}
                <button onClick={clickHandler}>Сохранить</button>
                <div className="panel_numbers">
                    {/* <span>{symbols}/2 000 сим.</span> */}
                    <span
                        className={symbols > userSymbols ? 'done' : 'undone'}
                    >
                        {`${symbols}/${userSymbols} сим.`}
                    </span>
                    <span
                        className={timer > userTimer ? 'done' : 'undone'}
                    >{`${timer}/${userTimer} мин.`}</span>
                    {/* <span>{timer}/15 мин.</span> */}
                </div>
            </div>

            <Modal                
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Auth />
            </Modal>
        </>

    )
}

export default withRouter(Post)