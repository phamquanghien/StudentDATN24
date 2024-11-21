import React from "react";
import { Select } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAdvisorsRequest } from "@/store/Advisor/slice.ts";
import { getDepartments } from "@/store/Department/slice.ts";
import { renderOptions } from "@/feature/renderOptions.ts";
import { RootState } from "@/store";

interface FilterComponentProps {
  className?: string;
  getDepartmentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  getAdvisorId?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  className,
  getDepartmentId,
  getAdvisorId,
}) => {
  const dispatch = useDispatch();
  const [departmentId, setDepartmentId] = React.useState<number | undefined>();

  const { advisors, departments } = useSelector(
    (state: RootState) => ({
      advisors: state.Advisor.advisors.data,
      departments: state.Department.departments.data,
    }),
    shallowEqual,
  );

  return (
    <div className={className}>
      <div className="w-1/2 flex gap-4">
        <Select
          showSearch
          defaultValue={"jack2"}
          placeholder="Năm học"
          optionFilterProp="label"
          className="w-1/2 rounded-xl "
          // onChange={onChange}
          // onSearch={onSearch}
          options={[
            {
              value: "jack2",
              label: "2024 - 2025",
            },
            {
              value: "jack",
              label: "2023 - 2024",
            },
            {
              value: "lucy",
              label: "2022 - 2023",
            },
            {
              value: "tom",
              label: "2021 - 2022",
            },
          ]}
        />
        <Select
          showSearch
          defaultValue={"jack"}
          placeholder="Học kỳ"
          optionFilterProp="label"
          className="w-1/2 rounded-xl"
          // onChange={onChange}
          // onSearch={onSearch}
          options={[
            {
              value: "jack",
              label: "Học kỳ 1",
            },
            {
              value: "lucy",
              label: "Học kỳ 2",
            },
            {
              value: "tom",
              label: "Học kỳ 3",
            },
          ]}
        />
      </div>
      <div className="w-1/2 flex gap-4">
        <Select
          showSearch
          placeholder="Bộ môn"
          optionFilterProp="label"
          className="w-1/2 rounded-xl"
          allowClear
          onChange={(value) => {
            setDepartmentId(value);
            getDepartmentId && getDepartmentId(value);
          }}
          onDropdownVisibleChange={(open) => {
            if (open && !departments) {
              dispatch(getDepartments());
            }
          }}
          options={(departments && renderOptions(departments)) || []}
        />
        <Select
          showSearch
          placeholder="Giảng viên hướng dẫn"
          optionFilterProp="label"
          className="w-1/2 rounded-xl"
          onChange={(value) => {
            getAdvisorId && getAdvisorId(value);
          }}
          disabled={!departmentId}
          onDropdownVisibleChange={(open) => {
            if (open) {
              dispatch(
                getAdvisorsRequest({
                  page: 1,
                  limit: 100,
                  departmentID: departmentId,
                }),
              );
            }
          }}
          options={(advisors && renderOptions(advisors)) || []}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
