import React from 'react';
import { Link } from 'react-router-dom';

const TimerButton = (props) => {
    return (
        <Link className='try-again' to='/'><button className='timer__button' onClick={props.onClick}>Ещё раз?</button></Link>
    );
}

export default TimerButton;
