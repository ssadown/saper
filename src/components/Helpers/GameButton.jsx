import React, { useContext } from 'react';
import Mine from '../../images/mine.svg'
import Flag from '../../images/flag.svg'
import { gameSettingsContext } from '../../contexts/Context';

const GameButton = (props) => {
    const gameContext = useContext(gameSettingsContext)
    const gameSettings = gameContext.gameSettings
    const square = props.square
    const squares = props.squares

    const squareClick = () => {
        if (square.isMined) {
            gameContext.setGameSettings({
                ...gameSettings, winner: false
            })
        }
        if (!square.isMined) {
            props.setNotMinedBlock((prevNumber) => prevNumber - 1)
        }
        const { row, col } = square;
        const neighbors = [
            { row: row - 1, col: col - 1 },
            { row: row - 1, col: col },
            { row: row - 1, col: col + 1 },
            { row: row, col: col - 1 },
            { row: row, col: col + 1 },
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col },
            { row: row + 1, col: col + 1 },
        ];
        let minesCount = 0;
        neighbors.forEach(neighbor => {
            const {row , col } = neighbor
                const neighborSquare = squares.find(el => el.row === row && el.col === col);
                if (neighborSquare === undefined) {
                    return
                }
                if (neighborSquare.isMined) {
                    minesCount++;
                }
        })
        
        let updatedSquares = squares.map(s => {
            if (s.id === square.id) {
                return { ...s, isRevealed: true, value: minesCount };
            }
            return s;
        });
        props.setSquares(updatedSquares);
    };

    const firstSquareClick = () => {
        let totalMines = 0;
        let minedSquares = squares;

        minedSquares[square.id - 1].isRevealed = true

        while (totalMines < gameSettings.mines) {
            let randomSquareId = Math.floor(Math.random() * (minedSquares.length - 1) + 1);

            if (minedSquares[randomSquareId].isMined === true) {
            } else if (minedSquares[randomSquareId].isMined === false && minedSquares[randomSquareId].isRevealed === false) {
                minedSquares[randomSquareId].isMined = true;
                totalMines++;
            }
        }
        props.setSquares(minedSquares);
        props.setFirstClick(false);
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i].isMined) {
                props.setNotMinedBlock((prevNumber) => prevNumber + 1)
            }
        }
        squareClick()
};
    const contextMenuOff = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
        const flagClick = () => {
                let updatedSquares = squares.map((s) => {
                    if (s.id === square.id && !square.isFlagged && !gameSettings.winner) {
                        if (props.flags > 0) {
                            props.setFlags((prevFlags) => prevFlags - 1);
                            if (square.isMined) {
                            props.setMines((prevMines) => prevMines - 1);
                            gameContext.setGameSettings((prevSettings) => ({
                                ...prevSettings,
                                mines: prevSettings.mines - 1,
                            }));
                            }
                            gameContext.setGameSettings((prevSettings) => ({
                            ...prevSettings,
                            flags: prevSettings.flags - 1,
                            }));
                            return { ...s, isRevealed: true, isFlagged: true };
                        }
                    } else if (s.id === square.id && square.isFlagged && !gameSettings.winner) {
                        props.setFlags((prevFlags) => prevFlags + 1);
                        if (square.isMined) {
                        props.setMines((prevMines) => prevMines + 1);
                        gameContext.setGameSettings((prevSettings) => ({
                            ...prevSettings,
                            mines: prevSettings.mines + 1,
                        }));
                        }
                        gameContext.setGameSettings((prevSettings) => ({
                        ...prevSettings,
                        flags: prevSettings.flags + 1,
                        }));
                        return { ...s, isRevealed: false, isFlagged: false };
                    }
                    return s;
                    });
                    props.setSquares(updatedSquares);
        };
        
    
    return (
        <button 
            onContextMenu={contextMenuOff} 
            onAuxClick={flagClick} 
            className={square.isMined && square.isRevealed ? 'game-button__mine-revelead' : square.isRevealed ? 'game-button__revelead': 'game-button'} 
            disabled={square.isRevealed || gameContext.gameSettings.winner === false || square.isFlagged || gameContext.gameSettings.winner === true} 
            onClick={props.firstClick ? firstSquareClick : squareClick}
        >    
            {   
                square.isFlagged ?
                <img className={square.isRevealed ? 'game-board__mine' : 'game-board__mine-hidden'} 
                src={Flag} alt='flag'/> :
                square.isMined ?
                <img className={square.isRevealed ? 'game-board__mine' : 'game-board__mine-hidden'} 
                src={Mine} alt='mine'/> : 
                square.value === 0 ? '' :
                square.value 
                }
        </button>
    );
}

export default GameButton;
