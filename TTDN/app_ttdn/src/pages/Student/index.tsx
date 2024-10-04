import React, { useState } from 'react';
import HeaderBar from './HeaderBar';
import { Table } from 'antd';
import ActionMenu from '@/components/ActionMenu';

const Student = () => {
  const [keyword, setKeyword] = useState<string>('');

  const data = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      age: 'B20DCCN001',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      age: 'B20DCCN002',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 3,
      name: 'Nguyễn Văn C',
      age: 'B20DCCN003',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 4,
      name: 'Nguyễn Văn D',
      age: 'B20DCCN004',
      address: '0123456789',
      email: '',
      position: 'Hà Nội',
    },
    {
      id: 5,
      name: 'Nguyễn Văn E',
      age: 'B20DCCN005',
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
      />
      <div className='bg-white p-2 rounded-xl'>
        <Table<any>
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Student;
