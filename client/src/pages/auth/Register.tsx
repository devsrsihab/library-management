import { Link, useNavigate } from "react-router-dom";
import PHForm from "../../components/form/PHForm";
import { Button, Col, Row } from "antd";
import PHInput from "../../components/form/PHInput";
import PHSelect from "../../components/form/PHSelect";
import { genderOptions } from "../../constant/global";
import PHDatePicker from "../../components/form/PHDatePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterViewerMutation } from "../../redux/features/auth/authApi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { useState } from "react";

const Register = () => {
  const [registerViewer] = useRegisterViewerMutation();
  const [isShowPass, setIsShowPass] = useState(false);

  const navigation = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Account Creating...", { duration: 2000 });
    try {
      const { password, ...viewer } = data;
      const viewertData = {
        password,
        viewer,
      };
      console.log(viewertData);

      const result = await registerViewer(viewertData).unwrap();
      if (result) {
        toast.success("Account Created Successfully", {
          id: loader,
          duration: 2000,
        });
        navigation("/auth/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { id: loader, duration: 2000 });
    }
  };

  return (
    <>
      <Row justify={"center"}>
        <Col span={12}>
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign Up to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <PHForm onSubmit={onSubmit}>
                  <Row gutter={12} justify={"center"} align={"middle"}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHInput
                        label="First Name"
                        name="name.firstName"
                        type="text"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHInput
                        label="Middle Name"
                        name="name.middleName"
                        type="text"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                      <PHInput
                        label="Last Name"
                        name="name.lastName"
                        type="text"
                      />
                    </Col>

                    <Col span={12}>
                      <PHSelect
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                      />
                    </Col>
                    <Col span={12}>
                      <PHDatePicker label="Date Of Birth" name="dateOfBirth" />
                    </Col>
                    <Col span={24}>
                      <PHInput label="Image Link" name="image" type="text" />
                    </Col>
                    <Col span={24}>
                      <PHInput label="Email" name="email" type="text" />
                    </Col>
                    <Col span={24}>
                      <div className="flex gap-3 items-center">
                        <div className="flex-1">
                          <PHInput
                            label="Password"
                            name="password"
                            type={isShowPass ? "text" : "password"}
                          />
                        </div>
                        <div className="flex ">
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
                  </Row>
                  <div>
                    <Button className="w-full" htmlType="submit">
                      Submit
                    </Button>
                  </div>
                </PHForm>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
