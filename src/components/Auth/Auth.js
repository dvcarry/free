import React, { useState, useContext } from 'react';
import { addNewUser, login } from '../../data/api';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';


const Auth = () => {

    const auth = useContext(AuthContext)

    const history = useHistory()
    const [page, changePage] = useState('reg')

    const regHandler = async inputData => {
        try {
            await addNewUser(inputData)
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
            history.push('/')
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
        <>
            <h2>{page === 'reg' ? 'Регистрация' : 'Авторизация'}</h2>
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
                    page === 'reg' && (
                        <Form.Item>
                            <Checkbox>Согласен с условиями</Checkbox>
                        </Form.Item>
                    )
                }

                <Form.Item>
                    <button htmlType="submit">
                        {page === 'reg' ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                    <Button block type="primary" htmlType="submit">
                        {page === 'reg' ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Button type="link" htmlType="button" onClick={pageHandler}>
                        {page === 'reg' ? 'Есть аккаунт?' : 'Нет аккаунта?'}
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}

export default Auth