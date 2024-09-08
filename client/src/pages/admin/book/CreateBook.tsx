import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Form, Input } from "antd";
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

const CreateBook = () => {
  const navigation = useNavigate();
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
  console.log(authorDataOptions);

  // category optons
  const categoryOptions = categoryData?.data?.map((category: TCategory) => ({
    value: category?._id,
    label: category?.name,
  }));

  // form submit
  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
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
        navigation("/admin");
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
          <PHInput label="Quantity" name="quantity" type="number" />
          <PHInput label="Description" name="shortDescription" type="text" />

          <PHSelect
            label="Author"
            name="author"
            disabled={authorLoading}
            options={authorDataOptions}
          />
          <PHSelect
            label="Category"
            name="category"
            disabled={categoryLoading}
            options={categoryOptions}
          />
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

          <Button disabled={isFacilitieCreating} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateBook;
