import { Button, Form, Input, notification } from 'antd';
import logo from '../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import type { FormProps } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AuthType } from '../../models/Auth';
import { RootState } from '../../store';
import { useEffect } from 'react';
import type { GetProps } from 'antd';
import './verify.css';

const VerifyEmail = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const onFinish: FormProps<AuthType>['onFinish'] = (values) => {
    // dispatch(login(values));
  };

  const location = useLocation();
  const email = location.state?.email;

  const handleChangeEmail = () => {
    // navigate('/forgot-password');
  };

  const handleResendEmail = () => {
    // navigate('/forgot-password');
  };

  type OTPProps = GetProps<typeof Input.OTP>;

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <Form
      name='verify_email'
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
      <div className='text-center'>
        <p>Nhập mã xác nhận đã được gửi về Email:</p>
        <p className='text-primary font-bold'>
          {email}{' '}
          <span
            className='text-blue-500 cursor-pointer'
            onClick={handleChangeEmail}>
            Thay đổi
          </span>
        </p>
      </div>
      <Form.Item
        name='otp'
        rules={[{ required: true, message: 'Vui lòng nhập mã xác nhận!' }]}
        style={{ margin: 0 }}
        className='text-center py-3'>
        <Input.OTP
          formatter={(str) => str.toUpperCase()}
          {...sharedProps}
          length={4}
          className='intput__otp__custom'
        />
      </Form.Item>
      <div className='text-center'>
        <p className='text-primary '>
          Không nhận được mã?{' '}
          <span
            className='text-blue-500 cursor-pointer'
            onClick={handleResendEmail}>
            Gửi lại
          </span>
        </p>
      </div>
      <Form.Item
        shouldUpdate
        className='text-center py-10'>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            className='rounded-xl w-40'
            size='large'>
            Xác minh
          </Button>
        )}
      </Form.Item>

      {contextHolder}
    </Form>
  );
};

export default VerifyEmail;
