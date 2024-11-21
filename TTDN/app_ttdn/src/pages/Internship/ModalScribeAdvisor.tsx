import React, { useEffect } from "react";
import { Button, Modal, notification, Table } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getAdvisorsRequest } from "@/store/Advisor/slice.ts";
import { IAdvisor } from "@/models/Advisor.ts";
import {
  clearStudentResponse,
  subscribeAdvisorRequest,
} from "@/store/Student/slice.ts";

interface ModalScribeAdvisorProps {
  open: boolean;
  onClose: () => void;
  id?: number;
  departmentId?: number;
}

const ModalScribeAdvisor: React.FC<ModalScribeAdvisorProps> = ({
  open,
  onClose,
  id,
  departmentId,
}) => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const { advisors, subscribeAdvisorSuccess, subscribeAdvisorFailure } =
    useSelector(
      (state: RootState) => ({
        advisors: state.Advisor.advisors.data,
        subscribeAdvisorSuccess: state.Student.subscribeAdvisor.data,
        subscribeAdvisorFailure: state.Student.subscribeAdvisor.error,
      }),
      shallowEqual,
    );

  useEffect(() => {
    if (open) {
      dispatch(
        getAdvisorsRequest({ page: 1, limit: 100, departmentID: departmentId }),
      );
    }
  }, [dispatch, open, departmentId]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio" as any,
  };

  const columns: any = [
    {
      title: "Tên giảng viên",
      dataIndex: "name",
    },
    {
      title: "Mã GV",
      dataIndex: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Chỉ tiêu",
      dataIndex: "currentSlot",
      align: "center",
      render: (text: number, record: IAdvisor) => (
        <span>
          {text}/{record.maxSlot}
        </span>
      ),
    },
  ];

  const handleSubscribeAdvisor = () => {
    if (selectedRowKeys.length > 0 && id) {
      dispatch(
        subscribeAdvisorRequest({
          id,
          advisorId: selectedRowKeys[0] as number,
        }),
      );
    }
  };

  useEffect(() => {
    if (subscribeAdvisorSuccess) {
      api.success({
        message: "Thành công",
        description: "Đăng ký giảng viên hướng dẫn thành công",
      });
      dispatch(clearStudentResponse());
      setSelectedRowKeys([]);
      onClose();
    }
    if (subscribeAdvisorFailure) {
      api.error({
        message: "Thất bại",
        description: "Đăng ký giảng viên hướng dẫn thất bại",
      });
      dispatch(clearStudentResponse());
    }
  }, [api, dispatch, subscribeAdvisorFailure, subscribeAdvisorSuccess]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
        setSelectedRowKeys([]);
      }}
      footer={null}
      centered
      title="Đăng ký giảng viên hướng dẫn"
      width={900}
    >
      {contextHolder}
      <Table<IAdvisor>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={advisors}
        pagination={false}
        rowKey={(record) => record.id as React.Key}
      />
      <div className="text-center pt-5">
        <Button
          type="primary"
          onClick={handleSubscribeAdvisor}
          disabled={selectedRowKeys.length === 0}
        >
          Đăng ký
        </Button>
      </div>
    </Modal>
  );
};

export default ModalScribeAdvisor;
