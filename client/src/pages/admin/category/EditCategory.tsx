import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Form, Input } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate, useParams } from "react-router-dom";
import {  TCategory } from "../../../types";
import { useState } from "react";
import {  useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import FormSkeletonLoader from "../../../components/shared/loader/FormSkeletonLoader";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleCategoryQuery(id, { skip: !id });
  const books = data?.data;

  // cateogry mutatoin 
  const [updateCategory, { isLoading: updateBookLoading }] =
    useUpdateCategoryMutation();

  // photo preview
  const [preview, setPreview] = useState(books?.image);

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Updating Category...");

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name || books?.name,
      image: imageUpCloud || books?.image,
    };

    try {
      const res = (await updateCategory({
        id,
        data: formData,
      })) as TResponseRedux<TCategory>;

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Category updated successfully", { id: loader });
        navigate("/admin/categories-list");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  return (
    <>
      {isLoading ? (
        <FormSkeletonLoader />
      ) : (
        <Flex justify="center" align="center">
          <Col span={8}>
            <PHForm onSubmit={onSubmit}>
              <PHInput
                value={books?.name}
                label="Name"
                name="name"
                type="text"
              />

              <div className="max-w-40 py-8">
                {/* Display the current or preview image */}
                <img src={preview || books?.image} alt="Book Preview" />
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
                          setPreview(books?.image); // Reset to original image if no file is selected
                        }
                      }}
                    />
                  </Form.Item>
                )}
              />

              <Button disabled={updateBookLoading} htmlType="submit">
                Submit
              </Button>
            </PHForm>
          </Col>
        </Flex>
      )}
    </>
  );
};

export default EditCategory;
