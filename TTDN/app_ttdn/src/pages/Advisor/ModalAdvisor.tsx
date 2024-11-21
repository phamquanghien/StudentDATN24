import React, { useEffect } from "react";
import { IAdvisor } from "@/models/Advisor.ts";
import { NotificationInstance } from "antd/es/notification/interface";
import { Button, Form, FormProps, Modal } from "antd";
import FloatInput from "@/components/FloatLabel/FloatInput.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/store/Department/slice.ts";
import { RootState } from "@/store";
import {
  clearAdvisorResponse,
  createAdvisorRequest,
  updateAdvisorRequest,
} from "@/store/Advisor/slice.ts";
import dayjs from "dayjs";

interface ModalAdvisorProps {
  open: boolean;
  onClose: () => void;
  rowData?: IAdvisor;
  api: NotificationInstance;
}

const ModalAdvisor: React.FC<ModalAdvisorProps> = ({
  open,
  onClose,
  rowData,
  api,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const {
    departments,
    createSuccess,
    createFailed,
    updateSuccess,
    updateFailed,
  } = useSelector(
    (state: RootState) => ({
      departments: state.Department.departments.data,
      createSuccess: state.Advisor.newAdvisor.data,
      createFailed: state.Advisor.newAdvisor.error,
      updateSuccess: state.Advisor.updatedAdvisor.data,
      updateFailed: state.Advisor.updatedAdvisor.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (open) dispatch(getDepartments());
  }, [open, dispatch]);

  const handleCloseForm = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue({
        ...rowData,
        dateOfBirth: rowData.dateOfBirth
          ? dayjs(rowData.dateOfBirth)
          : undefined,
      });
    }
  }, [rowData, open, form]);

  const onFinish: FormProps<IAdvisor>["onFinish"] = (values) => {
    if (rowData && rowData.id) {
      dispatch(
        updateAdvisorRequest({
          id: rowData.id,
          data: { ...values, id: rowData.id },
        }),
      );
    } else {
      dispatch(createAdvisorRequest(values));
    }
    handleCloseForm();
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      api.success({
        message: "Thành công",
        description: createSuccess
          ? "Tạo giảng viên thành công"
          : "Cập nhật giảng viên thành công",
      });
      dispatch(clearAdvisorResponse());
      handleCloseForm();
    }
    if (createFailed || updateFailed) {
      api.error({
        message: "Thất bại",
        description: "Có lỗi xảy ra vui lòng thử lại",
      });
      dispatch(clearAdvisorResponse());
    }
  }, [createSuccess, createFailed, api, dispatch, updateSuccess, updateFailed]);

  return (
    <Modal
      open={open}
      onCancel={handleCloseForm}
      centered
      footer={null}
      title={rowData ? "Cập nhật giảng viên" : "Thêm giảng viên"}
    >
      <Form
        form={form}
        layout={"vertical"}
        className="py-4 flex flex-col gap-4"
        onFinish={onFinish}
      >
        <Form.Item
          name="departmentID"
          rules={[
            {
              required: true,
              message: "Bộ môn không được để trống",
            },
          ]}
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
          name="name"
          rules={[
            {
              required: true,
              message: "Tên giảng viên không được để trống",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Tên giảng viên"
            required
          />
        </Form.Item>

        <div className="flex justify-between gap-2">
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
            className="w-1/2"
          >
            <FloatInput
              componenttype="input"
              label="Mã giảng viên"
              required
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "SĐT không được để trống",
              },
              {
                pattern: new RegExp("^(0)[0-9]{9,10}$", "g"),
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
              message: "Email không được để trống",
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

        <div className="flex justify-between gap-2">
          <Form.Item
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
            ]}
            className="w-1/2"
          >
            <FloatInput
              label="Ngày sinh"
              componenttype="datePicker"
              required={true}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item
            name="maxSlot"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                pattern: new RegExp("^[0-9]*$", "g"),
                message: "Chỉ tiêu sinh viên không hợp lệ",
              },
            ]}
            className="w-1/2"
          >
            <FloatInput
              label="Chỉ tiêu sinh viên"
              componenttype="input"
              required={true}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Địa chỉ không được để trống",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Địa chỉ"
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

export default ModalAdvisor;
