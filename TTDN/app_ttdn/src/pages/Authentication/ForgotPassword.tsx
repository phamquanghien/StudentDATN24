import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    navigate('/verify-email', { state: { email: values.email } });
  };
  return (
    <Form
      name='forgot-password'
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
        name='email'
        rules={[
          { required: true, message: 'Vui lòng nhập email!', type: 'email' },
        ]}
        style={{ margin: 0 }}>
        <Input
          prefix={<MailOutlined className='mr-2' />}
          placeholder='Email'
          size='large'
          className='rounded-xl'
          style={{ height: '50px' }}
        />
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
            Tiếp tục
          </Button>
        )}
      </Form.Item>
      <Form.Item className='text-center'>
        Quay về trang{' '}
        <Link
          to='/login'
          className='text-blue-500'>
          Đăng nhập
        </Link>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
