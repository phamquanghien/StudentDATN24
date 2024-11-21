import React, { useEffect } from "react";
import { Button, Form, FormProps, Modal, notification } from "antd";
import FloatInput from "@/components/FloatLabel/FloatInput.tsx";
import { Topic } from "@/models/Topic.ts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  clearStudentResponse,
  subscribeTopicRequest,
} from "@/store/Student/slice.ts";
import { RootState } from "@/store";

interface ModalSubscribeTopicProps {
  open: boolean;
  onClose: () => void;
  id?: number;
}

const ModalSubscribeTopic: React.FC<ModalSubscribeTopicProps> = ({
  open,
  onClose,
  id,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const { subscribeSuccess, subscribeFailed } = useSelector(
    (state: RootState) => ({
      subscribeSuccess: state.Student.subscribeTopic.data,
      subscribeFailed: state.Student.subscribeTopic.error,
    }),
    shallowEqual,
  );

  const onFinish: FormProps<Topic>["onFinish"] = (values) => {
    if (id) dispatch(subscribeTopicRequest({ id, topic: values }));
  };

  const closeForm = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (subscribeSuccess) {
      api.success({
        message: "Thành công",
        description: "Đã gửi yêu cầu đăng ký đề tài thực tập",
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

  return (
    <Modal
      open={open}
      onCancel={closeForm}
      centered
      title="Đăng ký đề tài thực tập"
      footer={null}
    >
      {contextHolder}
      <Form
        form={form}
        className="flex flex-col gap-4 py-2"
        onFinish={onFinish}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đề tài",
            },
          ]}
          name="name"
        >
          <FloatInput
            componenttype="textArea"
            label="Nhập tên đề tài"
            required
            autoSize={{ minRows: 2 }}
          />
        </Form.Item>

        <Form.Item name="description">
          <FloatInput
            componenttype="textArea"
            label="Ghi chú"
            autoSize={{ minRows: 3 }}
          />
        </Form.Item>
        <div className="text-center">
          <Button
            type="primary"
            htmlType={"submit"}
          >
            Gửi duyệt
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalSubscribeTopic;
