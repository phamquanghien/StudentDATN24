import React, { useEffect } from "react";
import { Button, DatePicker, Form, FormProps, Modal, notification } from "antd";
import FloatInput from "@/components/FloatLabel/FloatInput.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  clearStudentResponse,
  subscribeCompanyRequest,
} from "@/store/Student/slice.ts";
import { RootState } from "@/store";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface ModalSubscribeCompanyProps {
  open: boolean;
  onClose: () => void;
  id?: number;
}

const ModalSubscribeCompany: React.FC<ModalSubscribeCompanyProps> = ({
  open,
  onClose,
  id,
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();

  const { RangePicker } = DatePicker;

  const { subscribeSuccess, subscribeFailed } = useSelector(
    (state: RootState) => ({
      subscribeSuccess: state.Student.subscribeCompany.data,
      subscribeFailed: state.Student.subscribeCompany.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (subscribeSuccess) {
      api.success({
        message: "Thành công",
        description: "Đã gửi yêu cầu đăng ký địa điểm thực tập",
      });
      closeForm();
      dispatch(clearStudentResponse());
    }

    if (subscribeFailed) {
      api.error({
        message: "Thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau",
      });
      dispatch(clearStudentResponse());
    }
  }, [api, dispatch, subscribeFailed, subscribeSuccess]);

  const onFinish: FormProps<any>["onFinish"] = (values) => {
    const company = {
      name: values.name,
      field: values.field,
      address: values.address,
      phone: values.phone,
      email: values.email,
      website: values.website,
      startDate: dayjs(values.time[0]).format("YYYY-MM-DD"), // Chuyển về UTC
      endDate: dayjs(values.time[1]).format("YYYY-MM-DD"),
    };
    if (id) {
      dispatch(subscribeCompanyRequest({ id, company: company }));
      console.log(company.startDate);
    }
  };

  const closeForm = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={closeForm}
      centered
      title="Đăng ký địa điểm thực tập"
      footer={null}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        className="flex flex-col gap-3 pt-2"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Tên công ty"
            required
          />
        </Form.Item>
        <Form.Item
          name="field"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Lĩnh vực"
            required
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
        >
          <FloatInput
            componenttype="input"
            label="Địa chỉ"
            required
          />
        </Form.Item>
        <div className="flex justify-between gap-2">
          <Form.Item
            name="phone"
            className="w-1/2"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống",
              },
              {
                pattern: /^[0-9\b]+$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <FloatInput
              componenttype="input"
              label="Số điện thoại"
              required
            />
          </Form.Item>
          <Form.Item
            name="email"
            className="w-1/2"
          >
            <FloatInput
              componenttype="input"
              label="Email"
            />
          </Form.Item>
        </div>
        <Form.Item name="website">
          <FloatInput
            componenttype="input"
            label="Website"
          />
        </Form.Item>

        <Form.Item
          name="time"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống",
            },
          ]}
        >
          <RangePicker
            format={"DD/MM/YYYY"}
            className="w-full h-[40px]"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSubscribeCompany;
