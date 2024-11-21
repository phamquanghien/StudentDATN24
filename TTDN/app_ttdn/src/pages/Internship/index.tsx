import React, { useEffect, useState } from "react";
import FilterComponent from "@/pages/Dashboard/FilterComponent.tsx";
import {
  Badge,
  Button,
  Input,
  notification,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import ActionMenu from "@/components/ActionMenu.tsx";
import { getStatusTemplate } from "@/feature/getStatus.tsx";
import InternDetail from "@/pages/Internship/InternDetail.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IStudent } from "@/models/Student.ts";
import {
  clearStudentResponse,
  deleteStudentRequest,
  getStudentsRequest,
} from "@/store/Student/slice.ts";
import ModalStudent from "@/pages/Internship/ModalStudent.tsx";
import ModalDelete from "@/components/ModalDelete.tsx";
import useDebounce from "@/feature/hooks.ts";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ModalApproveCompany from "@/pages/Internship/ModalApproveCompany.tsx";
import ModalApproveTopic from "@/pages/Internship/ModalApproveTopic.tsx";
import dayjs from "dayjs";
import ModalImportScore from "./ModalImportScore.tsx";

const Internship = () => {
  const [api, contextHolder] = notification.useNotification();
  const [rowData, setRowData] = useState<IStudent | undefined>(undefined);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [visible, setVisible] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState("1");
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [isStudent, setIsStudent] = React.useState(false);

  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const [departmentId, setDepartmentId] = useState<number | undefined>();
  const [advisorId, setAdvisorId] = useState<number | undefined>();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [internId, setInternId] = useState<number | undefined>(undefined);

  const [isModalApproveCompany, setIsModalApproveCompany] =
    useState<boolean>(false);

  const [isModalApproveTopic, setIsModalApproveTopic] =
    useState<boolean>(false);

  const [visibleImportScore, setVisibleImportScore] = React.useState(false);

  const dispatch = useDispatch();

  const {
    students,
    loading,
    createSuccess,
    updateSuccess,
    deleteSuccess,
    deleteFailed,
    subscribeCompanySuccess,
    subscribeTopicSuccess,
    newScore,
  } = useSelector(
    (state: RootState) => ({
      students: state.Student.students.data,
      loading: state.Student.students.loading,
      createSuccess: state.Student.newStudent.data,
      updateSuccess: state.Student.updatedStudent.data,
      deleteSuccess: state.Student.deletedStudent.data,
      deleteFailed: state.Student.deletedStudent.error,
      subscribeCompanySuccess: state.Student.subscribeCompany.data,
      subscribeTopicSuccess: state.Student.subscribeTopic.data,
      newScore: state.Student.scores.data,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (!isModalApproveCompany && !isModalApproveTopic)
      dispatch(
        getStudentsRequest({
          page,
          limit,
          keyword: debouncedKeyword,
          departmentID: departmentId,
          advisorID: advisorId,
          status: status,
        }),
      );
  }, [
    dispatch,
    page,
    limit,
    debouncedKeyword,
    isModalApproveCompany,
    isModalApproveTopic,
    departmentId,
    advisorId,
    status,
  ]);

  useEffect(() => {
    if (
      createSuccess ||
      updateSuccess ||
      deleteSuccess ||
      subscribeCompanySuccess ||
      subscribeTopicSuccess ||
      newScore
    ) {
      dispatch(getStudentsRequest({ page, limit }));
    }
  }, [
    createSuccess,
    updateSuccess,
    deleteSuccess,
    dispatch,
    subscribeCompanySuccess,
    subscribeTopicSuccess,
    newScore,
  ]);

  const getApproveStatus = (record: IStudent): string => {
    const date = dayjs(record?.council?.reviewTime);
    const currenDate = dayjs();

    if (record.company?.status === "Chờ duyệt địa điểm") {
      return "Chờ duyệt địa điểm";
    }
    if (record.topic?.status === "Chờ duyệt đề tài") {
      return "Chờ duyệt đề tài";
    }
    if (record?.status === "Chờ bảo vệ" && date <= currenDate)
      return "Chờ bảo vệ";
    return "";
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      width: 50,
      key: "stt",
      render: (text: string, record: IStudent, index: number) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "code",
      key: "code",
      width: 120,
    },
    {
      title: "Bộ môn",
      dataIndex: "departmentID",
      key: "departmentID",
      width: 150,
      render: (_: string, record: IStudent) => record.department?.name,
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
      width: 100,
    },
    {
      title: "GVHD",
      dataIndex: "advisorID",
      key: "advisorID",
      render: (_: string, record: IStudent) => record.advisor?.name,
      width: 200,
    },
    {
      title: "Địa điểm thực tập",
      dataIndex: "companyID",
      key: "companyID",
      width: 180,
      render: (_: string, record: IStudent) =>
        record.company?.status === "Chờ duyệt địa điểm" ? (
          <Tag
            color="rgba(255,84,0,0.2)"
            style={{
              width: "120px",
              color: "rgb(255,84,0)",
              textAlign: "center",
            }}
          >
            Chờ duyệt
          </Tag>
        ) : (
          record.company?.name
        ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      width: 120,
      align: "center",
      render: (date: string, record: IStudent) =>
        record.company?.status !== "Chờ duyệt địa điểm" &&
        date &&
        dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: 130,
      align: "center",
      render: (date: string, record: IStudent) =>
        record.company?.status !== "Chờ duyệt địa điểm" &&
        date &&
        dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Đề tài",
      dataIndex: "topicID",
      key: "topicID",
      width: 200,
      render: (_: string, record: IStudent) =>
        record.topic?.status === "Chờ duyệt đề tài" ? (
          <Tag
            color="rgba(255,84,0,0.2)"
            style={{
              width: "120px",
              color: "rgb(255,84,0)",
              textAlign: "center",
            }}
          >
            Chờ duyệt
          </Tag>
        ) : (
          <Tooltip
            title={record.topic?.name}
            color="#54b2fe"
          >
            <div className="truncate w-48">{record.topic?.name}</div>
          </Tooltip>
        ),
    },
    {
      title: "Hội đồng",
      dataIndex: "councilID",
      key: "councilID",
      width: 150,
      align: "center",
      render: (_: string, record: IStudent) => record.council?.name,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: string) => getStatusTemplate(status),
    },
    {
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_: string, record: IStudent) => (
        <div onClick={(e) => e.stopPropagation()}>
          <ActionMenu
            onDelete={() => handleDelete(record)}
            onEdit={() => handleEdit(record)}
            type="student"
            onApproveCompany={() => handleApproveCompany(record)}
            onApproveTopic={() => handleApproveTopic(record)}
            onImportScore={() => handleImportScore(record)}
            approveStatus={getApproveStatus(record)}
          />
        </div>
      ),
    },
  ];

  const handleImportScore = (record: IStudent) => {
    setVisibleImportScore(true);
    setRowData(record);
  };

  const handleApproveTopic = (record: IStudent) => {
    setIsModalApproveTopic(true);
    setRowData(record);
  };

  const handleApproveCompany = (record: IStudent) => {
    setIsModalApproveCompany(true);
    setRowData(record);
  };

  const handleEdit = (record: IStudent) => {
    setRowData(record);
    setVisible(true);
  };

  const handleDelete = (record: IStudent) => {
    setIsDelete(true);
    setRowData(record);
  };

  const acceptDelete = () => {
    if (rowData && rowData.id) {
      dispatch(deleteStudentRequest(rowData.id));
      setRowData(undefined);
      setIsDelete(false);
    }
  };

  const TabsMenu = students?.counts?.map((item) => ({
    label: item.label,
    count: item.count,
  }));

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
    setStatus(selectedTab?.status);
  };

  useEffect(() => {
    if (deleteSuccess) {
      api.success({
        message: "Thành công",
        description: "Sinh viên đã được xóa khỏi hệ thống",
      });
      dispatch(clearStudentResponse());
    }
    if (deleteFailed) {
      api.error({
        message: "Thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại sau",
      });
      dispatch(clearStudentResponse());
    }
  }, [deleteSuccess, deleteFailed, api, dispatch]);

  return (
    <>
      {contextHolder}
      {isStudent ? (
        <InternDetail
          id={internId}
          back={() => setIsStudent(false)}
        />
      ) : (
        <div className="h-full flex flex-col gap-2">
          <div className="flex gap-4 justify-between">
            <Button
              type={"primary"}
              onClick={() => setVisible(true)}
            >
              Thêm sinh viên
            </Button>
            <Input
              placeholder="Tìm kiếm"
              className="w-1/2"
              prefix={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <FilterComponent
            className="flex justify-between pb-2 gap-4"
            getDepartmentId={setDepartmentId}
            getAdvisorId={setAdvisorId}
          />
          <div className="bg-white p-4 rounded-xl h-full flex flex-col">
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              className="m-0"
              onChange={onTabChange}
            />
            <Table
              columns={columns}
              dataSource={students?.items}
              className="table-h-full no-radius-table"
              pagination={{
                total: students?.totalRecords,
                current: page,
                pageSize: limit,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setLimit(pageSize || 10);
                },
                onShowSizeChange: (current, size) => {
                  setPage(current);
                  setLimit(size);
                },
              }}
              loading={loading}
              rowKey={(record) => record.id as React.Key}
              scroll={{
                x: "max-content",
                y: "calc(100vh - 350px)",
              }}
              onRow={(record) => ({
                onClick: () => {
                  setIsStudent(true);
                  setInternId(record?.id);
                },
              })}
            />
          </div>
        </div>
      )}
      <ModalStudent
        open={visible}
        onClose={() => setVisible(false)}
        api={api}
        rowData={rowData}
      />
      <ModalDelete
        visible={isDelete}
        setVisible={() => setIsDelete(false)}
        accept={acceptDelete}
        msg={`sinh viên ${rowData?.name}`}
      />
      <ModalApproveCompany
        open={isModalApproveCompany}
        onClose={() => {
          setIsModalApproveCompany(false);
          setRowData(undefined);
        }}
        rowData={rowData}
        api={api}
      />
      <ModalApproveTopic
        open={isModalApproveTopic}
        onClose={() => {
          setIsModalApproveTopic(false);
          setRowData(undefined);
        }}
        rowData={rowData}
        api={api}
      />
      <ModalImportScore
        open={visibleImportScore}
        onClose={() => setVisibleImportScore(false)}
        rowData={rowData}
        api={api}
      />
    </>
  );
};

export default Internship;
