import React from 'react';
import CountBar from './CountBar';
import FilterComponent from './FilterComponent';
import DonutChart from './DonutChart';
import ColumnChart from './ColumnChart';

const Dashboard: React.FC = () => {
  return (
    <>
      <FilterComponent />
      <CountBar />
      <div className='flex justify-between gap-4'>
        <DonutChart />
        <ColumnChart />
      </div>
    </>
  );
};

export default Dashboard;
