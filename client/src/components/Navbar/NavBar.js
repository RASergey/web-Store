import style from './Navbar.module.scss'
import React, {useContext} from 'react'
import {Context} from '../../index'
import {NavLink} from 'react-router-dom'
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../../utils/consts'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user, device} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <header className={style.header}>
            <div className={'container'}>
                <div className={style.body}>
                    <NavLink
                        className={style.navLink}
                        onClick={() => {
                            device.setSelectedType(0)
                            device.setSelectedBrand(0)
                        }}
                        to={SHOP_ROUTE}
                    >
                        <h1>Купи Девайс</h1>
                    </NavLink>
                    {user.isAuth
                        ?
                        <div>
                            {user.user.role === 'ADMIN' ?
                                <button
                                    className={style.headerButton}
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </button> :
                                <div className={style.nameUser}>
                                    {user.user.email}
                                </div>
                            }
                            <button
                                className={style.headerButton}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </button>
                        </div>
                        :
                        <div>
                            <button
                                className={style.headerButton}
                                onClick={() => history.push(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
})

export default NavBar
