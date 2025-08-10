"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Checkbox, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { signup } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/store";
import { IRegisterFormData } from "@/types/reduxTypes/auth";

const { Title, Text } = Typography;

export default function Signup() {
  const [form] = Form.useForm<IRegisterFormData>();
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onFinish = async (values: IRegisterFormData) => {
    setLoading(true);
    if (await dispatch(signup(values))) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md bg-white/95 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_8px_32px_rgba(0,188,212,0.3)] rounded-[20px]"
        style={{ borderRadius: "20px" }}
      >
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-[#006064] hover:text-[#00838F] transition-colors"
          >
            <ArrowLeftOutlined style={{ fontSize: "20px" }} />
          </Link>
          <Title level={2} style={{ color: "#00838F", margin: 0 }}>
            Create Account
          </Title>
          <div style={{ width: "20px" }} />
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="relative">
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_20px_rgba(0,188,212,0.8)] animate-pulse"></div>
            </div>
          </div>
          <Title
            level={2}
            style={{ color: "#006064", marginTop: "12px", marginBottom: 0 }}
          >
            Jazaro
          </Title>
        </div>

        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="username"
            label={<Text style={{ color: "#006064" }}>Username</Text>}
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#00838F" }} />}
              placeholder="Enter your username"
              style={{
                borderRadius: "10px",
                borderColor: "#00BCD4",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<Text style={{ color: "#006064" }}>Email</Text>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#00838F" }} />}
              placeholder="Enter your email"
              style={{
                borderRadius: "10px",
                borderColor: "#00BCD4",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<Text style={{ color: "#006064" }}>Phone Number</Text>}
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[\+]?[1-9][\d]{0,11}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: "#00838F" }} />}
              placeholder="Enter your phone number"
              style={{
                borderRadius: "10px",
                borderColor: "#00BCD4",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<Text style={{ color: "#006064" }}>Password</Text>}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#00838F" }} />}
              placeholder="Create a password"
              style={{
                borderRadius: "10px",
                borderColor: "#00BCD4",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<Text style={{ color: "#006064" }}>Confirm Password</Text>}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#00838F" }} />}
              placeholder="Confirm your password"
              style={{
                borderRadius: "10px",
                borderColor: "#00BCD4",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("You must accept the terms and conditions")
                      ),
              },
            ]}
          >
            <Checkbox style={{ color: "#00838F" }}>
              I agree to the{" "}
              <Link
                href="/terms"
                style={{ color: "#00BCD4" }}
                className="hover:text-[#00838F] transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                style={{ color: "#00BCD4" }}
                className="hover:text-[#00838F] transition-colors"
              >
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#00BCD4",
                color: "white",
                borderRadius: "10px",
                border: "none",
              }}
            >
              Create Account
            </Button>
          </Form.Item>

          <div
            style={{ textAlign: "center", fontSize: "14px", color: "#00838F" }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              style={{ color: "#00BCD4" }}
              className="hover:text-[#00838F] transition-colors"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
