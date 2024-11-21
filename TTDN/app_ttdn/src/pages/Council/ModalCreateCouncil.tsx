import React, { useEffect } from "react";
import { NotificationInstance } from "antd/es/notification/interface";
import { Button, Form, FormProps, Modal, Table } from "antd";
import FloatInput from "@/components/FloatLabel/FloatInput.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/store/Department/slice.ts";
import { RootState } from "@/store";
import { getAdvisorsRequest } from "@/store/Advisor/slice.ts";
import "./style.scss";
import { getStudentsRequest } from "@/store/Student/slice.ts";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IStudent } from "@/models/Student.ts";
import { formatDateTime } from "@/feature/FormatDate.ts";
import {
  clearCouncilResponse,
  createNewCouncilRequest,
} from "@/store/Council/slice.ts";
import { PayloadCouncil } from "@/models/Council.ts";

interface ModalCreateCouncilProps {
  open: boolean;
  onClose: () => void;
  api: NotificationInstance;
}

const ModalCreateCouncil: React.FC<ModalCreateCouncilProps> = ({
  open,
  onClose,
  api,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [studentIds, setStudentIds] = React.useState<number[]>([]);
  const [studentOptions, setStudentOptions] = React.useState<any[]>([]);

  const { departments, advisors, students, createSuccess, createFailure } =
    useSelector(
      (state: RootState) => ({
        departments: state.Department.departments.data,
        advisors: state.Advisor.advisors.data,
        students: state.Student.students.data,
        createSuccess: state.Council.newCouncil.data,
        createFailure: state.Council.newCouncil.error,
      }),
      shallowEqual,
    );

  const closeModal = () => {
    onClose();
    form.resetFields();
    setStudentIds([]);
  };

  const handleDeleteStudent = (id: number) => {
    setStudentIds((prev) => prev.filter((item) => item !== id));
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text: string, record: IStudent, index: number) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "MSV",
      dataIndex: "code",
      key: "code",
    },
    {
      dataIndex: "id",
      key: "id",
      width: 50,
      align: "right",
      render: (id: number) => (
        <Button
          type="text"
          onClick={() => handleDeleteStudent(id)}
        >
          <TrashIcon className="w-4 h-5 text-red-500" />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (students) {
      const studentIdSet = new Set(studentIds);
      const filteredOptions = students.items.filter(
        (student) => !studentIdSet.has(student.id!),
      );

      const options = filteredOptions.map((student) => ({
        value: student.id,
        label: student.name + " - " + student.code,
      }));
      setStudentOptions(options);
      form.setFieldValue("studentIds", studentIds);
    }
  }, [form, students, studentIds]);

  const onFinish: FormProps<PayloadCouncil>["onFinish"] = (values) => {
    const payload = {
      name: values.name,
      reviewTime: formatDateTime(values.reviewTime),
      location: values.location,
      departmentID: values.departmentID,
      studentIds: values.studentIds,
      advisorIds: values.advisorIds,
    };
    dispatch(createNewCouncilRequest(payload));
  };

  useEffect(() => {
    if (createSuccess) {
      api.success({
        message: "Thành công",
        description: "Tạo hội đồng nghiệm thu thành công",
      });
      dispatch(clearCouncilResponse());
      closeModal();
    }
    if (createFailure) {
      api.error({
        message: "Thất bại",
        description: createFailure?.response?.data.message,
      });
      dispatch(clearCouncilResponse());
    }
  }, [api, createFailure, createSuccess]);

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      centered
      footer={null}
      width="70%"
      title="Tạo hội đồng nghiệm thu"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="py-4 flex gap-4">
          <div className="flex flex-col gap-4 w-1/2">
            <Form.Item
              name="departmentID"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <FloatInput
                label="Bộ môn"
                componenttype="select"
                required
                onDropdownVisibleChange={(open) => {
                  if (open) {
                    dispatch(getDepartments());
                  }
                }}
                options={departments?.map((department) => ({
                  value: department.id,
                  label: department.name,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <FloatInput
                label="Tên hội đồng"
                componenttype="input"
                required
              />
            </Form.Item>

            <Form.Item
              name="reviewTime"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <FloatInput
                label="Thời gian nghiệm thu"
                componenttype="datePicker"
                required
                showTime={{ format: "HH:mm" }}
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>

            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <FloatInput
                label="Địa điểm nghiệm thu"
                componenttype="input"
                required
              />
            </Form.Item>

            <Form.Item name="advisorIds">
              <FloatInput
                label="Thành viên hội đồng"
                componenttype="select"
                mode="multiple"
                required
                maxTagCount="responsive"
                className="selection-input-advisor"
                onDropdownVisibleChange={(open) => {
                  if (open && form.getFieldValue("departmentID")) {
                    dispatch(
                      getAdvisorsRequest({
                        page: 1,
                        limit: 100,
                        departmentID: form.getFieldValue("departmentID"),
                      }),
                    );
                  }
                }}
                options={
                  form.getFieldValue("departmentID") &&
                  advisors?.map((advisor) => ({
                    value: advisor.id,
                    label: advisor.name,
                  }))
                }
              />
            </Form.Item>
          </div>

          <div className="w-1/2  flex flex-col gap-4">
            <Form.Item name="studentIds">
              <FloatInput
                label="Sinh viên nghiệm thu"
                componenttype="select"
                mode="multiple"
                value={studentIds}
                required
                onChange={(value: number[]) => {
                  setStudentIds(value);
                }}
                tagRender={() => null as any}
                filterOption={(input, option) =>
                  option?.text?.toLowerCase().includes(input.toLowerCase()) ||
                  false
                }
                maxTagCount={0}
                suffixIcon={null}
                onDropdownVisibleChange={(open) => {
                  if (open && form.getFieldValue("departmentID")) {
                    dispatch(
                      getStudentsRequest({
                        page: 1,
                        limit: 100,
                        departmentID: form.getFieldValue("departmentID"),
                        type: "createCouncil",
                      }),
                    );
                  }
                }}
                options={form.getFieldValue("departmentID") && studentOptions}
              />
            </Form.Item>
            <Table
              columns={columns}
              className="h-full"
              dataSource={studentIds?.map((student: number) => ({
                ...students?.items.find((item) => item.id === student),
              }))}
              pagination={false}
              rowKey={(record) => record.id as React.Key}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            className="w-32 h-9"
            onClick={closeModal}
          >
            Huỷ
          </Button>
          <Button
            className="w-32 h-9"
            type="primary"
            htmlType={"submit"}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalCreateCouncil;
