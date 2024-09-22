import React, { useState } from 'react';
import { sideBarMenuItem } from './MenuItem/MenuItem';
import Sidebar from './Sidebar/Sidebar';
import DrawerMenu from './Drawer/drawer';
import AppHeader from './Header';
import { Layout } from 'antd';

const { Content } = Layout;

type PrivateLayoutProps = {
  children: React.ReactNode;
};

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerVisible((prevState) => !prevState);
  };

  return (
    <Layout className='min-h-screen'>
      <Sidebar
        items={sideBarMenuItem}
        collapsed={collapsed}
        setCollapsed={() => setCollapsed((prevState) => !prevState)}
      />
      <DrawerMenu
        items={sideBarMenuItem}
        open={drawerVisible}
        setOpen={() => setDrawerVisible((prevState) => !prevState)}
      />
      <Layout className='transition-all duration-200'>
        <AppHeader toggleDrawer={toggleDrawer} />
        <Content className=' h-full m-4 rounded-xl'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
