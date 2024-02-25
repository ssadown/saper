import React, { useContext, useEffect, useState } from 'react';
import { formatTime } from './../../Formater/formatTime';
import { Link } from 'react-router-dom';
import errorPicture from '../../images/error.png'
import { currentUserContext, gameSettingsContext, leaderDashboardContext } from '../../contexts/Context';

const GameTimer = () => {
    const gameContext = useContext(gameSettingsContext)
    const leaderDashboard = useContext(leaderDashboardContext)
    const [seconds, setSeconds] = useState(gameContext.gameSettings.gameTime);
    const winner = gameContext.gameSettings.winner
    const flags = gameContext.gameSettings.flags
    const mines = gameContext.gameSettings.mines
    const gameStart = gameContext.gameSettings.gameStart
    const currentUser = useContext(currentUserContext)

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
    });
    useEffect(() => {
        if (winner === true) {
            let userRecord = JSON.parse(localStorage.getItem('leaderDashboard'));
            console.log(userRecord);
            const updatedUserRecord = userRecord.map(user => {
            if (user.id === currentUser.user.id && user.timeEasy < seconds) {
                if (gameContext.gameSettings.level === 1) {
                    return {...user, timeEasy: seconds};
                } else if (gameContext.gameSettings.level === 2 && user.timeMid < seconds) {
                    return {...user, timeMid: seconds};
                } else if (gameContext.gameSettings.level === 3 && user.timeHard < seconds) {
                    return {...user, timeHard: seconds};
                }
            }
            return user;
            });
            leaderDashboard.setLeaderDashboard(updatedUserRecord)
            localStorage.setItem('leaderDashboard', JSON.stringify(updatedUserRecord));
        }
    })

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
                {winner === false || winner === null ?
                    <h2 className={winner === null ? 'game-board__winner-null' : 'game-board__winner-lose'}>Вы проиграли!</h2> 
                    :
                    <h2 className='game-board__winner-win'>Вы победили!</h2>}
                <h1>{formatTime(seconds)}</h1>
                {winner === false || winner === true ?
                    <Link to='/' className='try-again'>Ещё раз</Link> :
                    <h2>Осталось флажков: {flags.toString().padStart(2, '0')}</h2>
                }
            </div>
        );
    }
}

export default GameTimer;
