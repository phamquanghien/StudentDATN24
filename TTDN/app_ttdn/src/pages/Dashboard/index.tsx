import React from 'react';
import CountBar from './CountBar';
import FilterComponent from './FilterComponent';
import DonutChart from './DonutChart';
import ColumnChart from './ColumnChart';

const Dashboard: React.FC = () => {
    return (
        <div className='h-full flex flex-col'>
            <FilterComponent className='flex justify-between pb-4 gap-4'/>
            <CountBar/>
            <div className='flex justify-between gap-4 h-full pb-2'>
                <DonutChart/>
                <ColumnChart/>
            </div>
        </div>
    );
};

export default Dashboard;
