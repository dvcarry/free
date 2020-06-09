import React, { useCallback, useEffect, useRef, useState, useContext } from 'react'
import { withRouter } from 'react-router-dom';
import Panel from './Panel';
import Textarea from 'react-expanding-textarea'
import { AuthContext } from '../Auth/AuthContext';
import { Button, Modal } from 'antd';
import Auth from '../Auth/Auth';

const Post = props => {

    const [symbols, changeSymbols] = useState(0)
    const [modalVisible, changeVisible] = useState(false)
    const auth = useContext(AuthContext)

    // temp data without server data
    const questions = [{ id: 1, title: 'Что делать?' }, { id: 2, title: 'Как делать' }]
    questions.push({ id: 0, title: 'Фрирайтинг' })
    const title = questions.find(item => item.id == props.match.params.id).title

    const textareaRef = useRef(null)

    const handleChange = useCallback(e => {
        changeSymbols(e.target.value.length)
        // console.log('Changed value to: ', e.target.value.length)
    }, [])

    const clickHandler = () => {
        if (!auth.isAuthenticated) {
            changeVisible(true)
        }
    }

    const handleOk = e => {

    };

    const handleCancel = e => {
        changeVisible(false)
    };

    useEffect(() => {
        textareaRef.current.focus()
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <Textarea
                className="textarea"
                id="my-textarea"
                maxLength="3000"
                name="pet[notes]"
                onChange={handleChange}
                placeholder="Только начни печатать..."
                ref={textareaRef}
            />
            <div className="panel">
                <Button onClick={clickHandler}>Save</Button>
                <div className="panel_numbers">
                    <span>{symbols}</span>
                    <span>55</span>
                </div>
            </div>
            <Modal
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                >
                <Auth />
            </Modal>


            {/* <Panel symbols={symbols} /> */}
        </div>
    )
}

export default withRouter(Post)