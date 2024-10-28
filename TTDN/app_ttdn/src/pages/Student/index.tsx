import React, {useState} from 'react';
import HeaderBar from './HeaderBar';
import {Table} from 'antd';
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
            studentId: '2021050192',
            address: '0123456789',
            email: '2021050192@student.humg.edu.vn',
            position: 'Hà Nội',
        },
        {
            id: 2,
            name: 'Nguyễn Văn B',
            studentId: '2021050193',
            address: '0123456789',
            email: '2021050193@student.humg.edu.vn',
            position: 'Hà Nội',
        },
        {
            id: 3,
            name: 'Nguyễn Văn C',
            studentId: '2021050194',
            address: '0123456789',
            email: '2021050194@student.humg.edu.vn',
            position: 'Hà Nội',
        },
        {
            id: 4,
            name: 'Nguyễn Văn D',
            studentId: '2021050195',
            address: '0123456789',
            email: '2021050195@student.humg.edu.vn',
            position: 'Hà Nội',
        },
        {
            id: 5,
            name: 'Nguyễn Văn E',
            studentId: '2021050196',
            address: '0123456789',
            email: '2021050196@student.humg.edu.vn',
            position: 'Hà Nội',
        },
    ];

    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'id',
            align: 'center',
            key: 'id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mã sinh viên',
            dataIndex: 'studentId',
            key: 'studentId',
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
            render: () => <ActionMenu/>,
        },
    ];

    return (
        <div className='flex h-full flex-col'>
            <HeaderBar
                label='Thêm sinh viên'
                setKeyword={setKeyword}
                keyword={keyword}
                handleCreate={() => setVisible(true)}
            />
            <div className='bg-white p-4 rounded-xl h-full flex-col flex'>
                <Table<any>
                    columns={columns}
                    dataSource={data}
                    className='table-h-full'
                />
            </div>
            <ModalStudent
                open={visible}
                onClose={() => setVisible(false)}
            />
        </div>
    );
};

export default Student;
