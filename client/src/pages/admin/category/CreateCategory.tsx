import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Form, Input } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";
import {  TCategory } from "../../../types";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi";

const CreateCategory = () => {
  const navigation = useNavigate();
  // photo preview
  const [preview, setPreview] = useState('');
  const [createCategory, { isLoading: isCategoryCreating }] =
    useCreateCategoryMutation();

  // form submit
  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating Category...");

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name,
      image: imageUpCloud,
    };

    try {
      const res = (await createCategory(formData)) as TResponseRedux<TCategory>;

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Category Created successfully", { id: loader });
        navigation("/admin/category-list");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmi}>
          <PHInput label="Name" name="name" type="text" />

          <div className="max-w-40 py-8">
            {/* Display the current or preview image */}
            {preview && <img src={preview || ""} alt="Book Preview" />}
          </div>

          <Controller
            name="image"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label="Image">
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
              </Form.Item>
            )}
          />

          <Button disabled={isCategoryCreating} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCategory;
