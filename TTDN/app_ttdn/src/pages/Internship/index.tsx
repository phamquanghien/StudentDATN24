import React from 'react';
import FilterComponent from "@/pages/Dashboard/FilterComponent.tsx";
import {Table} from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import {getStatusTemplate} from "@/feature/getStatus.tsx";

const Internship = () => {

    const data: any = [
        {
            studentId: '2021050191',
            name: 'Nguyễn Văn A',
            course: 'K65',
            class: 'DCCTKT65B',
            major: 'Tin học kinh tế',
            advisor: '',
            company: '',
            timeStart: '05/08/2024',
            timeEnd: '15/10/2024',
            council: '',
            status: 'Mới',
        },
        {
            studentId: '2021050192',
            name: 'Nguyễn Văn B',
            course: 'K65',
            class: 'DCCTKT65B',
            major: 'Tin học kinh tế',
            advisor: 'Phạm Quang Hiển',
            company: 'Công ty TNHH XYZ',
            timeStart: '05/08/2024',
            timeEnd: '15/10/2024',
            council: '',
            status: 'Đang thực tập',
        },
        {
            studentId: '2021050193',
            name: 'Nguyễn Văn C',
            course: 'K65',
            class: 'DCCTKT65B',
            major: 'Tin học kinh tế',
            advisor: 'Dương Thị Hiền Thanh',
            company: 'Công ty TNHH MTV ABC',
            timeStart: '05/08/2024',
            timeEnd: '15/10/2024',
            council: 'Hội đồng 1',
            status: 'Chờ bảo vệ',
        },
        {
            studentId: '2021050194',
            name: 'Nguyễn Văn D',
            course: 'K65',
            class: 'DCCTKT65B',
            major: 'Tin học kinh tế',
            advisor: 'Nguyễn Thế Bình',
            company: 'Công ty TNHH XYZ',
            timeStart: '05/08/2024',
            timeEnd: '15/10/2024',
            council: 'Hội đồng 2',
            status: 'Hoàn thành',
        },
        {
            studentId: '2021050195',
            name: 'Nguyễn Văn F',
            course: 'K65',
            class: 'DCCTKT65B',
            major: 'Tin học kinh tế',
            advisor: 'Phạm Thị Nguyệt',
            company: 'Công ty TNHH XYZ',
            timeStart: '05/08/2024',
            timeEnd: '15/10/2024',
            council: 'Hội đồng 3',
            status: 'Không đạt',
        },
    ];


    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            width: 50,
            key: 'stt',
            render: (text: any, record: any, index: number) => index + 1,
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mã sinh viên',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 120,
        },
        {
            title: 'Bộ môn',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Khoá',
            dataIndex: 'course',
            key: 'course',
            width: 60,
        },
        {
            title: 'Lớp',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'GVHD',
            dataIndex: 'advisor',
            key: 'advisor',
        },
        {
            title: 'Địa điểm thực tập',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'timeStart',
            key: 'timeStart',
            width: 120,
            align: 'center',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'timeEnd',
            key: 'timeEnd',
            width: 130,
            align: 'center',
        },
        {
            title: 'Hội đồng',
            dataIndex: 'council',
            key: 'council',
            width: 130,
            align: 'center',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status: string) => getStatusTemplate(status)
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

    return (
        <div className='h-full flex flex-col gap-2'>
            <div className='flex gap-4'>
                <></>
            </div>
            <FilterComponent/>
            <div className='bg-white p-4 rounded-xl h-full flex flex-col'>
                <Table
                    columns={columns}
                    dataSource={data}
                    className='table-h-full no-radius-table'
                    scroll={{
                        x: 'max-content',
                        y: 'calc(100vh - 300px)',
                    }}/>
            </div>
        </div>
    );
};

export default Internship;
