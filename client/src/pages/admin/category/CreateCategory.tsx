import {  FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex} from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";
import {  TCategory } from "../../../types";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryValidationSchema } from "../../../schemas/category.schema";
import PHImage from "../../../components/form/PHImage";

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
        navigation("/admin/categories-list");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm
          onSubmit={onSubmi}
          resolver={zodResolver(categoryValidationSchema)}
        >
          <PHInput label="Name" name="name" type="text" />

          {preview && (
            <div className="max-w-40 pb-3">
              {<img src={preview || ""} alt="Book Preview" />}
            </div>
          )}

          <PHImage label="Image" name="image" setPreview={setPreview} />

          <Button disabled={isCategoryCreating} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCategory;
