import FloatInput from '@/components/FloatLabel/FloatInput';
import { Button, Flex, Form, Input, Modal } from 'antd';
import React from 'react';

interface ModalStudentProps {
  open: boolean;
  onClose: () => void;
}

const ModalStudent: React.FC<ModalStudentProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title='Thêm sinh viên'
      open={open}
      onCancel={onClose}
      footer={null}>
      <Form
        form={form}
        layout='vertical'>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
          name='name'>
          <FloatInput
            componenttype='input'
            label='Họ và tên'
          />
        </Form.Item>
        <Flex justify='space-between'>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
            name='studentCode'>
            <FloatInput
              componenttype='input'
              label='Mã sinh viên'
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
            name='course'>
            <FloatInput
              componenttype='input'
              label='Khoá'
            />
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}>
            <FloatInput
              componenttype='input'
              label='Bộ môn'
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}>
            <FloatInput
              componenttype='input'
              label='Lớp'
            />
          </Form.Item>
        </Flex>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}>
          <FloatInput
            componenttype='input'
            label='Số điện thoại'
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}>
          <FloatInput
            componenttype='input'
            label='Email'
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}>
          <FloatInput
            componenttype='input'
            label='Địa chỉ'
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}>
          <FloatInput
            componenttype='textArea'
            label='Ghi chú'
            autoSize={{ minRows: 3 }}
          />
        </Form.Item>
        <Flex
          justify='center'
          gap='2rem'>
          <Button style={{ width: '100px' }}>Hủy</Button>
          <Button
            type='primary'
            style={{ width: '100px' }}
            htmlType='submit'>
            Thêm
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ModalStudent;
