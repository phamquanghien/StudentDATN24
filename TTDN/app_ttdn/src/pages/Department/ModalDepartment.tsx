import React, { useEffect } from "react";
import { Button, Form, FormProps, Modal } from "antd";
import { IDepartment } from "@/models/Department.ts";
import FloatInput from "@/components/FloatLabel/FloatInput.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  clearDepartmentAction,
  createDepartmentRequest,
  updateDepartmentRequest,
} from "@/store/Department/slice.ts";
import { RootState } from "@/store";
import { NotificationInstance } from "antd/es/notification/interface";

interface ModalDepartmentProps {
  open: boolean;
  onClose: () => void;
  rowData?: IDepartment;
  api: NotificationInstance;
}

const ModalDepartment: React.FC<ModalDepartmentProps> = ({
  open,
  onClose,
  rowData,
  api,
}) => {
  const [form] = Form.useForm();

  const { createSuccess, createFailed, updateSuccess, updateFail } =
    useSelector(
      (state: RootState) => ({
        createSuccess: state.Department.newDepartment.data,
        createFailed: state.Department.newDepartment.error,
        updateSuccess: state.Department.updatedDepartment.data,
        updateFail: state.Department.updatedDepartment.error,
      }),
      shallowEqual,
    );

  const handleCloseForm = () => {
    onClose();
    form.resetFields();
  };

  type FieldType = {
    id: number;
    name: string;
    code: string;
    phone: string;
    email: string;
    address: string;
    description: string;
  };

  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (rowData && rowData.id) {
      dispatch(
        updateDepartmentRequest({
          id: rowData.id,
          data: { ...values, id: rowData.id },
        }),
      );
    } else {
      dispatch(createDepartmentRequest(values));
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      api.success({
        message: "Thành công",
        description: createSuccess
          ? "Tạo bộ môn thành công"
          : "Cập nhật bộ môn thành công",
      });
      dispatch(clearDepartmentAction());
      handleCloseForm();
    }
    if (createFailed || updateFail) {
      api.error({
        message: "Thất bại",
        description: "Có lỗi xảy ra vui lòng thử lại",
      });
      dispatch(clearDepartmentAction());
    }
  }, [createSuccess, createFailed, api, dispatch, updateSuccess, updateFail]);

  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue(rowData);
    }
  }, [rowData, open]);

  return (
    <Modal
      title={rowData ? "Cập nhật bộ môn" : "Thêm mới bộ môn"}
      open={open}
      onCancel={handleCloseForm}
      footer={null}
      centered={true}
    >
      <Form
        form={form}
        layout={"vertical"}
        className="py-4 flex flex-col gap-3"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bộ môn",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Tên bộ môn"
            required
          />
        </Form.Item>

        <div className="flex justify-between gap-2">
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã bộ môn",
              },
            ]}
            className="w-1/2"
          >
            <FloatInput
              componenttype="input"
              label="Mã bộ môn"
              required
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
            className="w-1/2"
          >
            <FloatInput
              componenttype="input"
              label="Số điện thoại"
              required
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ email",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Email"
            required
          />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ văn phòng",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Địa chỉ văn phòng"
            required
          />
        </Form.Item>

        <Form.Item name="description">
          <FloatInput
            componenttype="textArea"
            label="Mô tả, ghi chú"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <div className="flex justify-center gap-2">
          <Button
            className="w-32"
            onClick={handleCloseForm}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            className="w-32"
            htmlType="submit"
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalDepartment;
