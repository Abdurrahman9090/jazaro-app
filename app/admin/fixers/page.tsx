"use client";
import React, { useEffect, useState } from "react";
import { Table, Card, Button, Tag, Modal, Descriptions, Avatar, message, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";

// Dummy data for demonstration; replace with API call in production
const dummyFixers = [
  {
    _id: "1",
    name: "John Doe",
    email: "johnfixer@email.com",
    phone: "123-456-7890",
    verified: false,
    avatar: "",
    skills: ["Plumbing", "Electrical"],
    documents: [
      { type: "ID Card", url: "#" },
      { type: "Certificate", url: "#" },
    ],
    appliedAt: "2024-06-01",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "987-654-3210",
    verified: true,
    avatar: "",
    skills: ["Carpentry"],
    documents: [
      { type: "ID Card", url: "#" },
    ],
    appliedAt: "2024-05-28",
  },
];

const FixerRequestsPage = () => {
  const [fixers, setFixers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFixer, setSelectedFixer] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  // Fetch fixers (replace with real API call)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFixers(dummyFixers);
      setLoading(false);
    }, 500);
  }, []);

  const handleView = (fixer: any) => {
    setSelectedFixer(fixer);
    setModalVisible(true);
  };

  const handleVerify = async (fixer: any, status: boolean) => {
    setVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setFixers((prev) =>
        prev.map((f) =>
          f._id === fixer._id ? { ...f, verified: status } : f
        )
      );
      setVerifying(false);
      setModalVisible(false);
      message.success(
        status
          ? "Fixer has been verified successfully."
          : "Fixer has been rejected."
      );
    }, 800);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, record: any) => (
        <Avatar
          src={record.avatar}
          icon={<UserOutlined />}
          alt={record.name}
        />
      ),
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md"],
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills: string[]) =>
        skills.map((skill) => (
          <Tag color="blue" key={skill}>
            {skill}
          </Tag>
        )),
    },
    {
      title: "Status",
      dataIndex: "verified",
      key: "verified",
      render: (verified: boolean) =>
        verified ? (
          <Tag color="green" icon={<CheckCircleOutlined />}>
            Verified
          </Tag>
        ) : (
          <Tag color="orange" icon={<CloseCircleOutlined />}>
            Pending
          </Tag>
        ),
    },
    {
      title: "Applied At",
      dataIndex: "appliedAt",
      key: "appliedAt",
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
          size="small"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Card
        title="Fixer Account Requests"
        bordered={false}
      >
        <Table
          columns={columns}
          dataSource={fixers}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        title="Fixer Details"
        destroyOnClose
        width={500}
      >
        {selectedFixer ? (
          <Spin spinning={verifying}>
            <div className="flex flex-col items-center mb-4">
              <Avatar
                size={80}
                src={selectedFixer.avatar}
                icon={<UserOutlined />}
                className="mb-2"
              />
              <h2 style={{ marginBottom: 0 }}>{selectedFixer.name}</h2>
              <Tag
                color={selectedFixer.verified ? "green" : "orange"}
                style={{ marginBottom: 8 }}
              >
                {selectedFixer.verified ? "Verified" : "Pending"}
              </Tag>
            </div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Email">
                {selectedFixer.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedFixer.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Skills">
                {selectedFixer.skills.map((skill: string) => (
                  <Tag color="blue" key={skill}>
                    {skill}
                  </Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Applied At">
                {selectedFixer.appliedAt}
              </Descriptions.Item>
              <Descriptions.Item label="Documents">
                {selectedFixer.documents && selectedFixer.documents.length > 0
                  ? selectedFixer.documents.map((doc: any, idx: number) => (
                      <div key={idx}>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          {doc.type}
                        </a>
                      </div>
                    ))
                  : "No documents"}
              </Descriptions.Item>
            </Descriptions>
            {!selectedFixer.verified && (
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  style={{ marginRight: 12 }}
                  loading={verifying}
                  onClick={() => handleVerify(selectedFixer, true)}
                >
                  Approve & Verify
                </Button>
                <Button
                  danger
                  icon={<CloseCircleOutlined />}
                  loading={verifying}
                  onClick={() => handleVerify(selectedFixer, false)}
                >
                  Reject
                </Button>
              </div>
            )}
          </Spin>
        ) : null}
      </Modal>
    </div>
  );
};

export default FixerRequestsPage;
