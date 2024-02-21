import React from 'react';
import GameTimer from './Helpers/GameTimer';
import GameBoard from './Helpers/GameBoard';

const GameContent = () => {
    return (
        <div className="wrapper-game">
            <GameTimer/>
            <GameBoard/>
        </div>
    );
}

export default GameContent;
