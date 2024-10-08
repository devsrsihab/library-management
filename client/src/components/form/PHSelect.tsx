import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string;}[];
  disabled?: boolean;
  defaultValue?: any;
};

const PHSelect = ({ label, name,defaultValue, options, disabled = false }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            placeholder={label}
            style={{
              width: "100%",
              borderColor: "#d9d9d9", // Default border color
            }}
            defaultValue={defaultValue}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
