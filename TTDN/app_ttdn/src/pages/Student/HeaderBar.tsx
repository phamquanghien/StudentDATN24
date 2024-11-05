import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {Button, Dropdown, Input, MenuProps} from 'antd';
import React from 'react';
import {DownOutlined, FileExcelOutlined, PlusOutlined,} from '@ant-design/icons';

interface HeaderBarProps {
    label: string;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    handleCreate: () => void;
    canImport?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
                                                 label,
                                                 setKeyword,
                                                 keyword,
                                                 handleCreate,
                                                 canImport
                                             }) => {
    const items: MenuProps['items'] = [
        {
            label: 'Nhập từ Excel',
            key: '1',
            icon: <FileExcelOutlined/>,
            onClick: () => console.log('Nhập từ Excel'),
        },
    ];
    return (
        <div className='flex justify-between gap-2 mb-4'>
            {canImport ? <Dropdown.Button
                type='primary'
                icon={<DownOutlined/>}
                menu={{items}}
                onClick={handleCreate}>
                <PlusOutlined/> {label}
            </Dropdown.Button> : <Button type={"primary"} onClick={handleCreate}>{label}</Button>
            }
            <Input
                placeholder='Tìm kiếm'
                className='w-1/2'
                prefix={<MagnifyingGlassIcon className='w-5 h-5 text-gray-400'/>}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    );
};

export default HeaderBar;
