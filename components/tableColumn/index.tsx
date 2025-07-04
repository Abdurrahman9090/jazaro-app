import { Space, Tag, Tooltip, Typography, Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUserInfo } from "./types";
import { UserRoles } from "@/types";
import { humanize } from "@/utils";
import {
  UserOutlined,
  LaptopOutlined,
  UserAddOutlined,
  ApartmentOutlined,
  FileProtectOutlined,
  EditFilled,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";

const { Text, Paragraph } = Typography;

export const IUsersColumns: ColumnsType<IUserInfo> = [
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone No",
    dataIndex: "phone",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (role: string) => {
      if (role === UserRoles.Admin) {
        return (
          <Tag icon={<LaptopOutlined />} color="success">
            <strong>{humanize(role)}</strong>
          </Tag>
        );
      }
      return (
        <Tag icon={<UserOutlined />} color="geekblue">
          <strong>{humanize(role)}</strong>
        </Tag>
      );
    },
    filters: [
      { text: "Admin", value: UserRoles.Admin },
      { text: "Client", value: UserRoles.Client },
      { text: "Fixer", value: UserRoles.Fixer },
    ],
    onFilter: (value, record) => {
      return (record.role as string)
        ?.toLowerCase()
        .includes(value.toString().toLowerCase());
    },
  },
  {
    title: "Status",
    dataIndex: "verified",
    render: (verified: boolean) => {
      return (
        <Tag color={verified ? "green" : "red"}>
          <strong>{verified ? "Active" : "Not Active"}</strong>
        </Tag>
      );
    },
  },
  {
    title: "Modify",
    dataIndex: "modify",
  },
];
