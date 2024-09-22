import React from 'react';
import {
  Avatar,
  Layout,
  Typography,
  Button,
  Dropdown,
  MenuProps,
  Badge,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {
  LockClosedIcon,
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { icons } from '../../../constant/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
const { Header } = Layout;
const { Title, Text } = Typography;

type AppHeaderProps = {
  toggleDrawer: () => void;
};

const items: MenuProps['items'] = [
  {
    key: 'change_info',
    label: 'Thông tin tài khoản',
    icon: <UserCircleIcon className='w-5 h-5' />,
  },
  {
    key: 'change_password',
    label: 'Đổi mật khẩu',
    icon: <LockClosedIcon className='w-5 h-5' />,
  },
  { type: 'divider' },
  {
    key: 'logout',
    label: 'Đăng xuất',
    icon: <ArrowLeftStartOnRectangleIcon className='w-5 h-5' />,
  },
];

const notifyItems: MenuProps['items'] = [
  // {
  //   key: 'change_info',
  //   label: 'Thông tin tài khoản',
  //   icon: <UserCircleIcon className='w-5 h-5' />,
  // },
  // {
  //   key: 'change_password',
  //   label: 'Đổi mật khẩu',
  //   icon: <LockClosedIcon className='w-5 h-5' />,
  // },
  // { type: 'divider' },
  // {
  //   key: 'logout',
  //   label: 'Đăng xuất',
  //   icon: <ArrowLeftStartOnRectangleIcon className='w-5 h-5' />,
  // },
];

const AppHeader: React.FC<AppHeaderProps> = ({ toggleDrawer }) => {
  return (
    <Header className='bg-white flex flex-row justify-between items-center p-5 border-none'>
      <div className='flex items-center'>
        <Button
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          className='mr-4 lg:hidden'
        />
        <Title
          level={5}
          className='select-none'
          style={{ margin: 0 }}></Title>
      </div>
      <div className='flex gap-8'>
        <Dropdown
          menu={{ items: notifyItems }}
          trigger={['click']}>
          <section>
            <Badge
              count={5}
              size='small'>
              <FontAwesomeIcon
                icon={faBell}
                className='cursor-pointer text-primary'
                size='lg'
              />
            </Badge>
          </section>
        </Dropdown>
        <Dropdown
          menu={{ items }}
          trigger={['click']}>
          <section
            className='flex flex-row items-center'
            onClick={(e) => e.preventDefault()}>
            <Avatar
              src={icons.logo}
              size='large'
              shape='circle'
              className='cursor-pointer'
            />
            <div className='hidden md:flex flex-row items-center ml-2 gap-2'>
              <div className='flex flex-col select-none items-end cursor-pointer'>
                <Text className='text-primary'>Vũ Tiến Điệp</Text>
                <Text className='text-sm'>2021050192</Text>
              </div>
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                className='text-primary cursor-pointer'
              />
            </div>
          </section>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
