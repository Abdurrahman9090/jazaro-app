"use client";

import pDebounce from "p-debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Avatar,
  Typography,
  Space,
  Form,
  Tag,
  Button,
  Modal,
  Descriptions,
  Tooltip,
} from "antd";
import {
  CheckCircleFilled,
  CloseSquareFilled,
  UserOutlined,
} from "@ant-design/icons";

// Reudx
import CustomTable from "@/components/table";
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
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { IFixer } from "@/types/reduxTypes/fixer";
import { FixerSelector } from "@/redux/reducers/fixerReducer";
import { deleteFixers, getFixers } from "@/redux/actions/fixerAction";
import { IFixerColumns } from "@/components/tableColumn";
import ScalableCard from "@/components/card";
import { Check, Cross } from "lucide-react";

const { Title, Text } = Typography;

const stats = [
  { title: "Total Fixers", value: "2,341", color: "#22c55e" },
  { title: "Verified", value: "1,987", color: "#2563eb" },
  { title: "Pending", value: "234", color: "#eab308" },
  { title: "Online Now", value: "1,456", color: "#22c55e" },
];

const Fixers = () => {
  const dispatch = useAppDispatch();
  const { fixers, fixersLoading } = useSelector(FixerSelector);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef(search);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NO);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);

  useEffect(() => {
    if (fixers === null || fixersLoading) {
      dispatch(getFixers());
    }
  }, [fixers, fixersLoading]);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const debouncedSearch = useCallback(
    pDebounce(async (curPage: number, currentPageSize: number) => {
      setLoading(true);
      if (searchRef.current.length > 0) {
        await dispatch(getFixers());
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
    } else {
      setLoading(true);
      debouncedSearch(DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      await dispatch(getFixers());
    })();
  }, []);

  const tableData = fixers?.map((fixer, _id) => {
    return {
      key: _id,
      email: fixer.email,
      cnic: fixer.cnic,
      phoneNo: fixer.phone,
      avatar: fixer.avatar,
      username: fixer.username,
      rating: fixer.rating,
      cnicImages: {
        front: fixer.cnicFrontImage,
        back: fixer.cnicBackImage,
      },
      categorie: fixer.categories,
      subCategories: fixer.subCategories,
      reviewsCount: fixer.reviewsCount,
      completedJobs: fixer.jobsCompleted,
      status: fixer.status,
      actions: (
        <Space>
          <Tooltip title="Accept">
            <Button
              className="border border-green-600"
              icon={<CheckCircleFilled className="text-green-600" />}
            />
          </Tooltip>
          <Tooltip title="Reject">
            <Button danger icon={<CloseSquareFilled />} />
          </Tooltip>
        </Space>
      ),
    };
  });

  console.log(tableData);

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <div className="bg-white rounded-lg p-6">
          <Title level={2}>Fixer Management</Title>
          <Text type="secondary">Manage and verify repair professionals</Text>
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={[10, 10]}>
          {stats.map((stat, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <ScalableCard>
                <Space
                  align="center"
                  className={`flex justify-between rounded-lg`}
                >
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <div className="text-[28px] font-bold text-slate-900">
                      {stat.value}
                    </div>
                  </div>
                  <Avatar
                    size={48}
                    shape="square"
                    className="align-middle"
                    icon={<UserOutlined />}
                    style={{ backgroundColor: stat.color }}
                  />
                </Space>
              </ScalableCard>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <ScalableCard>
          <TableToolBar
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
                getFixers()
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
              await dispatch(deleteFixers(form.getFieldValue("fixers")));
              form.resetFields();
              setPageSize(DEFAULT_PAGE_SIZE);
              setDeleteBtnDisabled(true);
            }}
            searchFieldHandler={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Form
            onChange={() => {
              setDeleteBtnDisabled(
                !(
                  Array.isArray(form.getFieldValue("fixers")) &&
                  form.getFieldValue("fixers").length > ZERO
                )
              );
            }}
            layout="vertical"
            form={form}
          >
            {/* <Form.Item name="categories" hidden initialValue={[]} /> */}
            <CustomTable
              form={{
                formData: form,
                key: "fixers",
              }}
              search={search}
              selectable
              dataSource={tableData || []}
              loading={loading || fixersLoading}
              columns={IFixerColumns}
              hasSelectedTitle={"fixers"}
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

export default Fixers;
