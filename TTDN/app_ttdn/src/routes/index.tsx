import ForgotPassword from '../pages/Authentication/ForgotPassword';
import Login from '../pages/Authentication/Login';
import VerifyEmail from '../pages/Authentication/VerifyEmail';
import Dashboard from '../pages/Dashboard';
import Delivery from '../pages/Delivery';
import Departmemt from '../pages/Department';
import DeviceList from '../pages/DeviceList';
import DeviceMenu from '../pages/DeviceMenu';
import DeviceType from '../pages/DeviceType';
import Division from '../pages/Division';
import Setting from '../pages/Setting';
import User from '../pages/User';

//Public Routes
const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/verify-email', component: VerifyEmail },
  { path: '/forgot-password', component: ForgotPassword },
];

//Private Routes
const privateRoutes = [
  { path: '/', component: Dashboard },
  { path: '/delivery', component: Delivery },
  { path: '/device', component: DeviceList },
  { path: '/division', component: Division },
  { path: '/department', component: Departmemt },
  // { path: '/user', component: User },
  { path: '/device-menu', component: DeviceMenu },
  { path: '/device-type', component: DeviceType },
  { path: '/setting', component: Setting },
];

export { publicRoutes, privateRoutes };
