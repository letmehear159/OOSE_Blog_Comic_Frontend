import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/authService.js";
import { URL_BACKEND } from "../constants/api.js";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = URL_BACKEND + "/oauth2/authorization/google";
  };
  const goToVerifyEmail = () => {
    navigate("/register", { state: { step: 2 } });
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Tài khoản chưa được xác thực Email",
      description:
        "Bạn đã tạo tài khoản thành công nhưng chưa gửi OTP xác thực Email",
      showProgress: true,
      pauseOnHover: true,
      btn: <Button onClick={goToVerifyEmail}>Đi đến xác thực </Button>,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      // Nếu có token, chuyển hướng về trang chính
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      console.log(">>> Check values ", values);
      const identifier = values.username;
      const password = values.password;
      const response = await loginAPI(identifier, password);
      console.log(">>> Check login response ", response);
      if (response.errorCode === "VERIFYING_EMAIL") {
        openNotification();
        localStorage.setItem("userId", response.data.userId);
        setVerifyEmail(true);
      } else {
        const accessToken = response.accessToken;
        localStorage.setItem("access_token", accessToken);
        message.success("Đang nhập thành công ");
        navigate("/");
      }
    } catch (error) {
      message.error("Đăng nhập thất bại");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="bg-gray-100  flex items-center justify-center min-h-screen">
        <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Section: Login Form */}
          <div className="w-1/2 p-10">
            <div className="flex items-center mb-8">
              <div className="text-blue-600 text-2xl font-bold">Comic</div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-6">
              Enter your email or username and password to access your account.
            </p>
            <Form
              className="space-y-4 mt-4"
              form={form}
              onFinish={(values) => onFinish(values)}
              layout={"vertical"}
            >
              <Form.Item name="username" label="Email / Username">
                <Input />
              </Form.Item>

              <Form.Item name="password" label="Password">
                <Input.Password />
              </Form.Item>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <Checkbox type="checkbox" className="mr-2" />
                  <span className="text-sm ml-2 text-gray-600">
                    Remember Me
                  </span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forget Your Password?
                </a>
              </div>
              <Button
                className="w-full bg-blue-600  text-amber-50 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => {
                  form.submit();
                }}
              >
                Log In
              </Button>
            </Form>

            <div className="mt-4 text-center ">
              <Divider plain={"false"}>Or Log In With</Divider>
              <div className="flex justify-center gap-3 mb-4  mt-2">
                <Button
                  onClick={handleGoogleLogin}
                  className="flex  items-center px-4 w-full justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5 "
                  />
                  Google
                </Button>
              </div>
              <p className="mt-5 text-sm text-gray-600 ">
                Don’t Have an Account?{" "}
                <Link className="text-blue-600 hover:underline" to={"./23"}>
                  Register Now.
                </Link>
              </p>
            </div>
            <div className="mt-8 text-xs text-gray-500 flex justify-between">
              <p>Copyright © 2025 </p>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
          {/* Right Section: Promotional Content */}
          <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Effortlessly manage your team and operations.
            </h2>
            <p className="mb-6">
              Log in to access the CRM dashboard and manage your team.
            </p>
            <div className="relative">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="text-xl font-bold">$189,374</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Chat Performance</p>
                    <p className="text-xl font-bold">00:01:30</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md col-span-2">
                    <p className="text-sm text-gray-600">Sales Overview</p>
                    <div className="h-16 bg-gray-300 rounded mt-2"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total Profit</p>
                  <p className="text-xl font-bold">$25,684</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg">
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Sales Categories</p>
                  <div className="h-16 bg-purple-300 rounded mt-2"></div>
                  <p className="text-sm text-gray-600 mt-2">6,248 Units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
