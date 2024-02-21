import React, { useContext, useEffect, useState } from 'react';
import { formatTime } from './../../Formater/formatTime';
import { Link } from 'react-router-dom';
import errorPicture from '../../images/error.png'
import { gameSettingsContext } from '../../contexts/Context';

const GameTimer = () => {
    const gameContext = useContext(gameSettingsContext)
    const [seconds, setSeconds] = useState(gameContext.gameSettings.gameTime);
    const winner = gameContext.gameSettings.winner
    const flags = gameContext.gameSettings.flags
    const mines = gameContext.gameSettings.mines
    const gameStart = gameContext.gameSettings.gameStart

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0 && winner === null && gameStart) {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
            if (seconds === 0) {
                gameContext.setGameSettings({
                    ...gameContext.gameSettings, winner: false
                })
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds, winner, gameStart, gameContext]);

    if (seconds === undefined || mines === undefined || flags === undefined) {
        return (
            <div className="game-timer__error">
                <img src={errorPicture} className='error-picture' alt='Ошибка!'/>
                <h1>Ой! Что-то произошло не так!</h1>
                <Link to='/'>Вернуться назад</Link>
            </div>
        );
    }
    else {
        return (
            <div className='game-timer'>
                {winner === false || winner === null ? <h2 className={winner === null ? 'game-board__winner-null' : 'game-board__winner-lose'}>Вы проиграли!</h2> : <h2 className='game-board__winner-win'>Вы победили!</h2>}
                <h1>{formatTime(seconds)}</h1>
                <h2>Осталось флажков: {flags}</h2>
            </div>
        );
    }
}

export default GameTimer;
