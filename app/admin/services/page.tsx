"use client";

import React from "react";
import { Card, Row, Col, Typography, Space, Tag, Progress, Button, Table, Tooltip } from "antd";
import { FileTextOutlined, EnvironmentOutlined, MoreOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const stats = [
  { title: "Total Requests", value: "8,923", color: "#2563eb", icon: <FileTextOutlined style={{ fontSize: 32, color: "#2563eb" }} /> },
  { title: "Pending", value: "234", color: "#eab308", icon: <FileTextOutlined style={{ fontSize: 32, color: "#eab308" }} /> },
  { title: "In Progress", value: "456", color: "#2563eb", icon: <FileTextOutlined style={{ fontSize: 32, color: "#2563eb" }} /> },
  { title: "Completed", value: "8,233", color: "#22c55e", icon: <FileTextOutlined style={{ fontSize: 32, color: "#22c55e" }} /> },
];

const requests = [
  {
    id: "SR-1234",
    user: "Sarah Johnson",
    fixer: "John Martinez",
    service: "Leaky Kitchen Faucet",
    category: "Plumbing",
    status: "In Progress",
    priority: "Medium",
    amount: "$85",
    createdAt: "2024-01-15 10:30 AM",
    location: "New York, NY",
    aiConfidence: 95,
  },
  {
    id: "SR-1235",
    user: "Mike Chen",
    fixer: "Lisa Thompson",
    service: "Electrical Outlet Repair",
    category: "Electrical",
    status: "Completed",
    priority: "High",
    amount: "$120",
    createdAt: "2024-01-15 09:15 AM",
    location: "Los Angeles, CA",
    aiConfidence: 88,
  },
  {
    id: "SR-1236",
    user: "Emily Davis",
    fixer: "Unassigned",
    service: "Washing Machine Not Spinning",
    category: "Appliance Repair",
    status: "Pending",
    priority: "Low",
    amount: "Pending",
    createdAt: "2024-01-15 08:45 AM",
    location: "Chicago, IL",
    aiConfidence: 92,
  },
];

const statusColor = {
  "Completed": "success",
  "In Progress": "processing",
  "Pending": "warning",
  "Rejected": "error",
};

const priorityColor = {
  "High": "error",
  "Medium": "processing",
  "Low": "default",
};

const columns = [
  {
    title: "Request ID",
    dataIndex: "id",
    key: "id",
    render: (id, record) => (
      <Space direction="vertical" size={0}>
        <Text strong>{id}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>{record.createdAt}</Text>
      </Space>
    ),
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
    render: (service, record) => (
      <Space direction="vertical" size={0}>
        <Text>{service}</Text>
        <Tag color="default" style={{ marginTop: 4 }}>{record.category}</Tag>
      </Space>
    ),
  },
  {
    title: "User / Fixer",
    key: "userfixer",
    render: (_, record) => (
      <Space direction="vertical" size={0}>
        <Text type="secondary" style={{ fontSize: 13 }}>User: {record.user}</Text>
        <Text type="secondary" style={{ fontSize: 13 }}>Fixer: {record.fixer}</Text>
      </Space>
    ),
  },
  {
    title: "Location / Amount",
    key: "locationamount",
    render: (_, record) => (
      <Space direction="vertical" size={0}>
        <Space>
          <EnvironmentOutlined style={{ color: "#888" }} />
          <Text type="secondary" style={{ fontSize: 13 }}>{record.location}</Text>
        </Space>
        <Text strong style={{ marginTop: 4 }}>{record.amount}</Text>
      </Space>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={statusColor[status] || "default"}>{status}</Tag>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    render: (priority) => (
      <Tag color={priorityColor[priority] || "default"}>{priority}</Tag>
    ),
  },
  {
    title: "AI Confidence",
    dataIndex: "aiConfidence",
    key: "aiConfidence",
    render: (aiConfidence) => (
      <Space>
        <Text type="secondary" style={{ fontSize: 13 }}>AI Confidence:</Text>
        <Progress percent={aiConfidence} size="small" style={{ width: 60 }} showInfo={false} />
        <Text strong style={{ fontSize: 13 }}>{aiConfidence}%</Text>
      </Space>
    ),
  },
  {
    title: "",
    key: "actions",
    render: () => (
      <Tooltip title="More actions">
        <Button type="text" icon={<MoreOutlined />} />
      </Tooltip>
    ),
  },
];

export function ServiceRequests() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 0 }}>Service Requests</Title>
        <Text type="secondary">Monitor and manage all service requests</Text>
      </div>

      {/* Stats Grid */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {stats.map((stat, index) => (
          <Col xs={24} md={12} lg={6} key={index}>
            <Card>
              <Space align="center" style={{ width: "100%", justifyContent: "space-between", display: "flex" }}>
                <div>
                  <Text type="secondary">{stat.title}</Text>
                  <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
                {stat.icon}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Requests Table */}
      <Card>
        <Title level={4} style={{ marginBottom: 16 }}>Service Requests</Title>
        <Table
          dataSource={requests}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default ServiceRequests;
