import React, { useContext } from 'react';
import LevelButton from './Helpers/LevelButton';
import { gameSettingsContext } from '../contexts/Context';

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
                winner: false,
                gameTime: 600,
                mines: 10,
                flags: 10,
                level: 1,
            })}} buttonText="Легкий"/>
                <LevelButton onClick={() => {           
                gameContext.setGameSettings({
                rows: 16,
                columns: 16,
                winner: false,
                gameTime: 2400,
                mines: 25,
                flags: 25,
                level: 2,
            })}} buttonText="Средний"/>
                <LevelButton onClick={() => {
                gameContext.setGameSettings({
                rows: 32,
                columns: 32,
                winner: false,
                gameTime: 6000,
                mines: 40,
                flags: 40,
                level: 3,
            })}} buttonText="Сложный"/>
            </div>
        </div>
    );
}

export default LevelContent;
