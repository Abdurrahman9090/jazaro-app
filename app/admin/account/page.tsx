"use client";

import React from "react";
import { Card, Descriptions, Avatar, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const user = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 234 567 890",
  role: "Admin",
  verified: true,
  avatar: "",
};

const AccountPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 py-8 px-2">
      <Card
        className="w-full max-w-xl shadow-lg"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col items-center py-8 px-6 bg-white rounded-t-lg">
          <Avatar
            size={96}
            icon={<UserOutlined />}
            src={user.avatar}
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
          <span className="text-gray-500 mb-2">{user.role}</span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="mt-2"
            // onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
        </div>
        <div className="px-8 py-6">
          <Descriptions
            column={1}
            labelStyle={{ fontWeight: 500, color: "#64748b" }}
            contentStyle={{ color: "#0f172a" }}
            className="w-full"
          >
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  user.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.verified ? "Active" : "Not Active"}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
};

export default AccountPage;
