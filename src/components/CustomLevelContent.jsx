import React, { useContext, useState } from 'react';
import { gameSettingsContext } from '../contexts/Context';
import LevelButton from './Helpers/LevelButton';

const CustomLevelContent = () => {
    const gameContext = useContext(gameSettingsContext)
    const [row, setRow] = useState(0)
    const [column, setColumn] = useState(0)
    const [mines, setMines] = useState(0)

    const checkValue = () => {
            gameContext.setGameSettings({
                rows: row,
                columns: column,
                winner: null,
                gameTime: 6000,
                mines: mines,
                flags: mines,
                level: 4,
                gameStart: false,
                setWin: false
            })
    }

    return (
        <div className='wrapper-main'>
            <div className="block-level__choose">
                <input className='custom-level__input' type="text" placeholder='Сколько строк?' value={row} onChange={(e) => {setRow(e.target.value)}}/>
                <input className='custom-level__input' type="text" placeholder='Сколько строк?' value={column} onChange={(e) => {setColumn(e.target.value)}}/>
                <input className='custom-level__input' type="text" placeholder='Сколько строк?' value={mines} onChange={(e) => {setMines(e.target.value)}}/>
                <LevelButton onClick={checkValue} buttonText="Принять!"/>
            </div>
        </div>
    );
}

export default CustomLevelContent;
