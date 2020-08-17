import React, { useState, useContext } from 'react';
import { addNewUser, login } from '../../data/api';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';


const Auth = () => {

    const auth = useContext(AuthContext)

    const history = useHistory()
    console.log("Auth -> history", history)
    const [page, changePage] = useState('reg')
    const [error, setError] = useState(null)

    const regHandler = async inputData => {
        setError(null)
        console.log("Auth -> inputData", inputData)
        try {
            const reply = await addNewUser(inputData)
            if (reply.data.error) {
                setError(reply.data.error)
            } else {
                loginHandler(inputData)
            }
            console.log("Auth -> reply", reply)
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const loginHandler = async inputData => {
        try {
            const user = await login(inputData)
            console.log("Auth -> user", user.data)
            auth.login(user.data.token, user.data.userId, user.data.user)
            const location = history.location.pathname
            if (location === '/reg' || location === '/auth') {           
                history.push('/')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const pageHandler = () => {
        if (page === 'reg') {
            changePage('auth')
        } else {
            changePage('reg')
        }
    }

    return (
        <div className='auth'>
            <div>
                <h2>{page === 'reg' ? 'Регистрация' : 'Авторизация'}</h2>
                {
                    page === 'reg' ? <p>Регистрация позволит сохранять свои истории.</p> : null
                }

            </div>

            <Form
                // wrapperCol={{ span: 10 }}
                onFinish={page === 'reg' ? regHandler : loginHandler}
                onFinishFailed={onFinishFailed}
                className="registration"
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Некорректный E-mail',
                        },
                        {
                            required: true,
                            message: 'Введите свой E-mail!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input size="large" placeholder="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Введите свой пароль' },
                        { min: 6, message: 'Пароль должен содержать минимум 6 символов' }
                    ]}
                    hasFeedback
                >
                    <Input.Password size="large" placeholder="пароль" />
                </Form.Item>
                {
                    error && <p className='text_medium'>Пользователь с такой почтой существует.</p>
                }


                <Form.Item>
                    {/* <button htmlType="submit">
                        {page === 'reg' ? 'Зарегистрироваться' : 'Войти'}
                    </button> */}
                    <Button block type="primary" htmlType="submit">
                        {page === 'reg' ? 'Зарегистрироваться' : 'Войти'}
                    </Button>

                </Form.Item>
                {
                    page === 'reg' && (
                        // <Form.Item>
                        //     <Checkbox>Согласен с условиями</Checkbox>
                        // </Form.Item>
                        <p className='text_small'>Нажимая кнопку «Зарегистрироваться», я принимаю условия Пользовательского соглашения</p>
                    )
                }
                <Button type="link" htmlType="button" onClick={pageHandler}>
                    {page === 'reg' ? 'Есть аккаунт?' : 'Нет аккаунта?'}
                </Button>

            </Form>
        </div>
    )
}

export default Auth