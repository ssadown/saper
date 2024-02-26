import React from 'react';
import { Link } from 'react-router-dom';

const CustomLevelButton = (props) => {
    if (props.error) {
        return (
            <button className='block-level__button' onClick={props.onClick}>Начать</button>
        )
    } else {
        return (
            <Link className='block-level__button-place' to='/game'><button className='block-level__button' onClick={props.onClick}>Начать</button></Link>
        )
    }
}

export default CustomLevelButton;
