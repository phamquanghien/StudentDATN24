import { Button, Input, Table, TableProps } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ActionMenu from "@/components/ActionMenu";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ModalDelete from "@/components/ModalDelete.tsx";
import { ICouncil } from "@/models/Council.ts";
import { NotificationInstance } from "antd/es/notification/interface";
import {
  clearCouncilResponse,
  deleteCouncilRequest,
  getCouncilsRequest,
} from "@/store/Council/slice.ts";
import "./style.scss";
import ModalCreateCouncil from "@/pages/Council/ModalCreateCouncil.tsx";

interface CategoryProps {
  selectedCouncil?: ICouncil;
  setSelectedCouncil: React.Dispatch<
    React.SetStateAction<ICouncil | undefined>
  >;
  api: NotificationInstance;
}

const Category: React.FC<CategoryProps> = ({
  selectedCouncil,
  setSelectedCouncil,
  api,
}) => {
  const [isVisibleAddCategory, setIsVisibleAddCategory] =
    useState<boolean>(false);
  const [isVisibleEditCategory, setIsVisibleEditCategory] =
    useState<boolean>(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);

  const { councils, loading, deleteSuccess, deleteFailure, createSuccess } =
    useSelector(
      (state: RootState) => ({
        councils: state.Council.councils.data,
        loading: state.Council.councils.loading,
        deleteSuccess: state.Council.deleteCouncil.data,
        createSuccess: state.Council.newCouncil.data,
        deleteFailure: state.Council.deleteCouncil.error,
      }),
      shallowEqual,
    );

  useEffect(() => {
    if (councils && councils.length > 0) {
      setSelectedCouncil(councils[0]);
    }
  }, [councils]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCouncilsRequest());
  }, [dispatch, deleteSuccess, createSuccess]);

  const handleEdit = (record: ICouncil) => {
    setIsVisibleEditCategory(true);
    setSelectedCouncil(record);
  };

  const handleDelete = (record: ICouncil) => {
    setIsVisibleDelete(true);
    setSelectedCouncil(record);
  };

  const accept = () => {
    setIsVisibleDelete(false);
    if (selectedCouncil?.id) dispatch(deleteCouncilRequest(selectedCouncil.id));
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text) => <p className="font-bold">{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      align: "end",
      render: (_: any, record: ICouncil) => (
        <ActionMenu
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (deleteSuccess) {
      api.success({
        message: "Thành công",
        description: "Hội đồng đã được xóa khỏi hệ thống",
      });
      dispatch(clearCouncilResponse());
    }
    if (deleteFailure) {
      api.error({
        message: "Thất bại",
        description: "Hội đồng không thể xóa khỏi hệ thống",
      });
      dispatch(clearCouncilResponse());
    }
  }, [dispatch, deleteFailure, deleteSuccess]);

  return (
    <div
      className="bg-white p-3 rounded-normal md:w-1/3 flex flex-col h-full"
      style={{ minWidth: "350px" }}
    >
      <h1 className="font-bold text-xl pb-3">Danh sách hội đồng</h1>
      <div className="flex gap-2 pb-5">
        <Input
          placeholder="Tìm kiếm"
          className="rounded-normal"
          // value={keyword}
          // onChange={(e) => setKeyword(e.target.value)}
          prefix={
            <MagnifyingGlassIcon className="mr-1 w-4 h-5 text-gray-400" />
          }
        />
        <Button
          type="primary"
          className="rounded-normal"
          onClick={() => setIsVisibleAddCategory(true)}
        >
          Thêm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={councils}
        showHeader={false}
        pagination={false}
        size="small"
        loading={loading}
        scroll={{ x: "auto", y: "100%" }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedCouncil(record);
          },
          style: {
            cursor: "pointer",
            backgroundColor: selectedCouncil === record ? "#54b2fe" : undefined,
            color: selectedCouncil === record ? "#fff" : undefined,
          },
          className: selectedCouncil === record ? "selected-row" : "",
        })}
        rowKey={(record) => record.id}
        className="table-h-full row-hover-bg-none council__category__table"
      />
      <ModalDelete
        visible={isVisibleDelete}
        setVisible={() => setIsVisibleDelete(false)}
        accept={accept}
        msg={"hội đồng"}
      />
      <ModalCreateCouncil
        open={isVisibleAddCategory}
        onClose={() => setIsVisibleAddCategory(false)}
        api={api}
      />
    </div>
  );
};

export default Category;
