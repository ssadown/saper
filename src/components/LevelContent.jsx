import React, { useContext } from 'react';
import LevelButton from './Helpers/LevelButton';
import { gameSettingsContext } from '../contexts/Context';
import { Link } from 'react-router-dom';

const LevelContent = () => {
    const gameContext = useContext(gameSettingsContext)

    return (
        <div className="wrapper-main">
            <div className="block-level__choose">
                <h2>Выберите сложность</h2>
                <LevelButton onClick={() => {             
                gameContext.setGameSettings({
                rows: 8,
                columns: 8,
                winner: null,
                gameTime: 600,
                mines: 10,
                flags: 10,
                level: 1,
                gameStart: false,
                setWin: false
            })}} buttonText="Легкий"/>
                <LevelButton onClick={() => {           
                gameContext.setGameSettings({
                rows: 16,
                columns: 16,
                winner: null,
                gameTime: 2400,
                mines: 60,
                flags: 60,
                level: 2,
                gameStart: false,
                setWin: false
            })}} buttonText="Средний"/>
                <LevelButton onClick={() => {
                gameContext.setGameSettings({
                rows: 32,
                columns: 32,
                winner: null,
                gameTime: 6000,
                mines: 100,
                flags: 100,
                level: 3,
                gameStart: false,
                setWin: false
            })}} buttonText="Сложный"/>
            <Link className='text-href' to='/custom'>Свой уровень</Link>
            </div>
        </div>
    );
}

export default LevelContent;
