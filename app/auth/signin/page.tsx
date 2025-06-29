"use client";

import { useState } from "react";
import { Button, Input, Checkbox, Form, message } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { signin } from "@/redux/actions/authActions";
import { ILoginFormData } from "@/types/reduxTypes/auth";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Signin() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: FormValues) => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    } as ILoginFormData;

    if (await dispatch(signin(data))) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_8px_32px_rgba(0,188,212,0.3)] rounded-[20px] p-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[#006064] hover:text-[#00838F] transition-colors"
            >
              <ArrowLeftOutlined className="h-5 w-5" />
            </Link>
            <div className="w-5" /> {/* Spacer for alignment */}
          </div>
          <div className="flex flex-col items-center justify-center mt-14 mb-8">
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* 3D Cube Effect - Increased size */}
                <div className="w-16 h-16 relative transform-gpu perspective-1000">
                  <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-lg shadow-lg transform rotate-12 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-lg opacity-80 transform translate-x-2 translate-y-2"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-3xl transform -rotate-12 drop-shadow-lg">
                        J
                      </span>
                    </div>
                  </div>
                </div>
                {/* Glowing Core - Increased size and centered */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_20px_rgba(0,188,212,0.8)] animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#006064] drop-shadow-lg mt-3">
              Jazaro
            </h1>
          </div>
        </div>
        <div>
          <Form
            form={form}
            name="signin"
            onFinish={handleLogin}
            autoComplete="off"
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              label={
                <span className="text-[#006064] text-sm font-medium">
                  Email
                </span>
              }
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-[#00838F]" />}
                placeholder="Enter your email"
                className="bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-[#006064] text-sm font-medium">
                  Password
                </span>
              }
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-[#00838F]" />}
                placeholder="Enter your password"
                className="bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20"
                autoComplete="current-password"
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined className="text-[#00838F] hover:text-[#00BCD4]" />
                  ) : (
                    <EyeInvisibleOutlined className="text-[#00838F] hover:text-[#00BCD4]" />
                  )
                }
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-[#00BCD4]">
                  <span className="text-sm text-[#00838F]">Remember me</span>
                </Checkbox>
              </Form.Item>
              <Link
                href="/forgot-password"
                className="text-sm text-[#00838F] hover:text-[#00BCD4] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px] border-none"
                disabled={loading}
                loading={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>

            <div className="text-center text-sm text-[#00838F]">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-medium"
              >
                Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
