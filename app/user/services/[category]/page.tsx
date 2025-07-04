"use client";

import { useRouter } from "next/navigation";
import { Card, Typography } from "antd";
import { ToolOutlined, ThunderboltOutlined, BuildOutlined, FormatPainterOutlined, FireOutlined, SettingOutlined, CarOutlined, LockOutlined, HomeOutlined, UserOutlined, LaptopOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ReactElement } from "react";
import React from "react";

const { Title } = Typography;

const categoryData: Record<string, { name: string; icon: ReactElement; subcategories: string[] }> = {
  electricians: {
    name: "Electricians",
    icon: <ThunderboltOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "General Electrical Repairing",
      "House & Office Wiring",
      "Switchboard & Panel Installation",
      "Circuit Breaker & Fuse Repair",
      "Lighting Installation (Indoor/Outdoor)",
      "Generator & UPS Setup",
    ],
  },
  plumbers: {
    name: "Plumbers",
    icon: <ToolOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Water Pipe Installation & Repair",
      "Sanitary Fitting & Replacement",
      "Drainage & Sewerage Solutions",
      "Water Tank Cleaning",
      "Leak Detection & Fixing",
      "Bathroom & Kitchen Fixture Installation",
    ],
  },
  carpenters: {
    name: "Carpenters",
    icon: <BuildOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Custom Woodwork",
      "Furniture Making & Repair",
      "Cabinet & Wardrobe Installation",
      "Door and Window Fittings",
      "Shelving and Storage Solutions",
      "Wooden Flooring Installation",
    ],
  },
  painters: {
    name: "Painters",
    icon: <FormatPainterOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Interior Wall Painting",
      "Exterior Wall Painting",
      "Ceiling & Decorative Paint",
      "Wallpaper Installation & Removal",
      "Surface Preparation (Plastering, Sanding)",
    ],
  },
  hvac: {
    name: "HVAC / AC Technicians",
    icon: <FireOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Air Conditioner Installation & Repair",
      "HVAC System Installation & Servicing",
      "Split, Central, and Inverter AC Handling",
      "Ventilation Setup and Maintenance",
      "Gas Refilling & Pipe Insulation",
    ],
  },
  "appliance-repair": {
    name: "Appliance Repair",
    icon: <SettingOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Refrigerator, Washing Machine, Oven Fixing",
      "Microwave, Dishwasher & Dryer Repairs",
      "Water Dispenser and Heater Repair",
      "TV and Home Theater Setup",
    ],
  },
  mason: {
    name: "Mason / Construction Workers",
    icon: <HomeOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Brickwork & Tiling",
      "Home and Office Renovation",
      "Wall Plastering & Painting Prep",
      "Kitchen & Bathroom Remodeling",
      "Ceiling Design (POP, Gypsum)",
      "Foundation Repairs & Concrete Work",
    ],
  },
  mechanics: {
    name: "Mechanics",
    icon: <CarOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Car Mechanical Repairs",
      "Motorcycle/Bike Servicing",
      "Engine Diagnostics",
      "Battery Replacement",
      "Oil & Filter Change",
    ],
  },
  locksmiths: {
    name: "Locksmiths",
    icon: <LockOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Lock Installation & Repair",
      "Digital & Smart Lock Services",
      "Door Unlocking (Emergency)",
      "Key Duplication",
      "Safe Installation & Repair",
    ],
  },
  handyman: {
    name: "Handyman Services",
    icon: <UserOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Tree Trimming & Cutting",
      "Gutter Cleaning",
      "Pest Control Services",
      "Carpet Cleaning",
      "Lawn Mowing & Landscaping",
      "Wall Mounting (TVs, Shelves, etc.)",
      "Minor Home Repairs",
    ],
  },
  "vehicle-services": {
    name: "Vehicle Services",
    icon: <CarOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Car Detailing & Polishing",
      "Touring Inspection & Pre-Trip Services",
      "Tyre Fitting & Puncture Repair",
      "Electric Vehicle (EV) Battery Installation & Maintenance",
      "Windshield & Glass Repair",
    ],
  },
  "it-smart-home": {
    name: "IT & Smart Home Services",
    icon: <LaptopOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "CCTV Installation & Troubleshooting",
      "Wi-Fi & Network Setup",
      "Smart Home Device Setup (Lights, Thermostats)",
      "Doorbell Cameras & Security Systems",
    ],
  },
  cleaning: {
    name: "Cleaning Services",
    icon: <DeleteOutlined className="text-4xl text-[#00BCD4]" />,
    subcategories: [
      "Deep Home Cleaning",
      "Office/Commercial Cleaning",
      "Move-in / Move-out Cleaning",
      "Sofa & Mattress Cleaning",
    ],
  },
};

export default function SubcategoryPage({ params }: { params: { category: string } }) {
  const category = params?.category;
  const data = categoryData[category];
  const router = useRouter();
  const [selectedSub, setSelectedSub] = React.useState<string | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]">
        <span className="text-[#00838F] text-lg font-semibold">Category not found</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden py-8 px-2">
      <div className="flex flex-col items-center mb-8">
        {data.icon}
        <Title level={3} className="text-[#00838F] mt-2 mb-0 text-center">{data.name}</Title>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto mb-8">
        {data.subcategories.map((sub: string, idx: number) => (
          <Card
            key={idx}
            hoverable
            onClick={() => setSelectedSub(sub)}
            className={`flex items-center bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 rounded-[14px] shadow-[0_4px_10px_rgba(0,188,212,0.10)] transition-transform duration-200 hover:scale-105 cursor-pointer px-4 py-4 ${selectedSub === sub ? 'ring-2 ring-[#00BCD4]' : ''}`}
            bodyStyle={{ padding: 0 }}
          >
            <span className="text-base font-medium text-[#006064]">{sub}</span>
          </Card>
        ))}
      </div>
      <button
        disabled={!selectedSub}
        onClick={() => selectedSub && router.push(`/user/services/${category}/${encodeURIComponent(selectedSub)}/find-fixer`)}
        className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-all duration-200 ${selectedSub ? 'bg-gradient-to-r from-[#00BCD4] to-[#00838F] hover:from-[#00838F] hover:to-[#00BCD4]' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Find the fixer for me
      </button>
    </div>
  );
} 