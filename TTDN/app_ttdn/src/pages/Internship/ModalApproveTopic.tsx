import React from "react";
import { IStudent } from "@/models/Student.ts";
import { Button, Modal } from "antd";
import axios from "axios";
import * as url from "@/api/url_helper.ts";
import { NotificationInstance } from "antd/es/notification/interface";

interface ModalApproveTopicProps {
  open: boolean;
  onClose: () => void;
  rowData?: IStudent;
  api: NotificationInstance;
}

const ModalApproveTopic: React.FC<ModalApproveTopicProps> = ({
  open,
  onClose,
  rowData,
  api,
}) => {
  const rejectForm = () => {
    if (rowData && rowData.id) {
      axios
        .put(`${url.STUDENT}/${rowData.id}/topic/approve?type=reject`)
        .then(() => {
          api.success({
            message: "Thành công",
            description: "Đã từ chối yêu cầu",
          });
          onClose();
        })
        .catch((e) => {
          api.error({
            message: "Thất bại",
            description: "Có lỗi xảy ra. Vui lòng thử lại",
          });
        });
    }
  };

  const approveForm = () => {
    if (rowData && rowData.id) {
      axios
        .put(`${url.STUDENT}/${rowData.id}/topic/approve?type=approve`)
        .then(() => {
          api.success({
            message: "Thành công",
            description: "Yêu cầu đã được phê duyệt",
          });
          onClose();
        })
        .catch((e) => {
          api.error({
            message: "Thất bại",
            description: "Có lỗi xảy ra. Vui lòng thử lại",
          });
        });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title={"Thông tin đề tài"}
      footer={null}
    >
      <table className="border-collapse border border-gray-200 w-full">
        <tbody>
          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Sinh viên
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.name}
            </td>
          </tr>

          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Mã sinh viên
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.code}
            </td>
          </tr>
          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Đề tài
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.topic?.name}
            </td>
          </tr>

          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Ghi chú
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.topic?.description}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-2 mt-5">
        <Button
          className="bg-orange-500 text-white w-32"
          onClick={rejectForm}
        >
          Từ chối
        </Button>
        <Button
          type="primary"
          className="w-32"
          onClick={approveForm}
        >
          Duyệt
        </Button>
      </div>
    </Modal>
  );
};

export default ModalApproveTopic;
