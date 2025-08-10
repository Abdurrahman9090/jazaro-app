import moment from "moment";
import { ImageOff } from "lucide-react";
import { ColumnsType } from "antd/es/table";
import { humanize } from "@/utils";
import { UserRoles } from "@/types";
import { ICategory, IFixer, IUserInfo } from "./types";
import { Tag, Tooltip, Typography, Select, Rate, Image } from "antd";
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
    dataIndex: "cnicImage",
    render: (cnicImages: { front: string; back: string }) =>
      cnicImages.front ? (
        <>
          <Image
            src={cnicImages.front}
            width={40}
            height={40}
            className="w-10 border h-10 bg-slate-200 rounded-lg"
            alt="Fixer"
          />
          <Image
            src={cnicImages.back}
            width={40}
            height={40}
            className="w-10 border h-10 bg-slate-200 rounded-lg"
            alt="Fixer"
          />
        </>
      ) : (
        <div className="flex">
          <ImageOff className="mx-auto" />
          <ImageOff className="mx-auto" />
        </div>
      ),
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
        value={"See Categories"}
        dropdownStyle={{ minWidth: 120 }}
        dropdownRender={(menu) => menu}
        open={false}
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
        value={"See Sub Categories"}
        dropdownStyle={{ minWidth: 120 }}
        dropdownRender={(menu) => menu}
        open={false}
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
