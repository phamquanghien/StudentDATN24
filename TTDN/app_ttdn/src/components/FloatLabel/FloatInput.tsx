import React, { useMemo, useState } from "react";
import {
  DatePicker,
  DatePickerProps,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Select,
  SelectProps,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import "./floatLabelWrapper.css";

type BaseProps = {
  label: string;
  required?: boolean;
};

type FloatLabelInputProps = BaseProps & { componenttype: "input" } & InputProps;
type FloatLabelInputNumberProps = BaseProps & {
  componenttype: "inputNumber";
} & InputNumberProps;
type FloatLabelDatePickerProps = BaseProps & {
  componenttype: "datePicker";
} & DatePickerProps;
type FloatLabelTextAreaProps = BaseProps & {
  componenttype: "textArea";
} & TextAreaProps;
type FloatLabelRangePickerProps = BaseProps & {
  componenttype: "rangePicker";
} & RangePickerProps;
type FloatLabelSelectProps = BaseProps & {
  componenttype: "select";
} & SelectProps;

type FloatLabelWrapperProps =
  | FloatLabelInputProps
  | FloatLabelInputNumberProps
  | FloatLabelDatePickerProps
  | FloatLabelTextAreaProps
  | FloatLabelRangePickerProps
  | FloatLabelSelectProps;

const useFloatLabel = (value: any) => {
  const [focus, setFocus] = useState(false);
  const isOccupied = useMemo(
    () => focus || (value && value.toString().length !== 0),
    [focus, value],
  );
  return { focus, setFocus, isOccupied };
};

const FloatLabelInput: React.FC<FloatLabelInputProps> = ({
  label,
  required,
  ...props
}) => {
  const { focus, setFocus, isOccupied } = useFloatLabel(props.value);
  return (
    <div
      className={`float-label ${isOccupied ? "active" : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        {...props}
        placeholder={isOccupied ? props.placeholder : undefined}
      />
      <label className={isOccupied ? "label as-label" : "label as-placeholder"}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

const FloatLabelInputNumber: React.FC<FloatLabelInputNumberProps> = ({
  label,
  required,
  ...props
}) => {
  const { focus, setFocus, isOccupied } = useFloatLabel(props.value);
  return (
    <div
      className={`float-label ${isOccupied ? "active" : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <InputNumber
        {...props}
        placeholder={isOccupied ? props.placeholder : undefined}
      />
      <label className={isOccupied ? "label as-label" : "label as-placeholder"}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

const FloatLabelDatePicker: React.FC<FloatLabelDatePickerProps> = ({
  label,
  required,
  disabled,
  ...props
}) => {
  const { focus, setFocus, isOccupied } = useFloatLabel(props.value);

  const isInactive = !isOccupied && !focus;

  return (
    <div
      className={`float-label ${isOccupied ? "active" : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <DatePicker
        {...props}
        disabled={disabled}
        placeholder={!isInactive ? props.placeholder : ""}
      />
      <label className={isOccupied ? "label as-label" : "label as-placeholder"}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

const FloatLabelTextArea: React.FC<FloatLabelTextAreaProps> = ({
  label,
  required,
  ...props
}) => {
  const { focus, setFocus, isOccupied } = useFloatLabel(props.value);
  return (
    <div
      className={`float-label ${isOccupied ? "active" : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <TextArea
        {...props}
        placeholder={isOccupied ? props.placeholder : undefined}
      />
      <label className={isOccupied ? "label as-label" : "label as-placeholder"}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

const FloatLabelRangePicker: React.FC<FloatLabelRangePickerProps> = ({
  label,
  required,
  disabled,
  placeholder = ["Ngày bắt đầu", "Ngày kết thúc"],
  format = "DD/MM/YYYY",
  ...props
}) => {
  const { focus, setFocus, isOccupied } = useFloatLabel(props.value);

  const isInactive = !isOccupied && !focus;
  return (
    <div
      className={`float-label ${isOccupied ? "active" : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <DatePicker.RangePicker
        {...props}
        disabled={disabled}
        placeholder={!isInactive ? placeholder : ["", ""]}
        format={format}
      />
      <label className={isOccupied ? "label as-label" : "label as-placeholder"}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

const FloatLabelSelect: React.FC<FloatLabelSelectProps> = ({
  label,
  required,
  ...props
}) => {
  const { focus, setFocus, isOccupied } = useFloatLabel(props.value);

  return (
    <div
      className={`float-label ${isOccupied ? "active" : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Select
        {...props}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        placeholder={isOccupied ? props.placeholder : undefined}
      />
      <label className={isOccupied ? "label as-label" : "label as-placeholder"}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

const FloatLabelWrapper: React.FC<FloatLabelWrapperProps> = (props) => {
  switch (props.componenttype) {
    case "input":
      return <FloatLabelInput {...props} />;
    case "inputNumber":
      return <FloatLabelInputNumber {...props} />;
    case "datePicker":
      return <FloatLabelDatePicker {...props} />;
    case "textArea":
      return <FloatLabelTextArea {...props} />;
    case "rangePicker":
      return <FloatLabelRangePicker {...props} />;
    case "select":
      return <FloatLabelSelect {...props} />;
  }
};

export default React.memo(FloatLabelWrapper);
