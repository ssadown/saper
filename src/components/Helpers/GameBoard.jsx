import React, { useContext, useEffect, useState } from 'react';
import { gameSettingsContext } from '../../contexts/Context';
import GameButton from './GameButton';

const GameBoard = () => {
    const gameContext = useContext(gameSettingsContext)
    const [squares, setSquares] = useState([])

    useEffect(() => {
        if (squares.length < gameContext.gameSettings.columns * gameContext.gameSettings.rows) {
            for (let i = 0; i < gameContext.gameSettings.columns * gameContext.gameSettings.rows; i++) {
                setSquares(prevSquares => [
                    ...prevSquares,
                    {
                        id: i + 1,
                        isMined: Math.random() < gameContext.gameSettings.mines / 100,
                        isRevealed: false,
                        isFlagged: false,
                      // Добавьте другие свойства по мере необходимости
                    }
                ]);              
            }
        }
    }, [gameContext.gameSettings.columns, gameContext.gameSettings.rows, squares, gameContext.gameSettings.mines])

    return (
        <div className="game-board-content">
            <div className='game-board' style={{
            gridTemplateColumns: `repeat(${gameContext.gameSettings.columns}, 1fr)`,
            gridTemplateRows: `repeat(${gameContext.gameSettings.rows}, 1fr)`}}
            >
                {squares.map((square) => {
                    return(
                        <GameButton key={square.id} value={square.isMined ? 'mine' : 'no'} onClick={null}/>
                    )
                })}
            </div>
        </div>
    );
}

export default GameBoard;
