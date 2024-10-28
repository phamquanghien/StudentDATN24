import React from 'react';
import HeaderBar from "@/pages/Student/HeaderBar.tsx";
import {Table} from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";

const Department = () => {
    const [keyword, setKeyword] = React.useState('');

    const data = [
        {
            id: 1,
            name: 'Công nghệ phần mềm',
            address: 'Phòng 801, tầng 8, nhà C, khu A Đại học Mỏ - Địa chất',
            email: 'bomoncnpm@humg.com',
            phone: '0123456789',
        },
        {
            id: 2,
            name: 'Khoa học máy tính',
            address: 'Phòng 802, tầng 8, nhà C, khu A Đại học Mỏ - Địa chất',
            email: 'bomonkhmt@humg.com',
            phone: '0123456789',
        },
        {
            id: 3,
            name: 'Tin học kinh tế',
            address: 'Phòng 803, tầng 8, nhà C, khu A Đại học Mỏ - Địa chất',
            email: 'bomonthkt@humg.com',
            phone: '0123456789',
        },
        {
            id: 4,
            name: 'Mạng máy tính',
            address: 'Phòng 804, tầng 8, nhà C, khu A Đại học Mỏ - Địa chất',
            email: 'bomonmmt@humg.com',
            phone: '0123456789',
        },
        {
            id: 5,
            name: 'Tin học trắc địa',
            address: 'Phòng 805, tầng 8, nhà C, khu A Đại học Mỏ - Địa chất',
            email: 'bomonthtd@humg.com',
            phone: '0123456789',
        },
        {
            id: 6,
            name: 'Hệ thống thông tin',
            address: 'Phòng 806, tầng 8, nhà C, khu A Đại học Mỏ - Địa chất',
            email: 'bomonhttt@humg.com',
            phone: '0123456789',
        },
    ];

    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'id',
            align: 'center',
            width: 50,
        },
        {
            title: 'Tên bộ môn',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            align: 'center',
        },
        {
            dataIndex: 'action',
            align: 'right',
            render: (text: any, record: any) => <ActionMenu/>,
        },
    ];


    return <div className='h-full flex flex-col'>
        <HeaderBar label='Thêm bộ môn' keyword={keyword} setKeyword={setKeyword} handleCreate={() => {
        }}/>
        <div className='h-full flex flex-col bg-white p-4 rounded-xl'>
            <Table columns={columns} dataSource={data} className='table-h-full'/>
        </div>
    </div>;
};

export default Department;
