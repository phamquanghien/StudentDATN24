import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import './sidebar.css';
import { icons } from '@/constant/icons';
import { MenuProps } from 'rc-menu';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export type SideBarProps = {
  items: MenuItem[];
  collapsed: boolean;
  setCollapsed: () => void;
};

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  zIndex: 1,
};

const Sidebar: React.FC<SideBarProps> = ({
  items,
  collapsed,
  setCollapsed,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string>('/');
  useLayoutEffect(() => {
    const path = window.location.pathname;
    setSelectedKeys(path);
  }, [location.pathname]);

  return (
    <Sider
      style={siderStyle}
      width={256}
      collapsedWidth={100}
      collapsed={collapsed}
      theme='light'
      className='overflow-auto h-screen fixed inset-y-0 left-0 z-10 hidden lg:block'>
      <div className='flex justify-center items-center my-2 relative'>
        <img
          src={icons.logo}
          alt='Logo'
          className='w-24'
        />
        {/* <div
          className='absolute flex right-0 bg-gray-200 w-7 h-7 cursor-pointer justify-center items-center rounded-[10px]'
          onClick={setCollapsed}>
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div> */}
      </div>
      <Menu
        theme='light'
        mode='inline'
        className='h-screen bg-white sidebar-menu select-none'
        items={items}
        selectedKeys={[selectedKeys]}
      />
    </Sider>
  );
};

export default Sidebar;
