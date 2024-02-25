import React, { useContext, useEffect, useState } from 'react';
import { gameSettingsContext } from '../../contexts/Context';
import GameButton from './GameButton';

const GameBoard = () => {
    const gameContext = useContext(gameSettingsContext);
    const gameSettings = gameContext.gameSettings;
    const [squares, setSquares] = useState([])
    const [firstClick, setFirstClick] = useState(true);
    const [flags, setFlags] = useState(gameSettings.flags)
    const [mines, setMines] = useState(gameSettings.mines)
    const [notMinedBlock, setNotMinedBlock] = useState(null)

    const gameStart = () => {
        gameContext.setGameSettings({
            ...gameSettings, gameStart: true
        })
        let squaresArray = [];
        for (let i = 0; i < gameSettings.columns * gameSettings.rows; i++) {
            squaresArray.push({
                id: i + 1,
                isMined: false,
                isRevealed: false,
                isFlagged: false,
                value: 0,
                col: Math.floor((i % gameSettings.rows)),
                row: Math.floor((i / gameSettings.columns))
            });
        }
        setSquares(squaresArray)
    };
    
    useEffect(() => {
        if (!gameSettings.winner) {
            if (gameContext.gameSettings.mines === 0 || notMinedBlock === 0) {
                gameContext.setGameSettings((prevSettings) => ({
                    ...prevSettings,
                    winner: true
                }))
            }
        }
    })
    

    return (
        squares.length === 0 && gameSettings.columns !== undefined ?
        <div className="wrapper-main">
            <button className='game-board__button-start' onClick={gameStart}>Начать</button>
        </div>
        :
        <div className="game-board-content">
            <div className="game-board" style={{
                gridTemplateColumns: `repeat(${gameSettings.columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gameSettings.rows}, minmax(0, 1fr))`
                }}>
                    {squares.map(square => {
                        return (
                            <GameButton 
                            key={square.id} 
                            square={square} 
                            firstClick={firstClick} 
                            setFirstClick={setFirstClick}
                            squares={squares}
                            setSquares={setSquares}
                            setFlags={setFlags}
                            flags={flags}
                            setMines={setMines}
                            mines={mines}
                            notMinedBlock={notMinedBlock}
                            setNotMinedBlock={setNotMinedBlock}
                            />
                        )
                    })}
            </div>
        </div>
    );
}

export default GameBoard;
