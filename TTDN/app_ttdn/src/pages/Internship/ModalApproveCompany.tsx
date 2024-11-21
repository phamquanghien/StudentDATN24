import React from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import * as url from "@/api/url_helper";
import { NotificationInstance } from "antd/es/notification/interface";
import { IStudent } from "@/models/Student.ts";

interface ModalApproveCompanyProps {
  open: boolean;
  onClose: () => void;
  rowData?: IStudent;
  api: NotificationInstance;
}

const ModalApproveCompany: React.FC<ModalApproveCompanyProps> = ({
  open,
  onClose,
  rowData,
  api,
}) => {
  const rejectForm = () => {
    if (rowData && rowData.id) {
      axios
        .put(`${url.STUDENT}/${rowData.id}/company/approve?type=reject`)
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
        .put(`${url.STUDENT}/${rowData.id}/company/approve?type=approve`)
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
      footer={null}
      title="Thông tin thực tập"
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
              Tên công ty
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.company?.name}
            </td>
          </tr>

          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Lĩnh vực hoạt động
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.company?.field}
            </td>
          </tr>
          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Địa chỉ công ty
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.company?.address}
            </td>
          </tr>
          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Số điện thoại
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.company?.phone}
            </td>
          </tr>
          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Email
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.company?.email}
            </td>
          </tr>
          <tr>
            <th className=" p-2 text-left font-medium text-base border border-gray-200">
              Website
            </th>
            <td className=" p-2 text-base border border-gray-200">
              {rowData?.company?.website}
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

export default ModalApproveCompany;
