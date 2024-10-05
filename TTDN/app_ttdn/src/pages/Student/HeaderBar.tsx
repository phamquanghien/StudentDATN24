import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, Input, MenuProps } from 'antd';
import React from 'react';
import {
  CalendarOutlined,
  FileExcelOutlined,
  DownOutlined,
  PlusOutlined,
} from '@ant-design/icons';

interface HeaderBarProps {
  label: string;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleCreate: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  label,
  setKeyword,
  keyword,
  handleCreate,
}) => {
  const items: MenuProps['items'] = [
    {
      label: 'Nhập từ Excel',
      key: '1',
      icon: <FileExcelOutlined />,
      onClick: () => console.log('Nhập từ Excel'),
    },
  ];
  return (
    <div className='flex justify-between gap-2 mb-4'>
      <Dropdown.Button
        type='primary'
        icon={<DownOutlined />}
        menu={{ items }}
        onClick={handleCreate}>
        <PlusOutlined /> {label}
      </Dropdown.Button>
      <Input
        placeholder='Tìm kiếm'
        // className='w-96'
        prefix={<MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default HeaderBar;
