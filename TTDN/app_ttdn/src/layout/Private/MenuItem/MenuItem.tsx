import { MenuProps } from "antd";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { privateRoutesName } from "@/constant/routerName"; // Đảm bảo các route được import từ file routerName
import {
  AcademicCapIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

type MenuItem = Required<MenuProps>["items"][number];

export const sideBarMenuItem: MenuItem[] = [
  {
    key: "dashboard",
    label: "Tổng quan",
    type: "group",
    children: [
      {
        key: privateRoutesName.dashboard,
        label: <Link to={privateRoutesName.dashboard}>Báo cáo</Link>,
        icon: <ChartBarSquareIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "intern",
    label: "Thực tập",
    type: "group",
    children: [
      {
        key: privateRoutesName.internship,
        label: <Link to={privateRoutesName.internship}>Quản lý thực tập</Link>,
        icon: <AcademicCapIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    type: "divider",
  },
  // {
  //     key: 'category',
  //     label: 'Thao tác',
  //     type: 'group',
  //     children: [
  //         {
  //             key: privateRoutesName.subcribeAdvisor,
  //             label: (
  //                 <Link to={privateRoutesName.subcribeAdvisor}>Phân bổ giảng viên</Link>
  //             ),
  //             icon: <UserGroupIcon className='w-5 h-5'/>,
  //         },
  //         {
  //             key: privateRoutesName.subcribeTopic,
  //             label: <Link to={privateRoutesName.subcribeTopic}>Đăng ký đề tài</Link>,
  //             icon: <UsersIcon className='w-5 h-5'/>,
  //         },
  //         {
  //             key: privateRoutesName.subcribeCompany,
  //             label: <Link to={privateRoutesName.subcribeCompany}>Hội đồng</Link>,
  //             icon: <UserGroupIcon className='w-5 h-5'/>,
  //         },
  //     ],
  // },

  {
    key: "category",
    label: "Danh mục",
    type: "group",
    children: [
      {
        key: privateRoutesName.department,
        label: <Link to={privateRoutesName.department}>Bộ môn</Link>,
        icon: <UserGroupIcon className="w-5 h-5" />,
      },
      {
        key: privateRoutesName.advisor,
        label: <Link to={privateRoutesName.advisor}>Giảng viên hướng dẫn</Link>,
        icon: <UsersIcon className="w-5 h-5" />,
      },
      {
        key: privateRoutesName.student,
        label: <Link to={privateRoutesName.student}>Sinh viên</Link>,
        icon: <UserIcon className="w-5 h-5" />,
      },
    ],
  },
];
