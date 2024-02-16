import React from 'react';
import gifNotFound from '../images/404.gif'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='wrapper__page-not-found'>
            <img src={gifNotFound} alt='Страница не найдена!'/>
            <h1>Страница не найдена!</h1>
            <Link to='/'>Вернуться назад</Link>
        </div>
    );
}

export default PageNotFound;
