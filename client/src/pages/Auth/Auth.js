import style from './Auth.module.scss'
import React, {useCallback, useContext} from 'react'
import {NavLink, useLocation, useHistory} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../../utils/consts'
import {login, registration} from '../../http/userAPI'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import FormsControls from '../../components/common/FormsControls/FormsControls'
import * as yup from 'yup'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const schema = yup.object().shape({
        email: yup.string()
            .email('Invalid email')
            .required('required'),
        password: yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(12, 'Must be 12 characters or less')
            .required('required'),

    })

    const inputs = [
        {
            nameInput: 'email',
            typeInput: 'input',
            initialValues: '',
            id: '',
            placeholder: 'Введите ваш email...'
        },
        {
            nameInput: 'password',
            typeInput: 'input',
            initialValues: '',
            id: '',
            placeholder: 'Введите ваш password...'
        },
    ]

    const submitSetLogin = useCallback(async (values) => {
            const {email, password} = values
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
    }, [history, isLogin, user])

    return (
        <div className='container'>
            <section className={style.authBox}>
                <div className={style.form}>
                    <h2 className={style.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <div>
                        <FormsControls inputs={inputs} createAction={submitSetLogin} schema={schema} nameButton={isLogin ? 'Войти' : 'Регистрация'} />
                    </div>
                </div>
                <div className={style.isAccount}>
                    {isLogin ?
                        <div>
                            Нет аккаунта?
                            <NavLink className={style.link} to={REGISTRATION_ROUTE}>
                                Зарегистрируйся
                            </NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт?
                            <NavLink className={style.link} to={LOGIN_ROUTE}>
                                Войдите
                            </NavLink>
                        </div>
                    }
                </div>
            </section>
        </div>
    )
})

export default Auth
