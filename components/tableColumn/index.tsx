import { Tag, Tooltip, Typography, Select, Rate, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { ICategory, IFixer, IUserInfo } from "./types";
import { UserRoles } from "@/types";
import { humanize } from "@/utils";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import moment from "moment";
import { ImageOff } from "lucide-react";

const { Text } = Typography;

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
    filters: [
      { text: "Active", value: true },
      { text: "In Active", value: false },
    ],
    onFilter: (value, record) => {
      return record.verified === value;
    },
  },
  {
    title: "Modify",
    dataIndex: "modify",
  },
];

export const ICategoriesColumns: ColumnsType<ICategory> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name: string) => {
      return (
        <Tooltip title={name}>
          <Text strong>{name}</Text>
        </Tooltip>
      );
    },
  },
  {
    title: "Sub Categories",
    dataIndex: "subCategories",
    render: (categories) => (
      <Select
        mode="multiple"
        placeholder="Sub Categcategories"
        value={categories}
        options={
          categories?.map((category: string) => ({
            label: category,
            value: category,
          })) || []
        }
      />
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    render: (createdAt: Date) => {
      return (
        <Tag color="purple">
          {moment(createdAt).format("MM/DD/YYYY hh:mm A")}
        </Tag>
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

export const IFixerColumns: ColumnsType<IFixer> = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    render: (avatar: string) =>
      avatar ? (
        <Image
          src={avatar}
          width={40}
          height={40}
          className="w-10 h-10 bg-slate-200 rounded-lg"
          alt="Fixer"
        />
      ) : (
        <ImageOff />
      ),
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "CNIC",
    dataIndex: "cnic",
  },
  {
    title: "CNIC Image",
    dataIndex: "cnicImage",
    render: (cnicImage: string) =>
      cnicImage ? (
        <Image
          src={cnicImage}
          width={40}
          height={40}
          className="w-10 border h-10 bg-slate-200 rounded-lg"
          alt="Fixer"
        />
      ) : (
        <ImageOff className="mx-auto" />
      ),
    align: "center" as const,
  },
  {
    title: "Phone No",
    dataIndex: "phoneNo",
  },
  {
    title: "Category",
    dataIndex: "categories",
    render: (_: any, record: any) => (
      <div>
        {record.categories?.map((cat: string) => (
          <Tag key={cat} color="geekblue">
            {cat}
          </Tag>
        )) || "N/A"}
      </div>
    ),
  },
  {
    title: "Sub Category / Skills",
    dataIndex: "subCategories",
    render: (_: any, record: any) => (
      <div>
        {record.subCategories?.map((skill: string) => (
          <Tag key={skill} color="purple">
            {skill}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: "Stars",
    dataIndex: "rating",
    key: "rating",
    render: (rating: number) => (
      <Rate allowHalf disabled value={rating} style={{ color: "#fadb14" }} />
    ),
    align: "center" as const,
  },
  {
    title: "Completed Jobs",
    dataIndex: "completedJobs",
    render: (jobs: number) => <span>{jobs} jobs</span>,
    align: "center" as const,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "#2563eb";
      let bg = "#e0f2fe";
      if (status === "Pending") {
        color = "#eab308";
        bg = "#fef9c3";
      } else if (status === "Rejected") {
        color = "#dc2626";
        bg = "#fee2e2";
      }
      return (
        <Tag style={{ backgroundColor: color }} className={`p-1 text-white`}>
          {status}
        </Tag>
      );
    },
    align: "center" as const,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "center" as const,
  },
];
