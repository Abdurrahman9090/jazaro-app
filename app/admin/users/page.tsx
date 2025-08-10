"use client";

import pDebounce from "p-debounce";
import {
  Button as AntdButton,
  Form,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Badge,
  Input,
  Space,
  Typography,
  Tag,
} from "antd";
import { UserAddEditModal } from "@/components/modals";
import {
  EditFilled,
  MoreOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CustomTable from "@/components/table";
import ScalableCard from "@/components/card";
import TableToolBar from "@/components/tableToolbar";
import { IUsersColumns } from "@/components/tableColumn";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { UserSelector } from "@/redux/reducers";
import { deleteUser, getAllUsers } from "@/redux/actions/userAction";
import { IUser, IUserAddEditFormData } from "@/types/reduxTypes/user";

const { Title, Text } = Typography;

// Demo stats and users for dashboard
const stats = [
  { title: "Total Users", value: "12,847", color: "#2563eb" },
  { title: "Active Users", value: "11,234", color: "#16a34a" },
  { title: "New This Month", value: "1,613", color: "#eab308" },
  { title: "Suspended", value: "45", color: "#ef4444" },
];

const demoUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    totalRequests: 12,
    status: "Active",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-02-20",
    totalRequests: 8,
    status: "Active",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-01-08",
    totalRequests: 15,
    status: "Suspended",
    location: "Chicago, IL",
  },
];

export default function Users() {
  const dispatch = useAppDispatch();
  const IUserState = useSelector(UserSelector);
  const { users, userLoading } = IUserState;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef(search);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NO);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(Array<string>);

  const [dataSet, setDataSet] = useState<IUser>();
  const [userEditModal, setUserEditModal] = useState<boolean>(false);
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
    const currentSelectedUser = form.getFieldValue("users") || [];
    const newSelectedUsers = [...selectedUsers, ...currentSelectedUser];
    const updatedSelectedUsers: string[] = newSelectedUsers.filter(
      (payload, index, self) => {
        return self.indexOf(payload) === index;
      }
    );
    setSelectedUsers(updatedSelectedUsers);
    setLoading(true);
    await dispatch(
      getAllUsers()
      // { page: page, pageSize: currentPageSize }
    );
    setLoading(false);
    form.setFieldsValue({ payloads: updatedSelectedUsers });
  };

  /**
   * show modal based on edit or new button event
   *
   * @param {string} modalMode - modal visibility for edit or new
   */
  const showModal = (modalMode: string) => {
    modalMode === "edit" ? setUserEditModal(true) : setUserEditModal(false);
    setModalVisibility(true);
  };

  useEffect(() => {
    if (users === null || userLoading) {
      dispatch(
        getAllUsers()
        //{
        // page: currentPage,
        // pageSize: pageSize,
        //}
      );
    }
  }, [users, userLoading]);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const debouncedSearch = useCallback(
    pDebounce(async (curPage: number, currentPageSize: number) => {
      setLoading(true);
      if (searchRef.current.length > 0) {
        await dispatch(
          getAllUsers()
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
        getAllUsers()
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
   * @param {IUserAddEditFormData} fieldData -  edit or new
   */
  const handleEdit = (fieldData: IUserAddEditFormData) => {
    showModal("edit");
    setDataSet(fieldData);
  };

  const tableData =
    (users &&
      users?.map((obj, idx) => {
        return {
          key: obj._id,
          role: obj.role,
          email: obj.email,
          avatar: obj.avatar,
          username: obj.username,
          phone: obj.phone,
          verify: obj.verify,
          modify: (
            <AntdButton
              size="small"
              shape="circle"
              icon={<EditFilled />}
              onClick={() => {
                return handleEdit(obj);
              }}
            />
          ),
        };
      })) ||
    [];

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <div className="bg-white rounded-lg p-6">
          <Title level={2}>User Management</Title>
          <Text type="secondary">Manage and monitor platform users</Text>
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
                        color: "#0f172a",
                      }}
                    >
                      {stat.value}
                    </div>
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
      </Col>

      {/* Existing Table Section */}
      <Col span={24}>
        <ScalableCard>
          <UserAddEditModal
            dataSet={dataSet}
            edit={userEditModal}
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
                getAllUsers()
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
              await dispatch(deleteUser(form.getFieldValue("users")));
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
            <Form.Item name="users" hidden initialValue={[]} />

            <CustomTable
              form={{
                formData: form,
                key: "users",
              }}
              selectable
              dataSource={tableData}
              search={search}
              loading={loading || userLoading}
              columns={IUsersColumns}
              hasSelectedTitle={"Users"}
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
}
