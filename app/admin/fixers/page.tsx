"use client";

import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Avatar,
  Typography,
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Descriptions,
} from "antd";
import {
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const stats = [
  { title: "Total Fixers", value: "2,341", color: "#22c55e" },
  { title: "Verified", value: "1,987", color: "#2563eb" },
  { title: "Pending", value: "234", color: "#eab308" },
  { title: "Online Now", value: "1,456", color: "#22c55e" },
];

// Example data with additional fields
const fixers = [
  {
    id: 1,
    name: "John Martinez",
    email: "john.m@email.com",
    phone: "0300-1234567",
    cnic: "35202-1234567-1",
    category: "Plumbing",
    subCategory: "Pipe Fitting",
    skills: ["Pipe Fitting", "Leak Repair"],
    rating: 4.8,
    completedJobs: 156,
    status: "Verified",
    location: "New York, NY",
    isOnline: true,
    userComments: "Very professional and punctual.",
    approved: true,
  },
  {
    id: 2,
    name: "Lisa Thompson",
    email: "lisa.t@email.com",
    phone: "0311-9876543",
    cnic: "35201-7654321-2",
    category: "Electrical",
    subCategory: "Wiring",
    skills: ["Wiring", "Circuit Repair"],
    rating: 4.9,
    completedJobs: 203,
    status: "Verified",
    location: "Los Angeles, CA",
    isOnline: false,
    userComments: "Excellent work, highly recommended.",
    approved: true,
  },
  {
    id: 3,
    name: "David Kim",
    email: "david.k@email.com",
    phone: "0322-5556677",
    cnic: "35203-5556677-3",
    category: "Appliance Repair",
    subCategory: "Refrigerator",
    skills: ["Refrigerator", "Washing Machine"],
    rating: 4.7,
    completedJobs: 89,
    status: "Pending",
    location: "Chicago, IL",
    isOnline: true,
    userComments: "Still waiting for approval.",
    approved: false,
  },
];

function FixerProfileModal({ visible, onClose, fixer, onApprove, onDisapprove }) {
  if (!fixer) return null;
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        fixer.status === "Pending" && (
          <Button
            key="approve"
            type="primary"
            style={{ backgroundColor: "#22c55e", borderColor: "#22c55e" }}
            onClick={() => onApprove(fixer)}
          >
            Approve
          </Button>
        ),
        fixer.status === "Pending" && (
          <Button
            key="disapprove"
            danger
            onClick={() => onDisapprove(fixer)}
          >
            Disapprove
          </Button>
        ),
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ].filter(Boolean)}
      title={
        <Space>
          <Avatar size={48} style={{ backgroundColor: "#e5e7eb", color: "#111827" }}>
            {fixer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <span>{fixer.name}</span>
        </Space>
      }
      width={600}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Email">{fixer.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{fixer.phone}</Descriptions.Item>
        <Descriptions.Item label="CNIC">{fixer.cnic}</Descriptions.Item>
        <Descriptions.Item label="Category">{fixer.category}</Descriptions.Item>
        <Descriptions.Item label="Sub Category">{fixer.subCategory}</Descriptions.Item>
        <Descriptions.Item label="Skills">
          {fixer.skills.map((skill) => (
            <Tag key={skill} color="geekblue">{skill}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Rating">
          <span style={{ color: "#eab308", fontWeight: 500 }}>
            {"★".repeat(Math.floor(fixer.rating))}{" "}
            <span style={{ color: "#111827" }}>{fixer.rating}</span>
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Completed Jobs">{fixer.completedJobs}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <span
            style={{
              background:
                fixer.status === "Pending"
                  ? "#fef9c3"
                  : fixer.status === "Rejected"
                  ? "#fee2e2"
                  : "#e0f2fe",
              color:
                fixer.status === "Pending"
                  ? "#eab308"
                  : fixer.status === "Rejected"
                  ? "#dc2626"
                  : "#2563eb",
              borderRadius: 4,
              padding: "2px 10px",
              fontSize: 13,
              fontWeight: 500,
              border: "none",
            }}
          >
            {fixer.status}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Online">
          <span>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: fixer.isOnline ? "#22c55e" : "#9ca3af",
                marginRight: 6,
              }}
            />
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              {fixer.isOnline ? "Online" : "Offline"}
            </span>
          </span>
        </Descriptions.Item>
        {/* Removed Approved field from modal */}
        <Descriptions.Item label="Location">{fixer.location}</Descriptions.Item>
        <Descriptions.Item label="User Comments">{fixer.userComments}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default function FixerManagement() {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedFixer, setSelectedFixer] = useState(null);
  const [fixerData, setFixerData] = useState(fixers);

  // Approve handler
  const handleApprove = (fixer) => {
    setFixerData((prev) =>
      prev.map((f) =>
        f.id === fixer.id
          ? { ...f, status: "Verified", approved: true }
          : f
      )
    );
    setProfileModalVisible(false);
  };

  // Disapprove handler
  const handleDisapprove = (fixer) => {
    setFixerData((prev) =>
      prev.map((f) =>
        f.id === fixer.id
          ? { ...f, status: "Rejected", approved: false }
          : f
      )
    );
    setProfileModalVisible(false);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "name",
      key: "avatar",
      render: (name) => (
        <Avatar style={{ backgroundColor: "#e5e7eb", color: "#111827" }}>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </Avatar>
      ),
      width: 70,
      align: "center" as const,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span style={{ color: "#6b7280" }}>{text}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Sub Category / Skills",
      dataIndex: "skills",
      key: "skills",
      render: (_: any, record: any) => (
        <div>
          <Tag color="purple">{record.subCategory}</Tag>
          {record.skills?.map((skill: string) => (
            <Tag key={skill} color="geekblue">{skill}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Stars",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <span style={{ color: "#eab308", fontWeight: 500 }}>
          {"★".repeat(Math.floor(rating))}{" "}
          <span style={{ color: "#111827" }}>{rating}</span>
        </span>
      ),
      align: "center" as const,
    },
    {
      title: "User Comments",
      dataIndex: "userComments",
      key: "userComments",
      render: (text: string) => <span style={{ color: "#64748b" }}>{text}</span>,
    },
    {
      title: "Jobs",
      dataIndex: "completedJobs",
      key: "completedJobs",
      render: (jobs: number) => <span>{jobs} jobs</span>,
      align: "center" as const,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "#2563eb";
        let bg = "#e0f2fe";
        if (status === "Pending") {
          color = "#eab308";
          bg = "#fef9c3";
        } else if (status === "Rejected") {
          color = "#dc2626";
          bg = "#fee2e2";
        }
        return (
          <span
            style={{
              background: bg,
              color: color,
              borderRadius: 4,
              padding: "2px 10px",
              fontSize: 13,
              fontWeight: 500,
              border: "none",
            }}
          >
            {status}
          </span>
        );
      },
      align: "center" as const,
    },
    {
      title: "Online",
      dataIndex: "isOnline",
      key: "isOnline",
      render: (isOnline: boolean) => (
        <span>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isOnline ? "#22c55e" : "#9ca3af",
              marginRight: 6,
            }}
          />
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </span>
      ),
      align: "center" as const,
    },
    // Removed Approved column here
    {
      title: "Profile",
      key: "profile",
      render: (_: any, record: any) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedFixer(record);
            setProfileModalVisible(true);
          }}
        >
          View Profile
        </Button>
      ),
      align: "center" as const,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        if (record.status === "Pending") {
          return (
            <Space>
              <Button
                type="primary"
                style={{ backgroundColor: "#22c55e", borderColor: "#22c55e" }}
                onClick={() => handleApprove(record)}
              >
                Approve
              </Button>
              <Button danger onClick={() => handleDisapprove(record)}>
                Disapprove
              </Button>
            </Space>
          );
        } else if (record.status === "Verified") {
          return (
            <Tag color="success" style={{ fontWeight: 500 }}>
              Approved
            </Tag>
          );
        } else if (record.status === "Rejected") {
          return (
            <Tag color="error" style={{ fontWeight: 500 }}>
              Disapproved
            </Tag>
          );
        }
        return null;
      },
      align: "center" as const,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 0 }}>Fixer Management</Title>
          <Text type="secondary">Manage and verify repair professionals</Text>
        </div>
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          {stats.map((stat, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <Card>
                <Space align="center" style={{ width: "100%", justifyContent: "space-between", display: "flex" }}>
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>{stat.value}</div>
                  </div>
                  <Avatar
                    style={{
                      backgroundColor: stat.color,
                      verticalAlign: "middle",
                    }}
                    size={48}
                    icon={<UserOutlined />}
                  />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Card title="Fixers">
        <Table
          dataSource={fixerData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
        <FixerProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
          fixer={selectedFixer}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      </Card>
    </div>
  );
}
