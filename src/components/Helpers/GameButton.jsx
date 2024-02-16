import React from 'react';

const GameButton = (props) => {
    return (
        <button onClick={props.onClick} className='game-board__button'>
            {props.value}
        </button>
    );
}

export default GameButton;
