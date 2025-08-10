import moment from "moment";
import { ImageOff } from "lucide-react";
import { ColumnsType } from "antd/es/table";
import { humanize } from "@/utils";
import { UserRoles } from "@/types";
import { ICategory, IFixer, IUserInfo } from "./types";
import { Tag, Tooltip, Typography, Select, Rate, Image, Badge } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export const IUsersColumns: ColumnsType<IUserInfo> = [
  {
    title: "",
    dataIndex: "avatar",
    render: (avatar) => {
      return (
        <Image
          src={avatar}
          height={30}
          width={30}
          className="rounded p-1 bg-cyan-600"
        />
      );
    },
  },
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
      let icon, color;
      switch (role) {
        case UserRoles.Admin:
          icon = <LaptopOutlined />;
          color = "gold";
          break;
        case UserRoles.Fixer:
          icon = <TrophyOutlined />;
          color = "volcano";
          break;
        case UserRoles.Client:
          icon = <UserOutlined />;
          color = "geekblue";
          break;
        default:
          icon = <UserOutlined />;
          color = "default";
      }
      return (
        <Tag icon={icon} color={color}>
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
    dataIndex: "verify",
    render: (verify: boolean) => {
      return (
        <Tag color={verify ? "green" : "red"}>
          <strong>{verify ? "Active" : "Not Active"}</strong>
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
    render: (cnic: string) => {
      // If CNIC exists, render it; otherwise, show default "12345-2344556-5"
      return (
        <Tag
          color={
            cnic && typeof cnic === "string" && cnic.length > 0
              ? "green"
              : "gray"
          }
        >
          {cnic && typeof cnic === "string" && cnic.length > 0
            ? cnic
            : "12345-2344556-5"}
        </Tag>
      );
    },
  },
  {
    title: "CNIC Images",
    dataIndex: "cnicImages",
    render: (cnicImages: { front: string; back: string }) => {
      return (
        <div className="flex justify-center gap-1">
          {cnicImages?.front ? (
            <Image
              width={40}
              src={cnicImages?.front}
              className="border rounded-lg"
              alt="Fixer CNIC Front"
            />
          ) : (
            <ImageOff />
          )}
          {cnicImages?.back ? (
            <Image
              width={40}
              src={cnicImages?.back}
              className="border rounded-lg"
              alt="Fixer CNIC Back"
            />
          ) : (
            <ImageOff />
          )}
        </div>
      );
    },
    align: "center" as const,
  },
  {
    title: "Phone No",
    dataIndex: "phoneNo",
  },
  {
    title: "Categories",
    dataIndex: "categories",
    render: (categories: string[]) => (
      <Select
        showSearch
        className="w-full"
        value={"See Categories"}
        options={
          categories?.map((cat: string) => ({
            label: cat,
            value: cat,
          })) || []
        }
      />
    ),
  },
  {
    title: "Sub Category / Skills",
    dataIndex: "subCategories",
    render: (subCategories: string[]) => (
      <Select
        showSearch
        className="w-full"
        value={"See Sub Categories"}
        options={
          subCategories?.map((cat: string) => ({
            label: cat,
            value: cat,
          })) || []
        }
      />
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
    render: (jobs: number) => (
      <Badge count={jobs} color="green" className="font-bold" />
    ),
    align: "center" as const,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "";
      let bg = "";
      if (status === "pending") {
        color = "text-white";
        bg = "bg-gray-500";
      } else if (status === "accepted") {
        color = "text-white";
        bg = "bg-green-700";
      } else if (status === "rejected") {
        color = "text-white";
        bg = "bg-red-400";
      }
      return (
        <Tag className={`p-2 rounded-3xl font-semibold ${bg} text-white`}>
          {humanize(status || "N/A")}
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
