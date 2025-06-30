"use client";
import React from "react";
import CountUp from "react-countup";
import { Card, Row, Col, Statistic, Typography } from "antd";
import { UserOutlined, ToolOutlined, AppstoreOutlined, BarChartOutlined } from "@ant-design/icons";

const Title = Typography.Title;

// Dummy data for demonstration
const analytics = [
  {
    title: "Total Users",
    value: 1240,
    icon: <UserOutlined style={{ color: "#1890ff" }} />,
    color: "#e6f7ff",
  },
  {
    title: "Total Fixers",
    value: 320,
    icon: <ToolOutlined style={{ color: "#52c41a" }} />,
    color: "#f6ffed",
  },
  {
    title: "Total Services",
    value: 58,
    icon: <AppstoreOutlined style={{ color: "#faad14" }} />,
    color: "#fffbe6",
  },
  {
    title: "Active Jobs",
    value: 87,
    icon: <BarChartOutlined style={{ color: "#eb2f96" }} />,
    color: "#fff0f6",
  },
];

function Dashboard() {
  return (
    <div className="p-4">
      <Row gutter={[10, 10]}>
        {analytics.map((item, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <Card
            hoverable
              className={`shadow-sm rounded-lg bg-[${item.color}]`}
              
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md mb-2"
                  
                >
                  <span className="text-4xl animate-pulse">{item.icon}</span>
                </div>
                <Statistic
                  title={
                    <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{item.title}</span>
                  }
                  valueRender={() => (
                    <span style={{ fontWeight: 700, fontSize: 32, color: "#22223b" }}>
                      <CountUp end={item.value} duration={1.2} separator="," />
                    </span>
                  )}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {/* You can add more analytics, charts, or summaries below */}
      <div style={{ marginTop: 32 }}>
        <Card title="Summary" bordered={false}>
          <p>
            Here you can see a summary of platform activity, including users, fixers, services, and more. 
            Add charts, recent activity, or other analytics as needed.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
