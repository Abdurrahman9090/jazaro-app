"use client";

import React from "react";
import { Card, Progress, Statistic, Row, Col, Typography, Divider } from "antd";
import { Users, Wrench, FileText, DollarSign, TrendingUp } from "lucide-react";

const { Title, Text } = Typography;

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12%",
    icon: <Users size={32} style={{ color: "#2563eb" }} />,
    color: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    title: "Active Fixers",
    value: "2,341",
    change: "+8%",
    icon: <Wrench size={32} style={{ color: "#16a34a" }} />,
    color: "#16a34a",
    bgColor: "#f0fdf4",
  },
  {
    title: "Service Requests",
    value: "8,923",
    change: "+23%",
    icon: <FileText size={32} style={{ color: "#7c3aed" }} />,
    color: "#7c3aed",
    bgColor: "#f5f3ff",
  },
  {
    title: "Revenue",
    value: "$124,567",
    change: "+15%",
    icon: <DollarSign size={32} style={{ color: "#ca8a04" }} />,
    color: "#ca8a04",
    bgColor: "#fefce8",
  },
];

const recentActivities = [
  {
    type: "success",
    message: "New fixer John D. verified and approved",
    time: "2 min ago",
  },
  {
    type: "info",
    message: "Service request #SR-1234 completed successfully",
    time: "5 min ago",
  },
  {
    type: "warning",
    message: "AI detected washing machine issue with 95% confidence",
    time: "8 min ago",
  },
  {
    type: "error",
    message: "Payment dispute reported for service #SR-1230",
    time: "12 min ago",
  },
];

function getActivityColor(type: string) {
  switch (type) {
    case "success":
      return "#22c55e";
    case "info":
      return "#3b82f6";
    case "warning":
      return "#eab308";
    case "error":
      return "#ef4444";
    default:
      return "#d1d5db";
  }
}

function Dashboard() {
  return (
    <Row gutter={[10, 10]}>
      {/* Stats Grid */}
      <Col span={24}>
        <Row gutter={[10, 10]}>
          {stats.map((stat, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <TrendingUp
                        size={16}
                        style={{ color: "#22c55e", marginRight: 4 }}
                      />
                      <Text style={{ color: "#22c55e" }}>
                        {stat.change} this month
                      </Text>
                    </div>
                  </div>
                  <div
                    style={{
                      background: stat.bgColor,
                      borderRadius: "50%",
                      padding: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>

      {/* Charts Row */}
      <Col span={24}>
        <Row gutter={[10, 10]}>
          <Col xs={24} lg={8}>
            <Card title="Monthly Service Requests">
              <div
                style={{
                  height: 256,
                  background: "#f9fafb",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                Chart: Monthly Service Requests
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Revenue Trend">
              <div
                style={{
                  height: 256,
                  background: "#f9fafb",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                Chart: Revenue Trend
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Service Categories">
              <div
                style={{
                  height: 256,
                  background: "#f9fafb",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                Pie Chart: Service Categories
              </div>
            </Card>
          </Col>
        </Row>
      </Col>

      {/* Bottom Row */}
      <Col span={24}>
        <Row gutter={[10, 10]}>
          <Col xs={24} lg={12}>
            <Card title="Recent Activity">
              <div style={{ maxHeight: 192, overflowY: "auto" }}>
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 12,
                      background: "#f9fafb",
                      borderRadius: 8,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        marginRight: 12,
                        background: getActivityColor(activity.type),
                      }}
                    />
                    <Text style={{ flex: 1 }}>{activity.message}</Text>
                    <Text
                      type="secondary"
                      style={{ fontSize: 12, marginLeft: 8 }}
                    >
                      {activity.time}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Platform Performance">
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text type="secondary">System Uptime</Text>
                  <Text strong>99.9%</Text>
                </div>
                <Progress
                  percent={99.9}
                  showInfo={false}
                  strokeColor="#2563eb"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text type="secondary">AI Accuracy</Text>
                  <Text strong>91.2%</Text>
                </div>
                <Progress
                  percent={91.2}
                  showInfo={false}
                  strokeColor="#7c3aed"
                />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text type="secondary">User Satisfaction</Text>
                  <Text strong>94.5%</Text>
                </div>
                <Progress
                  percent={94.5}
                  showInfo={false}
                  strokeColor="#16a34a"
                />
              </div>
            </Card>
          </Col>
          {/* Performance Metrics */}
          {/* <Col span={24} lg={12}>
            <Row gutter={[24, 24]}>
              
              <Col xs={24} lg={12}>
                <Card title="Quick Stats">
                  <Row gutter={[16, 16]}>
                    <Col xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: 16,
                          background: "#eff6ff",
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#2563eb",
                          }}
                        >
                          156
                        </div>
                        <Text type="secondary">Active Jobs</Text>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: 16,
                          background: "#f0fdf4",
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#16a34a",
                          }}
                        >
                          1,456
                        </div>
                        <Text type="secondary">Online Fixers</Text>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: 16,
                          background: "#fefce8",
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#ca8a04",
                          }}
                        >
                          4.8
                        </div>
                        <Text type="secondary">Avg Rating</Text>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: 16,
                          background: "#f5f3ff",
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#7c3aed",
                          }}
                        >
                          89%
                        </div>
                        <Text type="secondary">Success Rate</Text>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col> */}
        </Row>
      </Col>
    </Row>
  );
}

export default Dashboard;
