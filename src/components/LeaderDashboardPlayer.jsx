import React from 'react';
import { formatTime } from '../Formater/formatTime.js'

const LeaderDashboardPlayer = (props) => {
    return (
        <div className='leader-dashboard__player'>
            <h3>{props.userName}</h3>
            <p>Легкий: {formatTime(props.timeEasy)}</p>
            <p>Средний: {formatTime(props.timeMid)}</p>
            <p>Сложный: {formatTime(props.timeHard)}</p>
        </div>
    );
}

export default LeaderDashboardPlayer;
