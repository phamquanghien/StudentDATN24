import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Input } from 'antd';
import React from 'react';

interface HeaderBarProps {
  label: string;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  label,
  setKeyword,
  keyword,
}) => {
  return (
    <div className='flex justify-between gap-2 mb-4'>
      <Button type='primary'>{label}</Button>
      <Input
        placeholder='Tìm kiếm'
        className='w-96'
        prefix={<MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default HeaderBar;
