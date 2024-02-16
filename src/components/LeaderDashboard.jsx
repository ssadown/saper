import React, { useContext, useState, useEffect } from 'react';
import { leaderDashboardContext } from '../contexts/Context';
import LeaderDashboardPlayer from './LeaderDashboardPlayer';
import LeaderDashboardSelect from './Helpers/LeaderDashboardSelect';

const LeaderDashboard = () => {
    const leaderDashboard = useContext(leaderDashboardContext)
    const [leaderSort, setLeaderSort] = useState(1)
    const [leaderDashboardSorted, setLeaderDashboardSorted] = useState([])

    useEffect(() => {
        let sortedDashboard = [];
    
        switch (leaderSort) {
            case 1:
                sortedDashboard = leaderDashboard.leaderDashboard.slice().sort((a, b) => a.timeEasy - b.timeEasy);
                break;
            case 2:
                sortedDashboard = leaderDashboard.leaderDashboard.slice().sort((a, b) => a.timeMid - b.timeMid);
                break;
            case 3:
                sortedDashboard = leaderDashboard.leaderDashboard.slice().sort((a, b) => a.timeHard - b.timeHard);
                break;
            default:
                sortedDashboard = leaderDashboard.leaderDashboard.slice().sort((a, b) => a.timeEasy - b.timeEasy);
                break;
        }
    
        setLeaderDashboardSorted(sortedDashboard);
    }, [leaderSort, leaderDashboard.leaderDashboard])
    
    

    return (
        <div className='wrapper-main'>
            <LeaderDashboardSelect value={leaderSort} setData={setLeaderSort}/>
            {leaderDashboardSorted.map(player => {
                return (
                    <LeaderDashboardPlayer
                    key={player.id}
                    userName={player.userName} 
                    timeEasy={player.timeEasy}
                    timeMid={player.timeMid}
                    timeHard={player.timeHard}
                    />
                )
            })}
        </div>
    );
}

export default LeaderDashboard;
