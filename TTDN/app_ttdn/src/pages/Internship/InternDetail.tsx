import React, { useEffect } from "react";
import { Button } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getStudentByIdRequest } from "@/store/Student/slice.ts";
import dayjs from "dayjs";
import ModalScribeAdvisor from "@/pages/Internship/ModalScribeAdvisor.tsx";
import ModalSubscribeCompany from "@/pages/Internship/ModalSubscribeCompany.tsx";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import ModalSubscribeTopic from "@/pages/Internship/ModalSubscribeTopic.tsx";
import { formatDate, formatDateTimeVi } from "@/feature/FormatDate.ts";
import {
  calculateScore,
  convertTo4Score,
  convertToCharacter,
} from "@/feature/calculateScore.ts";

interface InternDetailProps {
  id?: number;
  back?: () => void;
}

const InternDetail: React.FC<InternDetailProps> = ({ id, back }) => {
  const [isModalSubscribeAdvisor, setIsModalSubscribeAdvisor] =
    React.useState(false);
  const [isModalSubscribeCompany, setIsModalSubscribeCompany] =
    React.useState(false);
  const [isModalSubscribeTopic, setIsModalSubscribeTopic] =
    React.useState(false);

  const dispatch = useDispatch();

  const { dataIntern, successAdvisor, successCompany, successTopic } =
    useSelector(
      (state: RootState) => ({
        dataIntern: state.Student.studentById.data,
        successAdvisor: state.Student.subscribeAdvisor.data,
        successCompany: state.Student.subscribeCompany.data,
        successTopic: state.Student.subscribeTopic.data,
      }),
      shallowEqual,
    );

  useEffect(() => {
    if (id) dispatch(getStudentByIdRequest(id));
  }, [dispatch, id, successAdvisor, successCompany, successTopic]);

  const getButtonAction = (
    status: string | undefined,
    advisor: number | undefined,
    company: number | undefined,
    topic: number | undefined,
  ) => {
    switch (status) {
      case "Mới":
        return !advisor ? (
          <Button
            type="primary"
            onClick={() => setIsModalSubscribeAdvisor(true)}
          >
            Đăng ký giảng viên hướng dẫn
          </Button>
        ) : (
          !company && (
            <Button
              type="primary"
              onClick={() => setIsModalSubscribeCompany(true)}
            >
              Đăng ký địa điểm thực tập
            </Button>
          )
        );
      case "Đang thực tập":
        return (
          company &&
          !topic && (
            <Button
              onClick={() => setIsModalSubscribeTopic(true)}
              type="primary"
            >
              Đăng ký đề tài thực tập
            </Button>
          )
        );
      default:
        return <></>;
    }
  };

  const score = calculateScore(
    dataIntern?.firstScore,
    dataIntern?.secondScore,
    dataIntern?.thirdScore,
  );

  const characterScore = convertToCharacter(score);

  const gpa = convertTo4Score(characterScore);

  return (
    <div className=" rounded-xl h-full flex gap-4">
      <div className=" bg-white p-4 rounded-xl w-1/3">
        <div className="flex items-center justify-between  mb-3">
          <Button
            shape="circle"
            onClick={back}
          >
            <ArrowLeftIcon className="w-5 h5" />
          </Button>
          <h1 className="text-xl font-bold">Thông tin sinh viên</h1>
        </div>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className=" p-2 bg-gray-200 text-left font-bold">
                Thông tin
              </th>
              <th className=" p-2 bg-gray-200 text-left font-bold">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Họ và tên
              </th>
              <td className=" p-2 text-base">{dataIntern?.name}</td>
            </tr>

            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Mã sinh viên
              </th>
              <td className=" p-2 text-base">{dataIntern?.code}</td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Ngày sinh
              </th>
              <td className=" p-2 text-base">
                {dayjs(dataIntern?.dateOfBirth).format("DD/MM/YYYY")}
              </td>
            </tr>

            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Điện thoại
              </th>
              <td className=" p-2 text-base">{dataIntern?.phone}</td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">Email</th>
              <td className=" p-2 text-base">{dataIntern?.email}</td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">Bộ môn</th>
              <td className=" p-2 text-base">{dataIntern?.department?.name}</td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">Lớp</th>
              <td className=" p-2 text-base">{dataIntern?.class}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" bg-white p-4 rounded-xl w-2/3">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">Thông tin thực tập</h1>
          {getButtonAction(
            dataIntern?.status,
            dataIntern?.advisorID,
            dataIntern?.companyID,
            dataIntern?.topic?.id,
          )}
        </div>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className=" p-2 bg-gray-200 text-left font-bold">
                Thông tin
              </th>
              <th className=" p-2 bg-gray-200 text-left font-bold">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className=" p-2 text-left font-medium text-base w-1/3">
                Trạng thái thực tập
              </th>
              <td className=" p-2 text-base">{dataIntern?.status}</td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Giảng viên hướng dẫn
              </th>
              <td className=" p-2 text-base">
                {dataIntern?.advisor && dataIntern.advisor?.name}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Công ty thực tập
              </th>
              <td className=" p-2 text-base">
                {dataIntern?.company?.status !== "Chờ duyệt địa điểm"
                  ? dataIntern?.company?.name
                  : "Chờ duyệt"}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Địa chỉ công ty
              </th>
              <td className=" p-2 text-base">
                {dataIntern?.company?.status !== "Chờ duyệt địa điểm" &&
                  dataIntern?.company?.address}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Đề tài thực tập
              </th>
              <td className=" p-2 text-base">
                {dataIntern?.topic?.status !== "Chờ duyệt đề tài"
                  ? dataIntern?.topic?.name
                  : "Chờ duyệt"}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Thời gian thực tập
              </th>
              {dataIntern?.company?.status !== "Chờ duyệt địa điểm" && (
                <td className=" p-2 text-base">
                  {formatDate(dataIntern?.startDate)} -{" "}
                  {formatDate(dataIntern?.endDate)}
                </td>
              )}
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Thời gian nghiệm thu
              </th>
              <td className=" p-2 text-base">
                {formatDateTimeVi(dataIntern?.council?.reviewTime)}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Địa điểm nghiệm thu
              </th>
              <td className=" p-2 text-base">
                {dataIntern?.council?.location}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">
                Kết quả nghiệm thu
              </th>
              <td className=" p-2 text-base">
                {dataIntern?.firstScore} - {dataIntern?.secondScore} -{" "}
                {dataIntern?.thirdScore}
              </td>
            </tr>
            <tr>
              <th className=" p-2 text-left font-medium text-base">Ghi chú</th>
              <td className=" p-2 text-base"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <ModalScribeAdvisor
        open={isModalSubscribeAdvisor}
        onClose={() => setIsModalSubscribeAdvisor(false)}
        id={id}
        departmentId={dataIntern?.departmentID}
      />
      <ModalSubscribeCompany
        open={isModalSubscribeCompany}
        onClose={() => setIsModalSubscribeCompany(false)}
        id={id}
      />
      <ModalSubscribeTopic
        open={isModalSubscribeTopic}
        onClose={() => setIsModalSubscribeTopic(false)}
        id={id}
      />
    </div>
  );
};

export default InternDetail;
