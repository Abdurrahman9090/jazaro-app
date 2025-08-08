"use client";

import pDebounce from "p-debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  Form,
  Col,
  Typography,
  Space,
  Tag,
  Progress,
  Button,
  Tooltip,
  Row,
} from "antd";
import {
  FileTextOutlined,
  EnvironmentOutlined,
  MoreOutlined,
  EditOutlined,
} from "@ant-design/icons";

import CustomTable from "@/components/table";
import ScalableCard from "@/components/card";
import TableToolBar from "@/components/tableToolbar";
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  FIFTY,
  FIVE,
  TEN,
  TWENTY,
  ZERO,
} from "@/constants";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { CategorySelector } from "@/redux/reducers";
import { ICategory } from "@/types/reduxTypes/category";
import {
  deleteCategories,
  getCategories,
} from "@/redux/actions/categoryAction";
import CategoryAddEditModal from "@/components/modals/category/CategoryAddEditModal";
import { ICategoriesColumns } from "@/components/tableColumn";
import { Edit } from "lucide-react";

const { Title, Text } = Typography;

const stats = [
  {
    title: "Total Requests",
    value: "8,923",
    color: "#2563eb",
    icon: <FileTextOutlined style={{ fontSize: 32, color: "#2563eb" }} />,
  },
  {
    title: "Pending",
    value: "234",
    color: "#eab308",
    icon: <FileTextOutlined style={{ fontSize: 32, color: "#eab308" }} />,
  },
  {
    title: "In Progress",
    value: "456",
    color: "#2563eb",
    icon: <FileTextOutlined style={{ fontSize: 32, color: "#2563eb" }} />,
  },
  {
    title: "Completed",
    value: "8,233",
    color: "#22c55e",
    icon: <FileTextOutlined style={{ fontSize: 32, color: "#22c55e" }} />,
  },
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
  Completed: "success",
  "In Progress": "processing",
  Pending: "warning",
  Rejected: "error",
};

const priorityColor = {
  High: "error",
  Medium: "processing",
  Low: "default",
};

