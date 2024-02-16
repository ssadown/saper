import React from 'react';

const LeaderDashboardSelect = (props) => {
    return (
        <div className='leader-dashboard__block-select'>
            <h3>Отсортировать по уровню: </h3>
            <select name="" id="" className='leader-dashboard__select' value={props.value} onChange={(e) => {props.setData(Number(e.target.value))}}>
                <option value="1">Легкий</option>
                <option value="2">Средний</option>
                <option value="3">Сложный</option>
            </select>
        </div>
    );
}

export default LeaderDashboardSelect;
