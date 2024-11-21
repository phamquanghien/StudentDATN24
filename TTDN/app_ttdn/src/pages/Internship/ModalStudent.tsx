import FloatInput from "@/components/FloatLabel/FloatInput.tsx";
import { Button, Form, FormProps, Modal } from "antd";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getDepartments } from "@/store/Department/slice.ts";
import { IStudent } from "@/models/Student.ts";
import {
  clearStudentResponse,
  createStudentRequest,
  updateStudentRequest,
} from "@/store/Student/slice.ts";
import dayjs from "dayjs";
import { NotificationInstance } from "antd/es/notification/interface";

interface ModalStudentProps {
  open: boolean;
  onClose: () => void;
  rowData?: IStudent;
  api: NotificationInstance;
}

const ModalStudent: React.FC<ModalStudentProps> = ({
  open,
  onClose,
  rowData,
  api,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) dispatch(getDepartments());
  }, [open, dispatch]);

  const {
    departments,
    createSuccess,
    createFailed,
    updateSuccess,
    updateFailed,
  } = useSelector(
    (state: RootState) => ({
      departments: state.Department.departments.data,
      createSuccess: state.Student.newStudent.data,
      createFailed: state.Student.newStudent.error,
      updateSuccess: state.Student.updatedStudent.data,
      updateFailed: state.Student.updatedStudent.error,
    }),
    shallowEqual,
  );

  const onFinish: FormProps<IStudent>["onFinish"] = (values) => {
    if (rowData && rowData.id) {
      dispatch(
        updateStudentRequest({
          id: rowData.id,
          data: { ...values, id: rowData.id },
        }),
      );
      console.log(values.dateOfBirth);
    } else {
      dispatch(createStudentRequest(values));
    }
  };

  const handleCloseForm = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue({
        ...rowData,
        dateOfBirth: rowData.dateOfBirth
          ? dayjs(rowData.dateOfBirth).locale("vi")
          : undefined,
      });
      console.log(rowData.dateOfBirth);
    }
  }, [rowData, open, form]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      api.success({
        message: "Thành công",
        description: "Thao tác thành công",
      });
      handleCloseForm();
      dispatch(clearStudentResponse());
    }
    if (createFailed || updateFailed) {
      api.error({
        message: "Thất bại",
        description:
          createFailed?.response?.data.message ||
          updateFailed?.response?.data.message,
      });
      dispatch(clearStudentResponse());
    }
  }, [createSuccess, updateSuccess, createFailed, updateFailed, api, dispatch]);

  return (
    <Modal
      title="Thêm sinh viên"
      open={open}
      onCancel={handleCloseForm}
      centered
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        className="flex flex-col gap-3 py-2"
        onFinish={onFinish}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
          name="departmentID"
        >
          <FloatInput
            componenttype="select"
            label="Bộ môn"
            required
            options={departments?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
          name="name"
        >
          <FloatInput
            componenttype="input"
            label="Họ và tên"
            required
          />
        </Form.Item>
        <div className="flex justify-between gap-2">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
            name="course"
            className="w-1/2"
          >
            <FloatInput
              componenttype="input"
              label="Khoá"
              required
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
            className="w-1/2"
            name="class"
          >
            <FloatInput
              componenttype="input"
              label="Lớp"
              required
            />
          </Form.Item>
        </div>
        <div className="flex justify-between gap-2">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
            className="w-1/2"
            name="code"
          >
            <FloatInput
              componenttype="input"
              label="Mã sinh viên"
              required
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
            name="phone"
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
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
          name="email"
        >
          <FloatInput
            componenttype="input"
            label="Email"
            required
          />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
        >
          <FloatInput
            label="Ngày sinh"
            componenttype="datePicker"
            required={true}
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
          name="address"
        >
          <FloatInput
            componenttype="input"
            label="Địa chỉ"
          />
        </Form.Item>
        <Form.Item name="description">
          <FloatInput
            componenttype="textArea"
            label="Ghi chú"
            autoSize={{ minRows: 3 }}
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

export default ModalStudent;
