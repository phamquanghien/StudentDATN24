import React from "react";
import FilterComponent from "@/pages/Dashboard/FilterComponent.tsx";
import { Badge, Dropdown, MenuProps, Table, Tabs } from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import { getStatusTemplate } from "@/feature/getStatus.tsx";
import { DownOutlined, FileExcelOutlined } from "@ant-design/icons";
import { dataInternship } from "@/pages/Internship/getSampleData.tsx";

const Internship = () => {
  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      width: 50,
      key: "stt",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      key: "studentId",
      width: 120,
    },
    {
      title: "Bộ môn",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Khoá",
      dataIndex: "course",
      key: "course",
      width: 60,
    },
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "GVHD",
      dataIndex: "advisor",
      key: "advisor",
    },
    {
      title: "Địa điểm thực tập",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "timeStart",
      key: "timeStart",
      width: 120,
      align: "center",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "timeEnd",
      key: "timeEnd",
      width: 130,
      align: "center",
    },
    {
      title: "Hội đồng",
      dataIndex: "council",
      key: "council",
      width: 130,
      align: "center",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => getStatusTemplate(status),
    },
    {
      dataIndex: "action",
      key: "action",
      align: "right",
      render: () => <ActionMenu />,
    },
  ];

  const [activeTab, setActiveTab] = React.useState("1");

  const TabsMenu = [
    {
      key: "1",
      label: "Tất cả",
      count: 1000,
    },
    {
      key: "2",
      label: "Mới",
      count: 900,
    },
    {
      key: "3",
      label: "Đang thực tập",
      count: 80,
    },
    {
      key: "4",
      label: "Chờ bảo vệ",
      count: 10,
    },
    {
      key: "5",
      label: "Hoàn thành",
      count: 8,
    },
    {
      key: "6",
      label: "Không đạt",
      count: 2,
    },
  ];

  const tabItems = TabsMenu?.map((item: any, index: number) => ({
    key: (index + 1).toString(),
    label: (
      <div className="flex gap-1">
        <div>{item.label}</div>
        <Badge
          count={
            item.count > 0
              ? new Intl.NumberFormat("vi-VN").format(item.count)
              : 0
          }
          overflowCount={100000}
          style={{
            backgroundColor:
              activeTab === (index + 1).toString() ? "#54b2fe" : "#c3c0c0",
          }}
        ></Badge>
      </div>
    ),
    count: item.count,
    status: item.label,
  }));

  const onTabChange = (key: string) => {
    setActiveTab(key);

    const selectedTab = tabItems?.find((item: any) => item.key === key);
  };

  const items: MenuProps["items"] = [
    {
      label: "GVHD",
      key: "1",
      icon: <FileExcelOutlined />,
      onClick: () => console.log("Nhập từ Excel"),
    },
    {
      label: "Địa điểm thực tập",
      key: "2",
      icon: <FileExcelOutlined />,
      onClick: () => console.log("Nhập từ Excel"),
    },
    {
      label: "Đề tài",
      key: "2",
      icon: <FileExcelOutlined />,
      onClick: () => console.log("Nhập từ Excel"),
    },
  ];

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex gap-4">
        <Dropdown.Button
          type="primary"
          icon={<DownOutlined />}
          menu={{ items }}
        >
          Đăng ký
        </Dropdown.Button>
      </div>
      <FilterComponent className="flex justify-between pb-2 gap-4" />
      <div className="bg-white p-4 rounded-xl h-full flex flex-col">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          className="m-0"
          onChange={onTabChange}
        />
        <Table
          columns={columns}
          dataSource={dataInternship}
          className="table-h-full no-radius-table"
          rowKey={(record) => record.studentId}
          scroll={{
            x: "max-content",
            y: "calc(100vh - 350px)",
          }}
        />
      </div>
    </div>
  );
};

export default Internship;
