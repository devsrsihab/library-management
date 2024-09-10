import { Link, useNavigate } from "react-router-dom";
import PHForm from "../../components/form/PHForm";
import { Button, Col, Row } from "antd"; // Removed Flex, using Ant's grid system
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
import { useState } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const [resetData, setResetData] = useState({});
  const [isShowPass, setIsShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TLoginPayload> = async (
    payload: TLoginPayload
  ) => {
    const loader = toast.loading("Account Login...", { duration: 1000 });
    try {
      const res = await login(payload).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setuser({ user, token: res.data.accessToken }));

      if (res) {
        toast.success("Account Login Successfully", { id: loader });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: loader });
    }
  };

  const handleCredentialChange = (email: string, password: string) => {
    setResetData({ email, password });
  };

  return (
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
            <Row gutter={[12, 12]} justify="center" className="loginForm">
              {/* Email input */}
              <Col xs={24} sm={24} md={12}>
                <PHInput label="Email" name="email" type="text" />
              </Col>
              {/* Password input */}
              <Col xs={24} sm={24} md={12}>
                <div className="flex gap-3 items-center">
                  <PHInput
                    label="Password"
                    name="password"
                    type={isShowPass ? "text" : "password"}
                  />
                  <span
                    className="cursor-pointer text-xl"
                    onClick={() => setIsShowPass(!isShowPass)}
                  >
                    {isShowPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </Col>

              {/* Submit button */}
              <Col xs={24}>
                <Button type="primary" className="w-full" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>

            {/* Demo login buttons */}
            <Row justify="center" className="mt-10">
              <Col xs={24} className="text-center">
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
  );
};

export default Login;
