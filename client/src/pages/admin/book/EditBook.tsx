import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Form, Input } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../../../redux/features/book/bookApi";
import { TBook, TCategory, TSelectOptions, TUser } from "../../../types";
import { useState } from "react";
import PHTextArea from "../../../components/form/PHTextArea";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagement.Api";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import PHSelect from "../../../components/form/PHSelect";
import FormSkeletonLoader from "../../../components/shared/loader/FormSkeletonLoader";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleBookQuery(id, { skip: !id });
  const books = data?.data;

  // books
  const [updateBook, { isLoading: updateBookLoading }] =
    useUpdateBookMutation();

  // categories
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery(undefined, { skip: !id });
  
  // authors
  const { data: authorData, isLoading: authorLoading } = useGetAllUsersQuery([
    { name: "role", value: "author" },
  ],{ skip: !id });

  // author optons
  const authorDataOptions: TSelectOptions[] =
    authorData?.data?.map((author: TUser) => ({
      value: author?._id,
      label: author?.name,
    })) ?? [];

  // category optons
  const categoryOptions: TSelectOptions[] =
    categoryData?.data?.map((category: TCategory) => ({
      value: category?._id,
      label: category?.name,
    })) ?? [];

  // photo preview
  const [preview, setPreview] = useState(books?.image); // State for image preview

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Updating book...");

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name || books?.name,
      author: data.author || books?.author?._id,
      category: data.category || books?.category?._id,
      quantity: Number(data.quantity) || Number(books?.quantity),
      shortDescription: data.shortDescription || books?.shortDescription,
      image: imageUpCloud || books?.image,
    };

    try {
      const res = (await updateBook({
        id,
        data: formData,
      })) as TResponseRedux<TBook>;

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Book updated successfully", { id: loader });
        navigate("/admin/book-list");
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
              <PHInput
                value={books?.quantity}
                label="Quantity"
                name="quantity"
                type="number"
              />
              <PHTextArea
                value={books?.shortDescription}
                label="Description"
                name="shortDescription"
              />

              {books && books.author && authorDataOptions.length > 0 && (
                <PHSelect
                  label="Author"
                  name="author"
                  disabled={authorLoading}
                  options={authorDataOptions}
                  defaultValue={authorDataOptions.filter(
                    (item) => item.value === books?.author?._id
                  )}
                />
              )}

              <PHSelect
                label="Category"
                name="category"
                disabled={categoryLoading}
                options={categoryOptions}
                defaultValue={categoryOptions.filter(
                  (item): boolean => item.value === books?.category._id
                )}
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

export default EditBook;
