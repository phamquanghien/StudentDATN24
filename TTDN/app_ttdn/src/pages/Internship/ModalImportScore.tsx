import React, { useEffect } from "react";
import { IStudent } from "@/models/Student.ts";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  clearStudentResponse,
  importScoreRequest,
} from "@/store/Student/slice.ts";
import { NotificationInstance } from "antd/es/notification/interface";

interface ModalImportScoreProps {
  open: boolean;
  onClose: () => void;
  rowData?: IStudent;
  api: NotificationInstance;
}

const ModalImportScore: React.FC<ModalImportScoreProps> = ({
  open,
  onClose,
  api,
  rowData,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { importSuccess, importFailure } = useSelector(
    (state: RootState) => ({
      importSuccess: state.Student.scores.data,
      importFailure: state.Student.scores.error,
    }),
    shallowEqual,
  );

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    if (rowData && rowData.id) {
      dispatch(
        importScoreRequest({
          id: rowData.id,
          score: {
            firstScore: Number(values.firstScore),
            secondScore: Number(values.secondScore),
            thirdScore: Number(values.thirdScore),
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (importSuccess) {
      api.success({
        message: "Thành công",
        description: "Nhập điểm thành công",
      });
      handleCancel();
      dispatch(clearStudentResponse());
    }
    if (importFailure) {
      api.error({
        message: "Thất bại",
        description: "Nhập điểm thất bại",
      });
      dispatch(clearStudentResponse());
    }
  }, [api, dispatch, importFailure, importSuccess]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Kết quả nghiệm thu"
      footer={null}
      centered
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Điểm thứ 1"
          name="firstScore"
          rules={[{ required: true, message: "Vui lòng nhập điểm thứ 1" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Điểm thứ 2"
          name="secondScore"
          rules={[{ required: true, message: "Vui lòng nhập điểm thứ 2" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Điểm thứ 3"
          name="thirdScore"
        >
          <Input />
        </Form.Item>

        <div className="flex justify-center gap-4">
          <Button
            className="w-32"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            className="w-32"
            type="primary"
            htmlType="submit"
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalImportScore;
