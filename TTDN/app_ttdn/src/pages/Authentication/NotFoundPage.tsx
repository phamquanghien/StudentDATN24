import React from 'react';
import {Button, Result} from "antd";

const NotFoundPage: React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, đường dẫn này không tồn tại."
            extra={<Button type="primary" onClick={() => window.history.back()}>Trở lại</Button>}
            className='bg-white w-full h-screen '
        />
    );
};

export default NotFoundPage;