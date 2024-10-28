import React, { useState } from 'react';
import HeaderBar from './HeaderBar';
import { Table } from 'antd';
import ActionMenu from '@/components/ActionMenu';
import useDebounce from '@/feature/hooks';
import ModalStudent from './ModalStudent';

const Student = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const debouncedKeyword = useDebounce(keyword, 500);

  const data = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      age: '2021050192',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      age: '2021050193',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 3,
      name: 'Nguyễn Văn C',
      age: '2021050194',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 4,
      name: 'Nguyễn Văn D',
      age: '2021050195',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 5,
      name: 'Nguyễn Văn E',
      age: '2021050196',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
  ];

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'position',
      key: 'position',
    },
    {
      align: 'right',
      render: () => <ActionMenu />,
    },
  ];

  return (
    <>
      <HeaderBar
        label='Thêm sinh viên'
        setKeyword={setKeyword}
        keyword={keyword}
        handleCreate={() => setVisible(true)}
      />
      <div className='bg-white p-2 rounded-xl'>
        <Table<any>
          columns={columns}
          dataSource={data}
        />
      </div>
      <ModalStudent
        open={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default Student;
