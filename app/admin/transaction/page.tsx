"use client";

import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Statistic,
  Table,
  Tag,
  Input,
  Button,
  Tooltip,
} from "antd";
import {
  DollarOutlined,
  SearchOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const stats = [
  { title: "Total Revenue", value: "$50.00", color: "#22c55e", icon: <DollarOutlined style={{ fontSize: 32, color: "#22c55e" }} /> },
  { title: "Transaction Volume", value: "$500.00", color: "#2563eb", icon: <DollarOutlined style={{ fontSize: 32, color: "#2563eb" }} /> },
  { title: "Completed", value: "3", color: "#22c55e", icon: <DollarOutlined style={{ fontSize: 32, color: "#22c55e" }} /> },
  { title: "Disputes", value: "1", color: "#dc2626", icon: <DollarOutlined style={{ fontSize: 32, color: "#dc2626" }} /> },
];

const transactions = [
  {
    id: "TXN-1234",
    serviceId: "SR-1234",
    user: "Sarah Johnson",
    fixer: "John Martinez",
    amount: 85.0,
    platformFee: 8.5,
    status: "Completed",
    paymentMethod: "Credit Card",
    processedAt: "2024-01-15 11:45 AM",
  },
  {
    id: "TXN-1235",
    serviceId: "SR-1235",
    user: "Mike Chen",
    fixer: "Lisa Thompson",
    amount: 120.0,
    platformFee: 12.0,
    status: "Completed",
    paymentMethod: "PayPal",
    processedAt: "2024-01-15 10:30 AM",
  },
  {
    id: "TXN-1236",
    serviceId: "SR-1237",
    user: "Robert Wilson",
    fixer: "Maria Rodriguez",
    amount: 200.0,
    platformFee: 20.0,
    status: "Pending",
    paymentMethod: "Apple Pay",
    processedAt: "2024-01-15 09:15 AM",
  },
  {
    id: "TXN-1237",
    serviceId: "SR-1230",
    user: "Emily Davis",
    fixer: "David Kim",
    amount: 95.0,
    platformFee: 9.5,
    status: "Disputed",
    paymentMethod: "Credit Card",
    processedAt: "2024-01-15 08:20 AM",
  },
];

const statusColor = {
  Completed: "success",
  Pending: "processing",
  Disputed: "error",
};

const columns = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
    render: (id, record) => (
      <Space direction="vertical" size={0}>
        <Text strong>{id}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>{record.processedAt}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>Service: {record.serviceId}</Text>
      </Space>
    ),
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (user, record) => (
      <Space direction="vertical" size={0}>
        <Text>{user}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>Fixer: {record.fixer}</Text>
      </Space>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount, record) => (
      <Space direction="vertical" size={0}>
        <Text strong>${amount.toFixed(2)}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Platform Fee: ${record.platformFee.toFixed(2)}
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Fee Rate: {((record.platformFee / amount) * 100).toFixed(1)}%
        </Text>
      </Space>
    ),
  },
  {
    title: "Payment",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    render: (paymentMethod) => <Text>{paymentMethod}</Text>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Space>
        <Tag color={statusColor[status] || "default"}>{status}</Tag>
        {status === "Disputed" && (
          <Tooltip title="This transaction is disputed">
            <ExclamationCircleOutlined style={{ color: "#dc2626" }} />
          </Tooltip>
        )}
      </Space>
    ),
  },
];

export default function TransactionManagement() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 0 }}>Transaction Management</Title>
        <Text type="secondary">Monitor payments and financial transactions</Text>
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

      {/* Transactions Table */}
      <Card>
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 18 }}>Recent Transactions</span>
          <Space>
            <Input
              placeholder="Search transactions..."
              prefix={<SearchOutlined />}
              style={{ width: 240 }}
              allowClear
            />
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}