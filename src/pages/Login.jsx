import React, { useContext, useEffect, useState } from 'react';
import { currentUserContext, loginContext } from '../contexts/Context';
import { leaderDashboardContext } from './../contexts/Context';

const Login = () => {
    const [username, setUsername] = useState('')
    const [inputError, setInputError] = useState(false)
    const isLogin = useContext(loginContext)
    const userInfo = useContext(currentUserContext)
    const leaderDashboard = useContext(leaderDashboardContext)

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }
    const loginInGame = () => {
        if (username === '') {
            setInputError(true)
            return
        }
        if (leaderDashboard.leaderDashboard.length === 0) {
            userInfo.setUser({
                userName: username,
                id: Math.floor(Math.random() * (99999 - 10000) + 10000),
                timeEasy: 0,
                timeMid: 0,
                timeHard: 0
            })
            leaderDashboard.setNewUser(true)
            setInputError(false)
        } else {
            for (let i = 0; i < leaderDashboard.leaderDashboard.length; i++) {
                if (username === leaderDashboard.leaderDashboard[i].userName) {
                    userInfo.setUser({
                        userName: leaderDashboard.leaderDashboard[i].userName,
                        id: leaderDashboard.leaderDashboard[i].id,
                        timeEasy: leaderDashboard.leaderDashboard[i].timeEasy,
                        timeMid: leaderDashboard.leaderDashboard[i].timeMid,
                        timeHard: leaderDashboard.leaderDashboard[i].timeHard,
                    });
                    leaderDashboard.setNewUser(false) 
                    setInputError(false)
                    break; 
                } else {
                    userInfo.setUser({
                        userName: username,
                        id: Math.floor(Math.random() * (99999 - 10000) + 10000),
                        timeEasy: 0,
                        timeMid: 0,
                        timeHard: 0
                    })
                    leaderDashboard.setNewUser(true)
                    setInputError(false)
                }
            }
        }
    }
    useEffect(() => {
        if (Object.keys(userInfo.user).length !== 0) {
            localStorage.setItem('currentUser', JSON.stringify(userInfo.user))
            if (leaderDashboard.isNewUser) {
                leaderDashboard.leaderDashboard.push(userInfo.user)
                localStorage.setItem('leaderDashboard', JSON.stringify(leaderDashboard.leaderDashboard))
            }
            isLogin.setLogin(true)
            localStorage.setItem('login', true)
        }
    })
    
    return (
        <div className='wrapper'>
            <h1>Страница входа</h1>
            <input type="text" placeholder='Логин' className='login-input' value={username} onChange={changeUsername}/>
            <p className={inputError ? 'error-text' : 'error-text__off'}>Вы не ввели имя пользователя!</p>
            <button className='classic-button' onClick={loginInGame}>Войти</button>
        </div>
    );
}

export default Login;
