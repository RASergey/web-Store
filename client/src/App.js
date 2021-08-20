import './App.scss'
import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter/AppRouter'
import Navbar from './components/Navbar/NavBar'
import {observer} from 'mobx-react-lite'
import {Context} from './index'
import {check} from './http/userAPI'

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <div className='spinner'></div>
    }

    return (
        <BrowserRouter>
            <div className='appMain'>
                <div className='navbar'>
                    <Navbar/>
                </div>
                <div className='appRouter'>
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    )
})

export default App
