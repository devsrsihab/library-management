import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  setPreview: (preview: string) => void;
};
const PHImage = ({name, label, setPreview}: TInputProps) => {
  return (
    <Controller
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Input
            type="file"
            accept="image/*"
            {...field}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);

              // If a new file is selected, update the preview
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              } else {
                setPreview("");
              }
            }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHImage;
