import {Tag} from "antd";

export const getStatusTemplate = (status: string) => {
    switch (status) {
        case 'Hoàn thành':
            return (
                <Tag
                    color='#1ebd60'
                    style={{
                        width: '120px',
                        color: '#fff',
                        textAlign: 'center',
                    }}>
                    {status}
                </Tag>
            );
        case 'Chờ bảo vệ':
            return (
                <Tag
                    color='rgba(255,84,0,0.2)'
                    style={{
                        width: '120px',
                        color: 'rgb(255,84,0)',
                        textAlign: 'center',
                    }}>
                    {status}
                </Tag>
            );

        case 'Mới':
            return (
                <Tag
                    color='rgb(85,85,85,0.2)'
                    style={{
                        width: '120px',
                        color: 'rgb(85,85,85)',
                        textAlign: 'center',
                    }}>
                    {status}
                </Tag>
            );

        case 'Đang thực tập':
            return (
                <Tag
                    color='rgb(0 128 255 / 74%)'
                    style={{
                        width: '120px',
                        color: '#fff',
                        textAlign: 'center',
                    }}>
                    {status}
                </Tag>
            );

        case 'Không đạt':
            return (
                <Tag
                    color='rgb(255 77 79 / 100%)'
                    style={{
                        width: '120px',
                        color: '#fff',
                        textAlign: 'center',
                    }}>
                    {status}
                </Tag>
            );

        default:
            return status;
    }
};