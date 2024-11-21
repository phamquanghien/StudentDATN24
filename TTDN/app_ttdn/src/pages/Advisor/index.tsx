import React, { useEffect } from "react";
import HeaderBar from "@/pages/Council/HeaderBar.tsx";
import { notification, Table } from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  clearAdvisorResponse,
  deleteAdvisorRequest,
  getAdvisorsRequest,
} from "@/store/Advisor/slice.ts";
import { RootState } from "@/store";
import ModalAdvisor from "@/pages/Advisor/ModalAdvisor.tsx";
import { IAdvisor } from "@/models/Advisor.ts";
import ModalDelete from "@/components/ModalDelete.tsx";

const Advisor = () => {
  const [keyword, setKeyword] = React.useState("");
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [rowData, setRowData] = React.useState<IAdvisor | undefined>(undefined);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const {
    advisors,
    deleteSuccess,
    deleteFailed,
    createSuccess,
    updateSuccess,
  } = useSelector(
    (state: RootState) => ({
      advisors: state.Advisor.advisors.data,
      deleteSuccess: state.Advisor.deletedAdvisor.data,
      deleteFailed: state.Advisor.deletedAdvisor.error,
      createSuccess: state.Advisor.newAdvisor.data,
      updateSuccess: state.Advisor.updatedAdvisor.data,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getAdvisorsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess || createSuccess || updateSuccess) {
      dispatch(getAdvisorsRequest());
    }
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      key: "stt",
      render: (_: any, record: IAdvisor, index: number) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã giảng viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Bộ môn",
      dataIndex: "departmentID",
      key: "departmentID",
      render: (text: any, record: IAdvisor) => record.department.name,
    },
    {
      dataIndex: "action",

      key: "action",
      align: "right",
      render: (_: any, record: IAdvisor) => (
        <ActionMenu
          onDelete={() => handleDelete(record)}
          onEdit={() => handleEdit(record)}
        />
      ),
    },
  ];

  const handleEdit = (record: IAdvisor) => {
    setIsOpenModal(true);
    setRowData(record);
  };

  const handleDelete = (record: IAdvisor) => {
    setIsDelete(true);
    setRowData(record);
  };

  const acceptDelete = () => {
    if (rowData && rowData.id) {
      dispatch(deleteAdvisorRequest(rowData.id));
      setRowData(undefined);
      setIsDelete(false);
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      api.success({
        message: "Thành công",
        description: "Giảng viên đã được xóa khỏi hệ thống",
      });
      dispatch(clearAdvisorResponse());
    }
    if (deleteFailed) {
      api.error({
        message: "Thất bại",
        description: "Có lỗi xảy ra vui lòng thử lại",
      });
      dispatch(clearAdvisorResponse());
    }
  }, [api, dispatch, deleteSuccess, deleteFailed]);

  return (
    <div className="h-full flex flex-col justify-between">
      {contextHolder}
      <HeaderBar
        label={"Thêm giảng viên"}
        keyword={keyword}
        setKeyword={setKeyword}
        handleCreate={() => setIsOpenModal(true)}
      />
      <div className="h-full flex flex-col justify-between bg-white p-4 rounded-xl">
        <Table
          columns={columns}
          dataSource={advisors}
          className="table-h-full no-radius-table"
          rowKey={(record) => record.id as React.Key}
        />
      </div>
      <ModalAdvisor
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        api={api}
        rowData={rowData}
      />
      <ModalDelete
        visible={isDelete}
        setVisible={() => setIsDelete(false)}
        accept={acceptDelete}
        msg="giảng viên này"
      />
    </div>
  );
};

export default Advisor;
