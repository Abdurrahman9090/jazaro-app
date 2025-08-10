"use client";

import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Button,
  Tag,
  Badge,
  Statistic,
  List,
  Descriptions,
  Divider,
} from "antd";
import {
  EnvironmentOutlined,
  ReloadOutlined,
  FilterOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const stats = [
  { label: "Online Fixers", value: "1,456", color: "#2563eb" },
  { label: "Available", value: "892", color: "#22c55e" },
  { label: "En Route", value: "234", color: "#eab308" },
  { label: "Active Requests", value: "156", color: "#dc2626" },
];

const nearbyFixers = [
  {
    id: 1,
    name: "John Martinez",
    specialty: "Plumbing",
    status: "Available",
    location: "Manhattan, NY",
    estimatedArrival: "15 min",
  },
  {
    id: 2,
    name: "Lisa Thompson",
    specialty: "Electrical",
    status: "On Job",
    location: "Upper West Side, NY",
    estimatedArrival: "Busy",
  },
  {
    id: 3,
    name: "David Kim",
    specialty: "Appliance Repair",
    status: "Available",
    location: "Brooklyn, NY",
    estimatedArrival: "22 min",
  },
];

const activeRequests = [
  {
    id: "SR-1234",
    user: "Sarah Johnson",
    issue: "Leaky Kitchen Faucet",
    location: "Midtown, NY",
    priority: "Medium",
    timePosted: "5 min ago",
  },
  {
    id: "SR-1237",
    user: "Robert Wilson",
    issue: "AC Unit Not Cooling",
    location: "Financial District, NY",
    priority: "High",
    timePosted: "12 min ago",
  },
];

const statusColor = {
  Available: "green",
  "On Job": "blue",
  EnRoute: "gold",
};

const priorityColor: { [key: string]: string } = {
  High: "red",
  Medium: "blue",
  Low: "default",
};

export default function MapView() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 0 }}>
          Live Map View
        </Title>
        <Text type="secondary">
          Real-time tracking of fixers and service requests
        </Text>
      </div>

      {/* Map Controls */}
      <Card style={{ marginBottom: 24 }}>
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col>
            <Space>
              <Button type="primary">All Fixers</Button>
              <Button>Available Only</Button>
              <Button>On Jobs</Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button icon={<FilterOutlined />}>Filter</Button>
              <Button icon={<ReloadOutlined />}>Refresh</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        {/* Map Area */}
        <Col xs={24} lg={18}>
          <Card>
            <Space
              align="center"
              style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}
            >
              <EnvironmentOutlined style={{ fontSize: 20, marginRight: 8 }} />{" "}
              Live Map
            </Space>
            <Card
              style={{
                background: "#f3f4f6",
                borderRadius: 8,
                height: 384,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "none",
                border: "none",
                marginBottom: 0,
              }}
              bodyStyle={{
                padding: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center", width: "100%" }}>
                <EnvironmentOutlined
                  style={{ fontSize: 64, color: "#d1d5db", marginBottom: 16 }}
                />
                <div
                  style={{ fontSize: 18, color: "#4b5563", fontWeight: 500 }}
                >
                  Interactive Map
                </div>
                <div style={{ color: "#6b7280", fontSize: 14, marginTop: 8 }}>
                  Integrate with Google Maps or Apple MapKit
                </div>
                <Space style={{ marginTop: 24 }}>
                  <Badge
                    color="#22c55e"
                    text={
                      <span style={{ fontSize: 14 }}>Available Fixers</span>
                    }
                    style={{
                      background: "#fff",
                      borderRadius: 8,
                      boxShadow: "0 1px 4px #0001",
                      padding: 12,
                    }}
                  />
                  <Badge
                    color="#dc2626"
                    text={
                      <span style={{ fontSize: 14 }}>Service Requests</span>
                    }
                    style={{
                      background: "#fff",
                      borderRadius: 8,
                      boxShadow: "0 1px 4px #0001",
                      padding: 12,
                    }}
                  />
                </Space>
              </div>
            </Card>
          </Card>
        </Col>
        {/* Live Stats */}
        <Col xs={24} lg={6}>
          <Card>
            <Title level={4} style={{ marginBottom: 16 }}>
              Live Statistics
            </Title>
            <List
              dataSource={stats}
              renderItem={(stat) => (
                <List.Item>
                  <Statistic
                    title={
                      <span style={{ color: "#6b7280", fontSize: 14 }}>
                        {stat.label}
                      </span>
                    }
                    value={stat.value}
                    valueStyle={{
                      color: stat.color,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Nearby Fixers */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Nearby Fixers
        </Title>
        <List
          dataSource={nearbyFixers}
          renderItem={(fixer) => (
            <List.Item
              key={fixer.id}
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Space align="center">
                <Badge
                  color={
                    fixer.status === "Available"
                      ? "#22c55e"
                      : fixer.status === "On Job"
                      ? "#2563eb"
                      : "#eab308"
                  }
                  style={{ marginRight: 8 }}
                />
                <Space direction="vertical" size={0}>
                  <Text strong>{fixer.name}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {fixer.specialty}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {fixer.location}
                  </Text>
                </Space>
              </Space>
              <Space
                direction="vertical"
                size={0}
                style={{ textAlign: "right" }}
              >
                <Tag
                  color={
                    fixer.status === "Available"
                      ? "green"
                      : fixer.status === "On Job"
                      ? "blue"
                      : "gold"
                  }
                  style={{ marginBottom: 2 }}
                >
                  {fixer.status}
                </Tag>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {fixer.estimatedArrival}
                </Text>
              </Space>
            </List.Item>
          )}
        />
      </Card>

      {/* Active Service Requests */}
      <Card>
        <Title level={4} style={{ marginBottom: 16 }}>
          Active Service Requests on Map
        </Title>
        <List
          grid={{ gutter: 16, xs: 1, md: 2 }}
          dataSource={activeRequests}
          renderItem={(request) => (
            <List.Item key={request.id}>
              <Card
                bordered
                style={{
                  borderRadius: 8,
                  minHeight: 120,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginBottom: 8 }}
                >
                  <Col>
                    <Text strong>{request.id}</Text>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>
                      {request.user}
                    </div>
                  </Col>
                  <Col>
                    <Tag color={priorityColor[request.priority] || "default"}>
                      {request.priority}
                    </Tag>
                  </Col>
                </Row>
                <div
                  style={{ fontSize: 14, color: "#111827", marginBottom: 8 }}
                >
                  {request.issue}
                </div>
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ fontSize: 13, color: "#6b7280" }}
                >
                  <Col>
                    <Space>
                      <EnvironmentOutlined />
                      {request.location}
                    </Space>
                  </Col>
                  <Col>
                    <span>{request.timePosted}</span>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
