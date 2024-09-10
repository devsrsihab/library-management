import { Link, useNavigate } from "react-router-dom";
import PHForm from "../../components/form/PHForm";
import { Button, Col, Row } from "antd";
import PHInput from "../../components/form/PHInput";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { TLoginPayload } from "../../types/auth.type";
import { TUser } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import { setuser } from "../../redux/features/auth/authSlice";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {  useState } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const [resetData, setResetData] = useState({});
  const [isShowPass, setIsShowPass] = useState(false);
  const navigation = useNavigate();
  const distpatch = useAppDispatch();

  const onSubmit: SubmitHandler<TLoginPayload> = async (
    payload: TLoginPayload
  ) => {
    const loader = toast.loading("Account Login...", { duration: 1000 });
    try {
      const res = await login(payload).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      distpatch(setuser({ user: user, token: res.data.accessToken }));

      if (res) {
        toast.success("Account Login Successfully", { id: loader });
        navigation("/");
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.data.message, { id: loader });
    }
  };

  const handleCredentialChange = (email: string, password: string) => {
    setResetData({
      email,
      password,
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up for free
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <PHForm resetData={resetData} onSubmit={onSubmit}>
              <Row gutter={12} justify={"center"} align={"middle"}>
                <Col>
                  <PHInput label="Email" name="email" type="text" />
                </Col>
                <Col>
                  <div className="flex gap-3 items-center">
                    <PHInput
                      label="Password"
                      name="password"
                      type={isShowPass ? "text" : "password"}
                    />
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

              <Row>
                <Col span={24} className="text-center mt-10">
                  <span className="text-xl text-purple-700 font-semibold">
                    Login as:
                  </span>
                  <div className="flex gap-5 justify-center mt-5">
                    <Button
                      style={{ backgroundColor: "#52c41a", color: "white" }}
                      onClick={() =>
                        handleCredentialChange("admin@gmail.com", "admin")
                      }
                    >
                      Admin
                    </Button>
                    <Button
                      style={{ backgroundColor: "#722ed1", color: "white" }}
                      onClick={() =>
                        handleCredentialChange(
                          "testauthor@gmail.com",
                          "testauthor@gmail.com"
                        )
                      }
                    >
                      Author
                    </Button>
                    <Button
                      style={{ backgroundColor: "#1890ff", color: "white" }}
                      onClick={() =>
                        handleCredentialChange(
                          "testguest@gmail.com",
                          "testguest@gmail.com"
                        )
                      }
                    >
                      Viewer
                    </Button>
                  </div>
                </Col>
              </Row>
            </PHForm>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
