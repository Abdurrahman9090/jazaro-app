"use client";

import React, { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, Select, Space, Popconfirm, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Mock data for demonstration
const initialCategories = [
  {
    id: "1",
    name: "Plumbing",
    subcategories: [
      { id: "1-1", name: "Leak Repair" },
      { id: "1-2", name: "Pipe Installation" },
    ],
  },
  {
    id: "2",
    name: "Electrical",
    subcategories: [
      { id: "2-1", name: "Wiring" },
      { id: "2-2", name: "Lighting Installation" },
    ],
  },
];

const ServiceCategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [form] = Form.useForm();

  // For subcategory modal
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [editingSub, setEditingSub] = useState<any>(null);
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);
  const [subForm] = Form.useForm();

  // Category Table Columns
  const categoryColumns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Subcategories",
      dataIndex: "subcategories",
      key: "subcategories",
      render: (_: any, record: any) => (
        <ul className="list-disc pl-4">
          {record.subcategories.map((sub: any) => (
            <li key={sub.id} className="flex items-center justify-between">
              <span>{sub.name}</span>
              <Space>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEditSubcategory(record.id, sub)}
                  className="!p-1"
                />
                <Popconfirm
                  title="Delete this subcategory?"
                  onConfirm={() => handleDeleteSubcategory(record.id, sub.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                    className="!p-1"
                  />
                </Popconfirm>
              </Space>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleAddSubcategory(record.id)}
            className="!p-1"
          >
            Add Sub
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditCategory(record)}
            className="!p-1"
          />
          <Popconfirm
            title="Delete this category and all its subcategories?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              className="!p-1"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handlers for Category
  const handleAddCategory = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    form.setFieldsValue({ name: category.name });
    setModalVisible(true);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleCategoryModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCategory) {
          setCategories(
            categories.map((cat) =>
              cat.id === editingCategory.id
                ? { ...cat, name: values.name }
                : cat
            )
          );
        } else {
          setCategories([
            ...categories,
            {
              id: Date.now().toString(),
              name: values.name,
              subcategories: [],
            },
          ]);
        }
        setModalVisible(false);
        setEditingCategory(null);
        form.resetFields();
      })
      .catch(() => {});
  };

  // Handlers for Subcategory
  const handleAddSubcategory = (categoryId: string) => {
    setParentCategoryId(categoryId);
    setEditingSub(null);
    subForm.resetFields();
    setSubModalVisible(true);
  };

  const handleEditSubcategory = (categoryId: string, sub: any) => {
    setParentCategoryId(categoryId);
    setEditingSub(sub);
    subForm.setFieldsValue({ name: sub.name });
    setSubModalVisible(true);
  };

  const handleDeleteSubcategory = (categoryId: string, subId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.filter(
                (sub: any) => sub.id !== subId
              ),
            }
          : cat
      )
    );
  };

  const handleSubModalOk = () => {
    subForm
      .validateFields()
      .then((values) => {
        setCategories(
          categories.map((cat) => {
            if (cat.id === parentCategoryId) {
              if (editingSub) {
                // Edit subcategory
                return {
                  ...cat,
                  subcategories: cat.subcategories.map((sub: any) =>
                    sub.id === editingSub.id
                      ? { ...sub, name: values.name }
                      : sub
                  ),
                };
              } else {
                // Add subcategory
                return {
                  ...cat,
                  subcategories: [
                    ...cat.subcategories,
                    { id: Date.now().toString(), name: values.name },
                  ],
                };
              }
            }
            return cat;
          })
        );
        setSubModalVisible(false);
        setEditingSub(null);
        setParentCategoryId(null);
        subForm.resetFields();
      })
      .catch(() => {});
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card
        bordered={false}
        className="shadow-lg"
        title={
          <div className="flex items-center justify-between">
            <Title level={4} className="!mb-0">
              Service Categories & Subcategories
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCategory}
            >
              Add Category
            </Button>
          </div>
        }
      >
        <Table
          columns={categoryColumns}
          dataSource={categories}
          rowKey="id"
          pagination={false}
        />
      </Card>

      {/* Category Modal */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={modalVisible}
        onOk={handleCategoryModalOk}
        onCancel={() => {
          setModalVisible(false);
          setEditingCategory(null);
          form.resetFields();
        }}
        okText={editingCategory ? "Update" : "Add"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Subcategory Modal */}
      <Modal
        title={editingSub ? "Edit Subcategory" : "Add Subcategory"}
        open={subModalVisible}
        onOk={handleSubModalOk}
        onCancel={() => {
          setSubModalVisible(false);
          setEditingSub(null);
          setParentCategoryId(null);
          subForm.resetFields();
        }}
        okText={editingSub ? "Update" : "Add"}
        destroyOnClose
      >
        <Form form={subForm} layout="vertical">
          <Form.Item
            label="Subcategory Name"
            name="name"
            rules={[{ required: true, message: "Please enter subcategory name" }]}
          >
            <Input placeholder="Enter subcategory name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceCategoriesPage;
