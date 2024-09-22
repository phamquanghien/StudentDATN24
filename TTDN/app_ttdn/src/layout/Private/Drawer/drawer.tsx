import { Menu, MenuProps, Drawer } from 'antd';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { icons } from '@/constant/icons';
import '../Sidebar/sidebar.css';

type MenuItem = Required<MenuProps>['items'][number];

interface DrawerMenuProps {
  items: MenuItem[];
  open: boolean;
  setOpen: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ items, open, setOpen }) => {
  const defaultOpenKeys = [
    'report_all',
    'report',
    'arise',
    'category',
    'customer',
    'transport_vehicle',
    'quota',
    'personnel',
    'settings',
  ];

  return (
    <Drawer
      open={open}
      className='drawer-menu w-full md:w-64'
      placement='left'
      closable={false}
      onClose={setOpen}
      width='100%'
      styles={{
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}>
      <div className='flex flex-row justify-center items-center p-2'>
        <img
          src={icons.logo}
          alt='Logo'
          width={80}
        />
        {/* <CloseOutlined
          onClick={setOpen}
          style={{ fontSize: 25 }}
        /> */}
      </div>
      <div className='flex-grow overflow-y-auto'>
        <Menu
          theme='light'
          mode='inline'
          className='h-full bg-white sidebar-menu select-none border-none'
          items={items}
          defaultOpenKeys={defaultOpenKeys}
        />
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
