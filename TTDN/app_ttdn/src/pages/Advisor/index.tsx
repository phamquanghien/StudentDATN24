import React from 'react';
import HeaderBar from "@/pages/Student/HeaderBar.tsx";
import {Table} from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import axios from "axios";

const Advisor = () => {
    const [keyword, setKeyword] = React.useState('');

    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            key: 'stt',
            render: (text: any, record: any, index: number) => index + 1,
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mã giảng viên',
            dataIndex: 'advisorId',
            key: 'advisorId',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
        },
        {
            dataIndex: 'action',

            key: 'action',
            align: 'right',
            render: () => (
                <ActionMenu/>
            ),
        },
    ];

    const data: any = [
        {
            advisorId: 'GV001',
            name: 'Nguyễn Văn A',
            email: '',
            phone: '',
            position: 'Giảng viên',
        },
        {
            advisorId: 'GV002',
            name: 'Nguyễn Văn B',
            email: '',
            phone: '',
            position: 'Giảng viên',
        },
        {
            advisorId: 'GV003',
            name: 'Nguyễn Văn C',
            email: '',
            phone: '',
            position: 'Giảng viên',
        },
        {
            advisorId: 'GV004',
            name: 'Nguyễn Văn D',
            email: '',
            phone: '',
            position: 'Giảng viên'
        },
    ];

    const getapi = () => {

        axios.get('http://localhost:5269/api/BoMon', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return <div className='h-full flex flex-col justify-between'>
        <HeaderBar
            label={'Thêm giảng viên'}
            keyword={keyword}
            setKeyword={setKeyword}
            handleCreate={() => {
            }}
        />
        {/*<Button onClick={getapi}>test api</Button>*/}
        <div className='h-full flex flex-col justify-between bg-white p-4 rounded-xl'>
            <Table columns={columns} dataSource={data} className='table-h-full no-radius-table'/>
        </div>
    </div>;
};

export default Advisor;
