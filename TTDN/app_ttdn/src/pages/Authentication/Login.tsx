import { Button, Form, Input, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import type { FormProps } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../../store/Auth/slice';
import { AuthType } from '../../models/Auth';
import { RootState } from '../../store';
import { useEffect } from 'react';
import {
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const { successLogin, ErrorLogin } = useSelector(
    (state: RootState) => ({
      successLogin: state.Auth.login.data,
      ErrorLogin: state.Auth.login.error,
    }),
    shallowEqual
  );

  const onFinish: FormProps<AuthType>['onFinish'] = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (successLogin) {
      api['success']({
        message: 'Thành công',
        description: 'Đăng nhập thành công!',
      });
      dispatch(resetLogin());
    }
    if (ErrorLogin) {
      api['error']({
        message: 'Thất bại',
        description: ErrorLogin?.response?.data.message,
      });
      dispatch(resetLogin());
    }
  }, [successLogin, ErrorLogin]);

  return (
    <Form
      name='login'
      layout='inline'
      onFinish={onFinish}
      className='flex flex-col  bg-white px-10 pt-10 pb-2 rounded-xl shadow-md'
      style={{ width: '550px' }}>
      <div className='flex justify-center p-10'>
        <img
          width={200}
          src={logo}
        />
      </div>
      <Form.Item
        name='user'
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
        className='pb-5'
        style={{ margin: 0 }}>
        <Input
          prefix={<UserIcon className='mr-2 w-5 h-5' />}
          placeholder='Tên đăng nhập'
          size='large'
          className='rounded-xl'
          style={{ height: '50px' }}
        />
      </Form.Item>
      <Form.Item
        name='pass'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
          },
        ]}
        style={{ margin: 0 }}>
        <Input.Password
          prefix={<LockClosedIcon className='mr-2 w-5 h-5' />}
          type='pass'
          placeholder='Mật khẩu'
          size='large'
          className='rounded-xl'
          style={{ height: '50px' }}
        />
      </Form.Item>
      <Form.Item
        className='text-right'
        wrapperCol={{ offset: 8, span: 16 }}
        style={{ margin: 0 }}>
        <Link
          to='/forgot-password'
          className='text-blue-500'>
          Quên mật khẩu?
        </Link>
      </Form.Item>
      <Form.Item
        shouldUpdate
        className='text-center py-10'>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            className='rounded-xl w-40'
            size='large'>
            Đăng nhập
          </Button>
        )}
      </Form.Item>

      {contextHolder}
    </Form>
  );
};

export default Login;
