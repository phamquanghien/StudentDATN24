import { MenuProps } from 'antd';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { icons } from '@/constant/icons';
import { privateRoutesName } from '@/constant/routerName'; // Đảm bảo các route được import từ file routerName
import {
  AcademicCapIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

type MenuItem = Required<MenuProps>['items'][number];

export const sideBarMenuItem: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Tổng quan',
    type: 'group',
    children: [
      {
        key: privateRoutesName.dashboard,
        label: <Link to={privateRoutesName.dashboard}>Báo cáo</Link>,
        icon: <ChartBarSquareIcon className='w-5 h-5' />,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'arise',
    label: 'Thực tập',
    type: 'group',
    children: [
      {
        key: privateRoutesName.delivery,
        label: <Link to={privateRoutesName.delivery}>Quản lý thực tập</Link>,
        icon: <AcademicCapIcon className='w-5 h-5' />,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'category',
    label: 'Danh mục',
    type: 'group',
    children: [
      {
        key: privateRoutesName.division,
        label: <Link to={privateRoutesName.division}>Bộ môn</Link>,
        icon: <UserGroupIcon className='w-5 h-5' />,
      },
      {
        key: 'transport_vehicle',
        label: <Link to='#'>Giảng viên hướng dẫn</Link>,
        icon: <UsersIcon className='w-5 h-5' />,
      },
      {
        key: 'quota',
        label: <Link to='#'>Sinh viên</Link>,
        icon: <UserIcon className='w-5 h-5' />,
      },
    ],
  },
];
