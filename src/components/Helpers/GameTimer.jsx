import React, { useEffect, useState } from 'react';
import { formatTime } from './../../Formater/formatTime';
import { Link } from 'react-router-dom';
import errorPicture from '../../images/error.png'

const GameTimer = (props) => {
    const [seconds, setSeconds] = useState(props.seconds);
    const [winner, setWinner] = useState(props.winner)
    console.log(setWinner)
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0 && !winner) {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds, winner]);

    if (props.seconds === undefined || props.mines === undefined || props.flags === undefined) {
        return (
            <div className="game-timer__error">
                <img src={errorPicture} className='error-picture' alt='Ошибка!'/>
                <h1>Ой! Что-то произошло не так!</h1>
                <Link to='/'>Вернуться назад</Link>
            </div>
        );
    }

    return (
        <div className='game-timer'>
            <h2>Количество мин: {props.mines}</h2>
            <h1>{formatTime(seconds)}</h1>
            <h2>Осталось флажков: {props.flags}</h2>
        </div>
    );
}

export default GameTimer;
