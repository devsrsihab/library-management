import {
  FieldValues,
  SubmitHandler,

} from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../../../redux/features/book/bookApi";
import { TBook, TCategory, TUser } from "../../../types";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagement.Api";
import PHSelect from "../../../components/form/PHSelect";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {  getBookValidationSchema } from "../../../schemas/book.schema";
import { useState } from "react";
import PHImage from "../../../components/form/PHImage";

const CreateBook = () => {
  const navigation = useNavigate();
  const [preview, setPreview] = useState("");

  const user = useAppSelector(currentUser);
  const [createBook, { isLoading: isFacilitieCreating }] =
    useCreateBookMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery(undefined);
  const { data: authorData, isLoading: authorLoading } = useGetAllUsersQuery([
    { name: "role", value: "author" },
  ]);

  // author optons
  const authorDataOptions = authorData?.data?.map((author: TUser) => ({
    value: author?._id,
    label: author?.name,
  }));

  // category optons
  const categoryOptions = categoryData?.data?.map((category: TCategory) => ({
    value: category?._id,
    label: category?.name,
  }));

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating Book...");

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name,
      author: data.author,
      category: data.category,
      quantity: Number(data.quantity),
      shortDescription: data.shortDescription,
      image: imageUpCloud,
    };

    try {
      const res = (await createBook(formData)) as TResponseRedux<TBook>;

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Book Created successfully", { id: loader });
        navigation(`/${user?.role}/book-list`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(getBookValidationSchema(user?.role as string))}
        >
          <PHInput label="Name" name="name" type="text" />
          <PHInput label="Quantity" name="quantity" type="number" />
          <PHInput label="Description" name="shortDescription" type="text" />

          {user?.role === "admin" ? (
            <PHSelect
              label="Author"
              name="author"
              disabled={authorLoading}
              options={authorDataOptions}
            />
          ) : null}

          <PHSelect
            label="Category"
            name="category"
            disabled={categoryLoading}
            options={categoryOptions}
          />

          {preview && (
            <div className="max-w-40 pb-3">
              {<img src={preview || ""} alt="Book Preview" />}
            </div>
          )}

          <PHImage label="Image" name="image" setPreview={setPreview} />

          <Button disabled={isFacilitieCreating} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateBook;
