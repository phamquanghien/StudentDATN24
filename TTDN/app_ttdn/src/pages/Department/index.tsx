import React, { useEffect } from "react";
import HeaderBar from "@/pages/Council/HeaderBar.tsx";
import { notification, Table, Tooltip } from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  clearDepartmentAction,
  deleteDepartmentRequest,
  getDepartments,
} from "@/store/Department/slice.ts";
import { RootState } from "@/store";
import { IDepartment } from "@/models/Department.ts";
import ModalDepartment from "@/pages/Department/ModalDepartment.tsx";
import ModalDelete from "@/components/ModalDelete.tsx";

const Department = () => {
  const [keyword, setKeyword] = React.useState("");
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [rowData, setRowData] = React.useState<IDepartment | undefined>(
    undefined,
  );
  const [api, contextHolder] = notification.useNotification();

  const {
    departments,
    loading,
    deleteSuccess,
    deleteFailed,
    createSuccess,
    updateSuccess,
  } = useSelector(
    (state: RootState) => ({
      departments: state.Department.departments.data,
      loading: state.Department.departments.loading,
      deleteSuccess: state.Department.deleteDepartment.data,
      deleteFailed: state.Department.deleteDepartment.error,
      createSuccess: state.Department.newDepartment.data,
      updateSuccess: state.Department.updatedDepartment.data,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess || updateSuccess || deleteSuccess) {
      dispatch(getDepartments());
    }
  }, [createSuccess, deleteSuccess, updateSuccess, dispatch]);

  const columns: any = [
    {
      title: "STT",
      // dataIndex: "id",
      align: "center",
      width: 50,
      render: (text: string, record: IDepartment, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Tên bộ môn",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Mã bộ môn",
      dataIndex: "code",
      width: 80,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      render: (email: string) => (
        <div className="w-full truncate">
          <Tooltip title={email}>{email}</Tooltip>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
    },
    {
      dataIndex: "action",
      align: "right",
      width: 50,
      render: (_: any, record: IDepartment) => (
        <ActionMenu
          onDelete={() => handleDelete(record)}
          onEdit={() => handleEdit(record)}
        />
      ),
    },
  ];

  const handleDelete = (record: IDepartment) => {
    setIsDelete(true);
    setRowData(record);
  };

  const handleEdit = (record: IDepartment) => {
    setIsVisibleModal(true);
    setRowData(record);
  };

  const acceptDelete = () => {
    if (rowData && rowData.id) {
      dispatch(deleteDepartmentRequest(rowData.id));
      setRowData(undefined);
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      api.success({
        message: "Thành công",
        description: "Bộ môn đã được xóa khỏi hệ thống",
      });
      dispatch(clearDepartmentAction());
      setIsDelete(false);
    }
    if (deleteFailed) {
      api.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại sau",
      });
      dispatch(clearDepartmentAction());
    }
  }, [api, deleteSuccess, deleteFailed, dispatch]);

  return (
    <div className="h-full flex flex-col">
      {contextHolder}
      <HeaderBar
        label="Thêm bộ môn"
        keyword={keyword}
        setKeyword={setKeyword}
        handleCreate={() => setIsVisibleModal(true)}
      />
      <div className="h-full flex flex-col bg-white p-4 rounded-xl">
        <Table
          columns={columns}
          dataSource={departments || []}
          className="table-h-full"
          pagination={false}
          loading={loading}
          rowKey={(record: IDepartment) => record.id as React.Key}
          scroll={{ y: "100%" }}
        />
      </div>
      <ModalDepartment
        open={isVisibleModal}
        onClose={() => {
          setIsVisibleModal(false);
          setRowData(undefined);
        }}
        api={api}
        rowData={rowData}
      />
      <ModalDelete
        visible={isDelete}
        setVisible={() => setIsDelete(false)}
        accept={acceptDelete}
        msg={"bộ môn này"}
      />
    </div>
  );
};

export default Department;
