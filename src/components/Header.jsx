import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { currentUserContext, loginContext } from '../contexts/Context';

const Header = () => {
    const login = useContext(loginContext)
    const userInfo = useContext(currentUserContext)
    
    const exitFromGame = () => {
        login.setLogin(false)
        userInfo.setUser({})
        localStorage.removeItem('login')
        localStorage.removeItem('currentUser')
    }
    return (
        <header>
            <h2>{userInfo.user.userName}</h2>
            <Link className='header-link' to='/'>Играть</Link>
            <Link className='header-link' to='/leader'>Таблица лидеров</Link>
            <Link to='/' className='header-link__button'><button className="classic-button" onClick={exitFromGame}>Выйти</button></Link>
        </header>
    );
}

export default Header;