export const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, categoryLoading } = useSelector(CategorySelector);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef(search);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NO);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(Array<string>);

  const [dataSet, setDataSet] = useState<ICategory | undefined>();
  const [categoryEditModal, setCategoryEditModal] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  /**
   * Handle pagination change
   *
   * @param {number} page - Current page number
   * @param {number} currentPageSize - Page size
   */
  const handlePaginationChange = async (
    page: number,
    currentPageSize: number
  ) => {
    setCurrentPage(page);
    setPageSize(currentPageSize);
    const currentSelectedCategory = form.getFieldValue("categories") || [];
    const newSelectedCategories = [
      ...selectedCategories,
      ...currentSelectedCategory,
    ];
    const updatedSelectedCategories: string[] = newSelectedCategories.filter(
      (payload, index, self) => {
        return self.indexOf(payload) === index;
      }
    );
    setSelectedCategories(updatedSelectedCategories);
    setLoading(true);
    await dispatch(
      getCategories()
      // { page: page, pageSize: currentPageSize }
    );
    setLoading(false);
    form.setFieldsValue({ payloads: updatedSelectedCategories });
  };

  /**
   * show modal based on edit or new button event
   *
   * @param {string} modalMode - modal visibility for edit or new
   */
  const showModal = (modalMode: string) => {
    modalMode === "edit"
      ? setCategoryEditModal(true)
      : setCategoryEditModal(false);
    setModalVisibility(true);
  };

  useEffect(() => {
    if (categories === null || categoryLoading) {
      dispatch(
        getCategories()
        //{
        // page: currentPage,
        // pageSize: pageSize,
        //}
      );
    }
  }, [categories, categoryLoading]);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const debouncedSearch = useCallback(
    pDebounce(async (curPage: number, currentPageSize: number) => {
      setLoading(true);
      if (searchRef.current.length > 0) {
        await dispatch(
          getCategories()
          //   {
          //   page: curPage,
          //   pageSize: currentPageSize,
          //   searchString: searchRef.current,
          // }
        );
      }
      setLoading(false);
    }, 3),
    []
  );

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (search.length === 0) {
      setLoading(false);
      handlePaginationChange(DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE);
    } else {
      setLoading(true);
      debouncedSearch(DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      await dispatch(
        getCategories()
        //{
        // page: DEFAULT_PAGE_NO,
        // pageSize: DEFAULT_PAGE_SIZE,
        // searchString: searchRef.current,
        //}
      );
    })();
  }, []);

  /**
   * add, edit user handler
   *
   * @param {ICategory} fieldData -  edit or new
   */
  const handleEdit = (fieldData: ICategory) => {
    showModal("edit");
    setDataSet(fieldData);
  };

  const tableData =
    categories?.map((category) => ({
      key: category._id,
      name: category.name,
      subCategories: category.subCategories,
      createdAt: category.createdAt,
      actions: (
        <Button
          onClick={() => handleEdit(category)}
          icon={<EditOutlined />}
        ></Button>
      ),
    })) || [];

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <div className="bg-white p-6 rounded-lg">
          <Title level={2}>All Categories</Title>
          <Text type="secondary">
            Monitor and manage all service categories
          </Text>
        </div>
      </Col>

      <Col span={24}>
        {/* Stats Grid */}
        <Row gutter={[10, 10]}>
          {stats.map((stat, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <Card>
                <Space
                  align="center"
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: stat.color,
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                  {stat.icon}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>

      <Col span={24}>
        <ScalableCard>
          <CategoryAddEditModal
            dataSet={dataSet}
            edit={categoryEditModal}
            setDataSet={setDataSet}
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
          />
          <TableToolBar
            add={true}
            search={true}
            refresh={true}
            deleteAll={true}
            variant="filled"
            deleteBtnDisabled={deleteBtnDisabled}
            refreshEventListener={async () => {
              setLoading(true);
              form.resetFields();
              setSearch("");
              await dispatch(
                getCategories()
                // {
                //   page: currentPage,
                //   pageSize: pageSize,
                //   searchString: search,
                // }
              );
              setCurrentPage(1);
              setPageSize(DEFAULT_PAGE_SIZE);
              setLoading(false);
            }}
            deleteEventListener={async () => {
              await dispatch(
                deleteCategories(form.getFieldValue("categories"))
              );
              form.resetFields();
              setPageSize(DEFAULT_PAGE_SIZE);
              setDeleteBtnDisabled(true);
            }}
            searchFieldHandler={(e) => {
              setSearch(e.target.value);
            }}
            addEventListener={() => {
              return showModal("add");
            }}
          />
          <Form
            onChange={() => {
              setDeleteBtnDisabled(
                !(
                  Array.isArray(form.getFieldValue("users")) &&
                  form.getFieldValue("users").length > ZERO
                )
              );
            }}
            layout="vertical"
            form={form}
          >
            <Form.Item name="categories" hidden initialValue={[]} />

            <CustomTable
              form={{
                formData: form,
                key: "categories",
              }}
              selectable
              search={search}
              dataSource={tableData}
              loading={loading || categoryLoading}
              columns={ICategoriesColumns}
              hasSelectedTitle={"Categories"}
              onChange={(pagination) => {
                handlePaginationChange(
                  pagination.current as number,
                  pagination.pageSize as number
                );
              }}
              pagination={{
                pageSize: pageSize,
                current: currentPage,
                showSizeChanger: true,
                position: ["bottomCenter"],
                // total: totalDocumentsUser || 0,
                defaultPageSize: DEFAULT_PAGE_SIZE,
                pageSizeOptions: [FIVE, TEN, TWENTY, FIFTY],
              }}
              setDeleteBtnDisabled={setDeleteBtnDisabled}
            />
          </Form>
        </ScalableCard>
      </Col>
    </Row>
  );
};

export default Categories;
