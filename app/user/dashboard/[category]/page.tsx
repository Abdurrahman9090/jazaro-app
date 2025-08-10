"use client";

import { useParams } from "next/navigation";
import {
  Card,
  Button,
  Input,
  Checkbox,
  Typography,
  Form,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import {
  ToolOutlined,
  ThunderboltOutlined,
  BuildOutlined,
  FormatPainterOutlined,
  FireOutlined,
  SettingOutlined,
  CarOutlined,
  LockOutlined,
  HomeOutlined,
  UserOutlined,
  LaptopOutlined,
  DeleteOutlined,
  CreditCardOutlined,
  DollarOutlined,
  CameraOutlined,
  AudioOutlined,
  EnvironmentOutlined,
  MobileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

// Main categories data (copied from main dashboard page for consistency)
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

// Updated subcategories for all main categories
const subcategoriesMap: Record<
  string,
  { key: string; name: string; description: string }[]
> = {
  electricians: [
    {
      key: "general-repair",
      name: "General Electrical Repairing",
      description: "All types of electrical repairs for home and office",
    },
    {
      key: "wiring",
      name: "House & Office Wiring",
      description: "Complete wiring solutions for buildings",
    },
    {
      key: "switchboard-panel",
      name: "Switchboard & Panel Installation",
      description: "Installation of switchboards and electrical panels",
    },
    {
      key: "circuit-breaker",
      name: "Circuit Breaker & Fuse Repair",
      description: "Repair and replacement of circuit breakers and fuses",
    },
    {
      key: "lighting",
      name: "Lighting Installation (Indoor/Outdoor)",
      description: "Indoor and outdoor lighting setup",
    },
    {
      key: "generator-ups",
      name: "Generator & UPS Setup",
      description: "Installation and maintenance of generators and UPS systems",
    },
  ],
  plumbers: [
    {
      key: "water-pipe",
      name: "Water Pipe Installation & Repair",
      description: "Install and repair water supply pipes",
    },
    {
      key: "sanitary-fitting",
      name: "Sanitary Fitting & Replacement",
      description: "Sanitary ware installation and replacement",
    },
    {
      key: "drainage",
      name: "Drainage & Sewerage Solutions",
      description: "Drainage and sewerage system services",
    },
    {
      key: "tank-cleaning",
      name: "Water Tank Cleaning",
      description: "Cleaning of water storage tanks",
    },
    {
      key: "leak",
      name: "Leak Detection & Fixing",
      description: "Fixing pipe and faucet leaks",
    },
    {
      key: "fixture-installation",
      name: "Bathroom & Kitchen Fixture Installation",
      description: "Install new bathroom and kitchen fixtures",
    },
  ],
  carpenters: [
    {
      key: "custom-woodwork",
      name: "Custom Woodwork",
      description: "Custom wood designs for home and office",
    },
    {
      key: "furniture",
      name: "Furniture Making & Repair",
      description: "Custom furniture and repairs",
    },
    {
      key: "cabinet-wardrobe",
      name: "Cabinet & Wardrobe Installation",
      description: "Installation of cabinets and wardrobes",
    },
    {
      key: "door-window",
      name: "Door and Window Fittings",
      description: "Fitting and repair of doors and windows",
    },
    {
      key: "shelving-storage",
      name: "Shelving and Storage Solutions",
      description: "Custom shelving and storage units",
    },
    {
      key: "wooden-flooring",
      name: "Wooden Flooring Installation",
      description: "Installation of wooden flooring",
    },
  ],
  painters: [
    {
      key: "interior-painting",
      name: "Interior Wall Painting",
      description: "Painting for indoor walls",
    },
    {
      key: "exterior-painting",
      name: "Exterior Wall Painting",
      description: "Painting for outdoor walls",
    },
    {
      key: "ceiling-decorative",
      name: "Ceiling & Decorative Paint",
      description: "Ceiling and decorative painting services",
    },
    {
      key: "wallpaper",
      name: "Wallpaper Installation & Removal",
      description: "Installation and removal of wallpapers",
    },
    {
      key: "surface-prep",
      name: "Surface Preparation (Plastering, Sanding)",
      description: "Plastering and sanding for painting prep",
    },
  ],
  hvac: [
    {
      key: "ac-install-repair",
      name: "Air Conditioner Installation & Repair",
      description: "Install and repair air conditioners",
    },
    {
      key: "hvac-system",
      name: "HVAC System Installation & Servicing",
      description: "Complete HVAC system services",
    },
    {
      key: "split-central-inverter",
      name: "Split, Central, and Inverter AC Handling",
      description: "Services for all AC types",
    },
    {
      key: "ventilation",
      name: "Ventilation Setup and Maintenance",
      description: "Ventilation system installation and upkeep",
    },
    {
      key: "gas-refilling",
      name: "Gas Refilling & Pipe Insulation",
      description: "AC gas refilling and pipe insulation",
    },
  ],
  "appliance-repair": [
    {
      key: "fridge-washing-oven",
      name: "Refrigerator, Washing Machine, Oven Fixing",
      description: "Repair of major home appliances",
    },
    {
      key: "microwave-dryer",
      name: "Microwave, Dishwasher & Dryer Repairs",
      description: "Fixing smaller household appliances",
    },
    {
      key: "water-dispenser-heater",
      name: "Water Dispenser and Heater Repair",
      description: "Repair of water dispensers and heaters",
    },
    {
      key: "tv-home-theater",
      name: "TV and Home Theater Setup",
      description: "Installation and repair of TVs and home theater systems",
    },
  ],
  mason: [
    {
      key: "brickwork-tiling",
      name: "Brickwork & Tiling",
      description: "Brickwork and tile installation services",
    },
    {
      key: "renovation",
      name: "Home and Office Renovation",
      description: "Complete renovation services",
    },
    {
      key: "plastering",
      name: "Wall Plastering & Painting Prep",
      description: "Plastering and prep for painting",
    },
    {
      key: "kitchen-bathroom",
      name: "Kitchen & Bathroom Remodeling",
      description: "Remodeling kitchens and bathrooms",
    },
    {
      key: "ceiling-design",
      name: "Ceiling Design (POP, Gypsum)",
      description: "Ceiling design with POP or gypsum",
    },
    {
      key: "foundation-repairs",
      name: "Foundation Repairs & Concrete Work",
      description: "Concrete work and foundation repairs",
    },
  ],
  mechanics: [
    {
      key: "car-repairs",
      name: "Car Mechanical Repairs",
      description: "Mechanical repairs for cars",
    },
    {
      key: "bike-servicing",
      name: "Motorcycle/Bike Servicing",
      description: "Servicing for motorcycles and bikes",
    },
    {
      key: "engine-diagnostics",
      name: "Engine Diagnostics",
      description: "Diagnosing engine issues",
    },
    {
      key: "battery-replacement",
      name: "Battery Replacement",
      description: "Replacing vehicle batteries",
    },
    {
      key: "oil-filter",
      name: "Oil & Filter Change",
      description: "Oil changes and filter replacements",
    },
  ],
  locksmiths: [
    {
      key: "lock-install-repair",
      name: "Lock Installation & Repair",
      description: "Installing and repairing locks",
    },
    {
      key: "digital-smart-lock",
      name: "Digital & Smart Lock Services",
      description: "Services for digital and smart locks",
    },
    {
      key: "door-un/SPDX-License-Identifier: MITunlocking",
      name: "Door Unlocking (Emergency)",
      description: "Emergency door unlocking services",
    },
    {
      key: "key-duplication",
      name: "Key Duplication",
      description: "Duplicating keys for homes and vehicles",
    },
    {
      key: "safe-install-repair",
      name: "Safe Installation & Repair",
      description: "Installing and repairing safes",
    },
  ],
  handyman: [
    {
      key: "tree-trimming",
      name: "Tree Trimming & Cutting",
      description: "Trimming and cutting trees",
    },
    {
      key: "gutter-cleaning",
      name: "Gutter Cleaning",
      description: "Cleaning and maintaining gutters",
    },
    {
      key: "pest-control",
      name: "Pest Control Services",
      description: "Pest removal and prevention",
    },
    {
      key: "carpet-cleaning",
      name: "Carpet Cleaning",
      description: "Deep cleaning of carpets",
    },
    {
      key: "lawn-mowing",
      name: "Lawn Mowing & Landscaping",
      description: "Lawn care and landscaping services",
    },
    {
      key: "wall-mounting",
      name: "Wall Mounting (TVs, Shelves, etc.)",
      description: "Mounting TVs and shelves",
    },
    {
      key: "minor-repairs",
      name: "Minor Home Repairs",
      description: "General minor repair services",
    },
  ],
  "vehicle-services": [
    {
      key: "car-detailing",
      name: "Car Detailing & Polishing",
      description: "Detailing and polishing vehicles",
    },
    {
      key: "touring-inspection",
      name: "Touring Inspection & Pre-Trip Services",
      description: "Vehicle checks for trips",
    },
    {
      key: "tyre-fitting",
      name: "Tyre Fitting & Puncture Repair",
      description: "Tyre services and puncture repairs",
    },
    {
      key: "ev-battery",
      name: "Electric Vehicle (EV) Battery Installation & Maintenance",
      description: "EV battery services",
    },
    {
      key: "windshield-repair",
      name: "Windshield & Glass Repair",
      description: "Repairing vehicle windshields and glass",
    },
  ],
  "it-smart-home": [
    {
      key: "cctv-install",
      name: "CCTV Installation & Troubleshooting",
      description: "CCTV setup and troubleshooting",
    },
    {
      key: "wifi-network",
      name: "Wi-Fi & Network Setup",
      description: "Setting up Wi-Fi and networks",
    },
    {
      key: "smart-home-devices",
      name: "Smart Home Device Setup (Lights, Thermostats)",
      description: "Installing smart home devices",
    },
    {
      key: "doorbell-cameras",
      name: "Doorbell Cameras & Security Systems",
      description: "Setting up security cameras and doorbells",
    },
  ],
  cleaning: [
    {
      key: "deep-home-cleaning",
      name: "Deep Home Cleaning",
      description: "Thorough cleaning of homes",
    },
    {
      key: "office-cleaning",
      name: "Office/Commercial Cleaning",
      description: "Cleaning for offices and commercial spaces",
    },
    {
      key: "move-in-out",
      name: "Move-in / Move-out Cleaning",
      description: "Cleaning for moving in or out",
    },
    {
      key: "sofa-mattress",
      name: "Sofa & Mattress Cleaning",
      description: "Cleaning sofas and mattresses",
    },
  ],
};

const urgencyLevels = [
  { id: "low", label: "Within a week", color: "#E8F5E8", textColor: "#2E7D32" },
  { id: "medium", label: "2-3 days", color: "#FFF8E1", textColor: "#F57C00" },
  {
    id: "high",
    label: "Today/Tomorrow",
    color: "#FFF3E0",
    textColor: "#E65100",
  },
  { id: "emergency", label: "ASAP", color: "#FFEBEE", textColor: "#C62828" },
];

const bankOptions = [
  { id: "chase", name: "Chase Bank", logo: "🏦" },
  { id: "bofa", name: "Bank of America", logo: "🏛️" },
  { id: "wells", name: "Wells Fargo", logo: "🏪" },
  { id: "citi", name: "Citibank", logo: "🏢" },
  { id: "usbank", name: "US Bank", logo: "🏦" },
  { id: "pnc", name: "PNC Bank", logo: "🏛️" },
  { id: "td", name: "TD Bank", logo: "🏪" },
  { id: "capital", name: "Capital One", logo: "🏢" },
];

const CategoryPage = () => {
  const params = useParams();
  const categoryKey = params?.category as string;

  // Find the main category object
  const mainCategory = categories.find((cat) => cat.key === categoryKey);

  // Get subcategories for the current category, or empty array if not found
  const subcategories = subcategoriesMap[categoryKey] || [];

  // State for selected subcategories
  const [selectedSubs, setSelectedSubs] = React.useState<string[]>([]);

  // Handle checkbox toggle
  const handleToggle = (key: string) => {
    setSelectedSubs((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Main Category Header */}
      <div className="flex flex-col items-center justify-center py-8">
        {mainCategory ? (
          <>
            <div className="flex items-center justify-center mb-2">
              {mainCategory.icon}
            </div>
            <div className="text-2xl font-bold text-[#00838F] mb-1 text-center">
              {mainCategory.name}
            </div>
            <div className="text-sm text-gray-500 text-center">
              {mainCategory.description}
            </div>
          </>
        ) : (
          <div className="text-xl font-bold text-[#00838F] mb-1 text-center capitalize">
            {categoryKey}
          </div>
        )}
      </div>

      {/* Subcategories as checklist */}
      <main className="flex-1 p-4 pt-0 overflow-y-auto">
        {subcategories.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              {subcategories.map((sub) => (
                <Card
                  key={sub.key}
                  hoverable
                  className={`flex flex-col items-center justify-center bg-white rounded-lg shadow-md transition-transform duration-200 border border-[#E0F7FA] ${
                    selectedSubs.includes(sub.key)
                      ? "ring-2 ring-[#00BCD4] scale-105"
                      : "hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,123,255,0.2)]"
                  }`}
                  bodyStyle={{ padding: "20px", textAlign: "center" }}
                  onClick={() => handleToggle(sub.key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="relative flex items-center justify-center w-full">
                      <Checkbox
                        checked={selectedSubs.includes(sub.key)}
                        onChange={() => handleToggle(sub.key)}
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 2,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                        aria-label={`Select ${sub.name}`}
                      />
                      {mainCategory && (
                        <div className="ml-6 w-full flex justify-center">
                          {React.cloneElement(mainCategory.icon, {
                            className:
                              "text-4xl text-[#00BCD4] bg-[#E0F7FA] p-3 rounded-full shadow-sm",
                          })}
                        </div>
                      )}
                    </div>
                    <span className="text-base font-semibold text-gray-800 leading-tight text-center">
                      {sub.name}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-2 text-center">
                      {sub.description}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            {/* Request Form (from RequestPage, without service selection) */}
            <RequestForm categoryKey={categoryKey} />
          </>
        ) : (
          <div className="text-gray-500 text-center">
            No subcategories found for this category.
          </div>
        )}
      </main>
    </div>
  );
};

function RequestForm({ categoryKey }: { categoryKey: string }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<{
    location: string;
    description: string;
    urgency: string[];
    photos: string[];
    paymentMethod: string[];
    selectedBank: string;
    pricingType: string;
    price: string;
  }>({
    location: "",
    description: "",
    urgency: [],
    photos: [],
    paymentMethod: [],
    selectedBank: "",
    pricingType: "",
    price: "",
  });

  const handleSubmit = (values: any) => {
    // Redirect to the available fixers page for this category
    router.push(`/user/dashboard/${categoryKey}/fixers`);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="p-4 space-y-6 pb-8"
      initialValues={formData}
      onValuesChange={(_, allValues) => setFormData(allValues)}
    >
      {/* Location */}
      <Form.Item
        label={
          <span className="text-base font-medium text-[#00838F]">
            Your Location
          </span>
        }
        name="location"
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input
          prefix={<EnvironmentOutlined className="text-[#00838F]/60" />}
          placeholder="Enter your address"
          className="pl-2"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="link"
          className="mt-2 text-[#00BCD4] border-none bg-transparent shadow-none p-0"
          icon={<EnvironmentOutlined className="h-4 w-4 mr-2" />}
        >
          Use Current Location
        </Button>
      </Form.Item>

      {/* Description */}
      <Form.Item
        label={
          <span className="text-base font-medium text-[#00838F]">
            Describe the Problem
          </span>
        }
        name="description"
        rules={[{ required: true, message: "Please describe the problem" }]}
      >
        <Input.TextArea
          placeholder="Tell us what's wrong and any details that might help..."
          className="min-h-[100px] text-base resize-none rounded-lg border-[#B2EBF2] focus:border-[#00BCD4] bg-white"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex gap-2 mt-3">
          <Button
            type="default"
            className="flex-1 border border-[#00BCD4] bg-white text-[#00BCD4]"
            icon={<CameraOutlined className="h-4 w-4 mr-2" />}
          >
            Add Photos
          </Button>
          <Button
            type="default"
            className="flex-1 border border-[#00BCD4] bg-white text-[#00BCD4]"
            icon={<AudioOutlined className="h-4 w-4 mr-2" />}
          >
            Voice Note
          </Button>
        </div>
      </Form.Item>

      {/* Urgency */}
      <Form.Item
        label={
          <span className="text-base font-medium text-[#00838F]">
            How urgent is this?
          </span>
        }
        name="urgency"
        rules={[
          {
            required: true,
            message: "Please select at least one urgency level",
            type: "array",
          },
        ]}
      >
        <div className="grid grid-cols-1 gap-2">
          {urgencyLevels.map((level) => {
            const selected = formData.urgency.includes(level.id);
            return (
              <Card
                key={level.id}
                className={selected ? "ring-2 ring-[#00BCD4]" : ""}
                hoverable
                style={{
                  background: selected ? level.color : undefined,
                  borderColor: selected ? "#00BCD4" : undefined,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const current = formData.urgency;
                  const next = selected
                    ? current.filter((id: string) => id !== level.id)
                    : [...current, level.id];
                  setFormData({ ...formData, urgency: next });
                  form.setFieldsValue({ urgency: next });
                }}
              >
                <div className=" flex items-center justify-between">
                  <span className="font-medium text-[#00838F]">
                    {level.label}
                  </span>
                  <span
                    className=" rounded-full text-l font-semibold"
                    style={{ background: level.color, color: level.textColor }}
                  >
                    {level.id.toUpperCase()}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </Form.Item>

      {/* Pricing Type */}
      <Form.Item
        label={
          <span className="text-base font-medium text-[#00838F]">
            Select Pricing Type
          </span>
        }
        name="pricingType"
        rules={[{ required: true, message: "Please select a pricing type" }]}
      >
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          className="w-full flex gap-4"
          onChange={(e) => {
            setFormData({
              ...formData,
              pricingType: e.target.value,
              price: "",
            });
            form.setFieldsValue({ pricingType: e.target.value, price: "" });
          }}
        >
          <Radio.Button value="hourly" className="flex-1 text-center">
            Hourly
          </Radio.Button>
          <Radio.Button value="fixed" className="flex-1 text-center">
            Fixed
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {/* Price Input */}
      <Form.Item
        shouldUpdate={(prev, curr) => prev.pricingType !== curr.pricingType}
        noStyle
      >
        {({ getFieldValue }) => {
          const pricingType = getFieldValue("pricingType");
          if (!pricingType) return null;
          return (
            <Form.Item
              name="price"
              label={
                <span className="text-base font-medium text-[#00838F]">
                  {pricingType === "hourly" ? "Hourly Rate" : "Fixed Price"}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: `Please enter a ${
                    pricingType === "hourly" ? "hourly rate" : "fixed price"
                  }`,
                },
              ]}
            >
              <Input
                prefix="$"
                suffix={pricingType === "hourly" ? "/hr" : undefined}
                placeholder={pricingType === "hourly" ? "$00/hr" : "$00"}
                type="number"
                min={0}
                className="w-full"
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      {/* Payment Method */}
      <Form.Item
        label={
          <span className="text-base font-medium text-[#00838F]">
            How would you like to pay?
          </span>
        }
        name="paymentMethod"
        rules={[
          {
            required: true,
            message: "Please select at least one payment method",
            type: "array",
          },
        ]}
      >
        <div className="grid grid-cols-1 gap-2">
          {/* Bank Payment */}
          {(() => {
            const selected = formData.paymentMethod.includes("bank");
            return (
              <Card
                className={selected ? "ring-2 ring-[#00BCD4] bg-[#E0F7FA]" : ""}
                hoverable
                style={{
                  borderColor: selected ? "#00BCD4" : undefined,
                  background: selected ? "#E0F7FA" : undefined,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const current = formData.paymentMethod;
                  const next = selected
                    ? current.filter((id: string) => id !== "bank")
                    : [...current, "bank"];
                  setFormData({ ...formData, paymentMethod: next });
                  form.setFieldsValue({ paymentMethod: next });
                }}
              >
                <div className="p-4 flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4] to-[#00838F] rounded-full flex items-center justify-center shadow-sm">
                    <CreditCardOutlined className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#00838F]">
                      Bank Transfer
                    </h4>
                    <p className="text-sm text-[#00838F]/60">
                      Pay securely through your bank
                    </p>
                  </div>
                </div>
              </Card>
            );
          })()}
          {/* Cash Payment */}
          {(() => {
            const selected = formData.paymentMethod.includes("cash");
            return (
              <Card
                className={selected ? "ring-2 ring-[#00BCD4] bg-[#E0F7FA]" : ""}
                hoverable
                style={{
                  borderColor: selected ? "#00BCD4" : undefined,
                  background: selected ? "#E0F7FA" : undefined,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const current = formData.paymentMethod;
                  const next = selected
                    ? current.filter((id: string) => id !== "cash")
                    : [...current, "cash"];
                  setFormData({ ...formData, paymentMethod: next });
                  form.setFieldsValue({ paymentMethod: next });
                }}
              >
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-full flex items-center justify-center shadow-sm">
                    <DollarOutlined className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#00838F]">Cash Payment</h4>
                    <p className="text-sm text-[#00838F]/60">
                      Pay directly to the fixer in cash
                    </p>
                  </div>
                  <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-[#4CAF50] text-white">
                    Popular
                  </span>
                </div>
              </Card>
            );
          })()}
          {/* Digital Wallets */}
          {(() => {
            const selected = formData.paymentMethod.includes("wallet");
            return (
              <Card
                className={
                  selected
                    ? "ring-2 ring-[#00BCD4] border-dashed border-2 border-[#B2EBF2] opacity-60"
                    : "border-dashed border-2 border-[#B2EBF2] opacity-60"
                }
                hoverable
                style={{
                  borderColor: selected ? "#00BCD4" : undefined,
                  background: undefined,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const current = formData.paymentMethod;
                  const next = selected
                    ? current.filter((id: string) => id !== "wallet")
                    : [...current, "wallet"];
                  setFormData({ ...formData, paymentMethod: next });
                  form.setFieldsValue({ paymentMethod: next });
                }}
              >
                <div className="p-4 text-center flex items-center gap-3">
                  <MobileOutlined className="h-8 w-8 mx-auto text-[#00838F]" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-[#00838F]/60 mb-2">
                      Digital Wallets
                    </p>
                    <p className="text-xs text-[#00838F]/40">
                      Apple Pay, Google Pay, PayPal
                    </p>
                  </div>
                  <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold border border-[#E0F7FA] text-[#00838F]">
                    Coming Soon
                  </span>
                </div>
              </Card>
            );
          })()}
        </div>
      </Form.Item>

      {/* Hidden field for selectedBank */}
      <Form.Item name="selectedBank" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item style={{ marginTop: 28, marginBottom: 40 }}>
        <Button
          className="w-full h-12 text-base font-semibold shadow-lg bg-[#00BCD4] text-white"
          disabled={!formData.location || !formData.paymentMethod.length}
          htmlType="submit"
        >
          Submit Request
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CategoryPage;
