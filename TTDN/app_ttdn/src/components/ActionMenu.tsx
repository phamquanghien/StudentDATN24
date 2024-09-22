import React from 'react';
import { Dropdown, Button } from 'antd';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  const items = [
    {
      label: 'Sửa',
      key: '1',
      icon: <PencilSquareIcon className='w-5 h-5' />,
      onClick: onEdit,
    },
    {
      label: 'Xóa',
      key: '2',
      icon: <TrashIcon className='text-red-500 w-5 h-5' />,
      onClick: onDelete,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement='bottomRight'
      arrow
      overlayClassName='custom-dropdown'
      trigger={['click']}>
      <Button
        type='text'
        className='no-hover-button'>
        <EllipsisVerticalIcon className='w-5 h-5' />
      </Button>
    </Dropdown>
  );
};

export default ActionMenu;
