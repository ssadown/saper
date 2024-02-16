import React, { useContext } from 'react';
import GameTimer from './Helpers/GameTimer';
import { gameSettingsContext } from '../contexts/Context';
import GameBoard from './Helpers/GameBoard';


const GameContent = () => {
    const gameContext = useContext(gameSettingsContext)

    return (
        <div className="wrapper-game">
            <GameTimer
            seconds={gameContext.gameSettings.gameTime} 
            mines={gameContext.gameSettings.mines} 
            flags={gameContext.gameSettings.mines}
            winner={gameContext.gameSettings.winner}
            />
            <GameBoard/>
        </div>
    );
}

export default GameContent;
