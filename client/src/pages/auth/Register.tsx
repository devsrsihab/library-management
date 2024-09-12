import { Link, useNavigate } from "react-router-dom";
import PHForm from "../../components/form/PHForm";
import { Button, Col, Row } from "antd";
import PHInput from "../../components/form/PHInput";
import PHSelect from "../../components/form/PHSelect";
import { genderOptions } from "../../constant/global";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterViewerMutation } from "../../redux/features/auth/authApi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import cloudinaryUpload from "../../utils/cloudinaryUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidationSchema } from "../../schemas/user.schema";
import PHImage from "../../components/form/PHImage";

const Register = () => {
  const [registerViewer] = useRegisterViewerMutation();
  const [isShowPass, setIsShowPass] = useState(false);
  const [preview, setPreview] = useState("");

  const navigation = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Account Creating...", { duration: 2000 });

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
      const result = await registerViewer(formData).unwrap();
      if (result) {
        toast.success("Account Created Successfully", {
          id: loader,
          duration: 2000,
        });
        navigation("/auth/login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message, { id: loader, duration: 2000 });
    }
  };

  return (
    <>
      <Row justify="center" className="px-4 py-12 min-h-full">
        <Col xs={24} sm={20} md={16} lg={12}>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign Up to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary hover:text-secondary"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <PHForm
              onSubmit={onSubmit}
              resolver={zodResolver(registerValidationSchema)}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <PHInput type="text" name="name" label="Name" />
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <PHInput type="email" name="email" label="Email" />
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <PHInput
                        label="Password"
                        name="password"
                        type={isShowPass ? "text" : "password"}
                      />
                    </div>
                    <div className="flex">
                      {isShowPass ? (
                        <span
                          className="cursor-pointer text-xl"
                          onClick={() => setIsShowPass(!isShowPass)}
                        >
                          <IoEyeOutline />
                        </span>
                      ) : (
                        <span
                          className="cursor-pointer text-xl"
                          onClick={() => setIsShowPass(!isShowPass)}
                        >
                          <IoEyeOffOutline />
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <PHSelect
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                  />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  {preview && (
                    <div className="max-w-40 pb-3 hidden">
                      {<img src={preview || ""} alt="Book Preview" />}
                    </div>
                  )}
                  <PHImage label="Image" name="image" setPreview={setPreview} />
                </Col>
              </Row>
              <div className="mt-4">
                <Button
                  className="w-full bg-primary hover:bg-secondary hover:text-black text-white"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </PHForm>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
