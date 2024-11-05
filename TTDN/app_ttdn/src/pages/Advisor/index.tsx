import React, { useEffect } from "react";
import HeaderBar from "@/pages/Student/HeaderBar.tsx";
import { Table } from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAdvisorsRequest } from "@/store/Advisor/slice.ts";
import { RootState } from "@/store";

const Advisor = () => {
  const [keyword, setKeyword] = React.useState("");
  const dispatch = useDispatch();

  const { advisors } = useSelector(
    (state: RootState) => ({
      advisors: state.Advisor.advisors.data,
    }),
    shallowEqual,
  );

  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      key: "stt",
      render: (text: any, record: any, index: number) => index + 1,
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Bộ môn",
      dataIndex: "departmentID",
      key: "departmentID",
    },
    {
      dataIndex: "action",

      key: "action",
      align: "right",
      render: () => <ActionMenu />,
    },
  ];

  useEffect(() => {
    dispatch(getAdvisorsRequest());
  }, [dispatch]);

  return (
    <div className="h-full flex flex-col justify-between">
      <HeaderBar
        label={"Thêm giảng viên"}
        keyword={keyword}
        setKeyword={setKeyword}
        handleCreate={() => {}}
      />
      <div className="h-full flex flex-col justify-between bg-white p-4 rounded-xl">
        <Table
          columns={columns}
          dataSource={advisors}
          className="table-h-full no-radius-table"
        />
      </div>
    </div>
  );
};

export default Advisor;
