import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  value?: string | number | undefined;
};
const PHTextArea = ({ name, label, value }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <TextArea
            rows={4}
            defaultValue={value}
            placeholder={label}
            {...field}
            id={name}
            maxLength={500}
          />
        </Form.Item>
      )}
    />
  );
};

export default PHTextArea;
