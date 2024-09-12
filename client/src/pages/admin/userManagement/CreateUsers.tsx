import { Button, Col, Flex, Form } from "antd";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../../redux/features/admin/userManagement.Api";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { genderOptions, roleOptions } from "../../../constant/global";
import cloudinaryUpload from "../../../utils/cloudinaryUpload";
import { useState } from "react";
import PHImage from "../../../components/form/PHImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "../../../schemas/user.schema";

const CreateUsers = () => {
  const [preview, setPreview] = useState("");
  const [formResetData, setFormResetData] = useState({});

  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);
    const loader = toast.loading("User Creating...", { duration: 2000 });

    let imageUpCloud;
    if (data.image) {
      imageUpCloud = await cloudinaryUpload(data.image);
    }

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      role: data.role,
      image: imageUpCloud,
    };

    try {
      const result = await createUser(formData).unwrap();
      if (result) {
        toast.success("Admin Created Successfully", {
          id: loader,
          duration: 2000,
        });
        setFormResetData({});
        navigate("/admin/user-list");
      }
    } catch (error: any) {
      console.log(error);
      setFormResetData(data);

      toast.error(error.data.message, { id: loader, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm
          onSubmit={onSubmit}
          resetData={formResetData}
          resolver={zodResolver(userValidationSchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <PHInput type="email" name="email" label="Email" />
          <PHInput type="text" name="password" label="Password" />
          <PHSelect name="gender" label="Gender" options={genderOptions} />
          <PHSelect name="role" label="Role" options={roleOptions} />
          {preview && (
            <div className="max-w-40 pb-3">
              {<img src={preview || ""} alt="Book Preview" />}
            </div>
          )}
          <PHImage label="Image" name="image" setPreview={setPreview} />

          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-10 w-full">
              Create
            </Button>
          </Form.Item>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateUsers;
