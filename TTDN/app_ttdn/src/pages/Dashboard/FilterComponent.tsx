import React from 'react';
import { Select } from 'antd';

const FilterComponent: React.FC = () => {
  return (
    <div className='flex justify-between pb-4 gap-4'>
      <div className='w-1/2 flex gap-4'>
        <Select
          showSearch
          placeholder='Năm học'
          optionFilterProp='label'
          className='w-1/2 rounded-xl flex-1'
          // onChange={onChange}
          // onSearch={onSearch}
          options={[
            {
              value: 'jack',
              label: '2023 - 2024',
            },
            {
              value: 'lucy',
              label: '2022 - 2023',
            },
            {
              value: 'tom',
              label: '2021 - 2022',
            },
          ]}
        />
        <Select
          showSearch
          placeholder='Học kỳ'
          optionFilterProp='label'
          className='w-1/2 rounded-xl flex-1'
          // onChange={onChange}
          // onSearch={onSearch}
          options={[
            {
              value: 'jack',
              label: 'Học kỳ 1',
            },
            {
              value: 'lucy',
              label: 'Học kỳ 2',
            },
            {
              value: 'tom',
              label: 'Học kỳ 3',
            },
          ]}
        />
      </div>
      <div className='w-1/2 flex gap-4'>
        <Select
          showSearch
          placeholder='Bộ môn'
          optionFilterProp='label'
          className='w-1/2 rounded-xl flex-1'
          // onChange={onChange}
          // onSearch={onSearch}
          options={[
            {
              value: 'jack',
              label: 'Tin học kinh tế',
            },
            {
              value: 'lucy',
              label: 'Công nghệ phần mềm',
            },
            {
              value: 'tom',
              label: 'Khoa học máy tính',
            },
          ]}
        />
        <Select
          showSearch
          placeholder='Giáo viên hướng dẫn'
          optionFilterProp='label'
          className='w-1/2 rounded-xl flex-1'
          // onChange={onChange}
          // onSearch={onSearch}
          options={[
            {
              value: 'jack',
              label: 'Phạm Quang Hiển',
            },
            {
              value: 'lucy',
              label: 'Dương Thị Hiền Thanh',
            },
            {
              value: 'tom',
              label: 'Nguyễn Thị Nguyệt',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
