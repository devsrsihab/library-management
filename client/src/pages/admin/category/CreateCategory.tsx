import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Form, Input } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";

import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../../../redux/features/book/bookApi";
import { TBook } from "../../../types";

const CreateCategory = () => {
  const [createBook, { isLoading: isFacilitieCreating }] = useCreateBookMutation();
  const navigation = useNavigate()

  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating facility...");

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name,
      description: data.description,
      location: data.location,
      pricePerHour: Number(data.pricePerHour),
      availableSlots: Number(data.availableSlots),
      image: imageUpCloud,
    };

    try {
      const res = (await createBook(formData)) as TResponseRedux<TBook>;

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Semester updated successfully", { id: loader });
        navigation('/admin/facilities')
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
          <PHInput label="Description" name="description" type="text" />
          <PHInput label="Location" name="location" type="text" />
          <PHInput label="Price Per Hour" name="pricePerHour" type="text" />
          <PHInput label="Available Slots" name="availableSlots" type="text" />
          <Controller
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label="Image">
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              </Form.Item>
            )}
          />

          <Button disabled={isFacilitieCreating} htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCategory;
