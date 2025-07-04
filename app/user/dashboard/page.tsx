"use client";

import Link from "next/link";
import { Card, Input, Typography, Avatar, Button } from "antd";
import { ToolOutlined, ThunderboltOutlined, BuildOutlined, FormatPainterOutlined, FireOutlined, SettingOutlined, CarOutlined, LockOutlined, HomeOutlined, UserOutlined, LaptopOutlined, DeleteOutlined, SearchOutlined, MenuOutlined, CameraOutlined, HistoryOutlined, UserSwitchOutlined, MessageOutlined, StarFilled, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const categories = [
  {
    key: "electricians",
    name: "Electricians",
    description: "Wiring, lighting, and more",
    icon: <ThunderboltOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "plumbers",
    name: "Plumbers",
    description: "Pipes, drains, and fixtures",
    icon: <ToolOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "carpenters",
    name: "Carpenters",
    description: "Furniture and woodwork",
    icon: <BuildOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "painters",
    name: "Painters",
    description: "Interior and exterior painting",
    icon: <FormatPainterOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "hvac",
    name: "HVAC / AC",
    description: "Cooling and ventilation",
    icon: <FireOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "appliance-repair",
    name: "Appliance Repair",
    description: "Fix home appliances",
    icon: <SettingOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "mason",
    name: "Mason / Construction",
    description: "Brickwork and renovations",
    icon: <HomeOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "mechanics",
    name: "Mechanics",
    description: "Car and bike repairs",
    icon: <CarOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "locksmiths",
    name: "Locksmiths",
    description: "Locks and security",
    icon: <LockOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "handyman",
    name: "Handyman",
    description: "General home repairs",
    icon: <UserOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "vehicle-services",
    name: "Vehicle Services",
    description: "Detailing and maintenance",
    icon: <CarOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "it-smart-home",
    name: "IT & Smart Home",
    description: "CCTV and smart devices",
    icon: <LaptopOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "cleaning",
    name: "Cleaning Services",
    description: "Home and office cleaning",
    icon: <DeleteOutlined className="text-4xl text-[#00BCD4]" />,
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Header */}
      {/* Search */}
      <div className="relative z-10 px-4 py-3 bg-white/50 backdrop-blur-[10px] border-b border-[#00BCD4]/20">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchOutlined className="h-4 w-4 text-[#00838F]" />
          </span>
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
          />
        </div>
      </div>

      {/* Category Cards */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link key={cat.key} href={`/user/dashboard/${cat.key}`}>
              <Card
                hoverable
                className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,123,255,0.2)]"
                bodyStyle={{ padding: "16px" }}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  {cat.icon}
                  <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                  <span className="text-xs text-gray-500">{cat.description}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
