import React from 'react';
import { Link } from 'react-router-dom';

const LevelButton = (props) => {
    return (
        <Link className='block-level__button-place' to='/game'><button className='block-level__button' onClick={props.onClick}>{props.buttonText}</button></Link>
    );
}

export default LevelButton;
