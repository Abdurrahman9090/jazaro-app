"use client";

import { useState } from "react";
import { Row, Col, Button, Input, Select, Form, Typography, Avatar, Upload, message } from "antd";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AuthSelector } from "@/redux/reducers";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

// Category and subcategory data (copied from app/user/services/[category]/page.tsx)
const categoryData: Record<string, { name: string; subcategories: string[] }> = {
  electricians: {
    name: "Electricians",
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
    subcategories: [
      "Refrigerator, Washing Machine, Oven Fixing",
      "Microwave, Dishwasher & Dryer Repairs",
      "Water Dispenser and Heater Repair",
      "TV and Home Theater Setup",
    ],
  },
  mason: {
    name: "Mason / Construction Workers",
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
    subcategories: [
      "CCTV Installation & Troubleshooting",
      "Wi-Fi & Network Setup",
      "Smart Home Device Setup (Lights, Thermostats)",
      "Doorbell Cameras & Security Systems",
    ],
  },
  cleaning: {
    name: "Cleaning Services",
    subcategories: [
      "Deep Home Cleaning",
      "Office/Commercial Cleaning",
      "Move-in / Move-out Cleaning",
      "Sofa & Mattress Cleaning",
    ],
  },
};

export default function FixerRegisterPage() {
  const { user } = useSelector(AuthSelector);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    cnicImage: undefined as any,
    password: "",
    confirmPassword: "",
    profession: "",
    experience: "",
    location: "",
    bio: "",
    categories: [] as string[],
    subcategories: [] as string[], // Now a flat array of selected subcategories
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Fixer registration attempt with:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gather all subcategories from selected categories
  const allAvailableSubcategories = formData.categories
    .flatMap((cat) => categoryData[cat]?.subcategories || []);

  return (
    <div className="bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] px-4 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl" style={{marginBottom: 60 }}> >
        {/* User Profile Card */}
        {user && (
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-24 h-24 bg-white/80 backdrop-blur-[10px] rounded-full shadow-[0_4px_10px_rgba(0,188,212,0.3)] border border-[#00BCD4]/30 flex items-center justify-center mb-3">
              <Avatar size={96} src={user.avatar || "/placeholder-user.jpg"} className="bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] text-white font-bold text-3xl flex items-center justify-center">
                {user.username ? user.username.slice(0, 2).toUpperCase() : "U"}
              </Avatar>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl font-bold text-[#006064]">
                  {user.username || "User"}
                </span>
              </div>
              {user.email && (
                <div className="flex items-center justify-center gap-1 text-[#00838F] text-sm mb-1">
                  <MailOutlined className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {/* End User Profile Card */}
        <Form layout="vertical" onSubmitCapture={handleRegister}>
          <Title level={4} className="text-[#00838F]">Personal Information</Title>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="text-[#006064]">Full Name</span>} required>
                <Input
                  name="fullName"
                  prefix={<UserOutlined className="text-[#00838F]" />}
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="text-[#006064]">Email</span>} required>
                <Input
                  name="email"
                  type="email"
                  prefix={<MailOutlined className="text-[#00838F]" />}
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="text-[#006064]">Phone Number</span>} required>
                <Input
                  name="phone"
                  type="tel"
                  prefix={<PhoneOutlined className="text-[#00838F]" />}
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px]"
                />
              </Form.Item>
            </Col>
            {/* Group CNIC number and image in a single row */}
            <Col xs={24} md={12} className="flex flex-col gap-2">
              <Form.Item label={<span className="text-[#006064]">CNIC</span>} required>
                <Input
                  name="cnic"
                  prefix={<IdcardOutlined className="text-[#00838F]" />}
                  placeholder="Enter your CNIC number"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px]"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="flex flex-col gap-2">
              <Form.Item label={<span className="text-[#006064]">CNIC Image</span>} required>
                <Upload
                  name="cnicImage"
                  listType="picture-card"
                  showUploadList={false}
                  accept="image/*"
                  beforeUpload={file => {
                    const isImage = file.type.startsWith('image/');
                    if (!isImage) {
                      message.error('You can only upload image files!');
                      return Upload.LIST_IGNORE;
                    }
                    setFormData(prev => ({ ...prev, cnicImage: file }));
                    return false; // Prevent upload
                  }}
                  onRemove={() => setFormData(prev => ({ ...prev, cnicImage: undefined }))}
                >
                  {formData.cnicImage ? (
                    <img
                      src={URL.createObjectURL(formData.cnicImage)}
                      alt="CNIC"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#00BCD4]">
                      <PlusOutlined style={{ fontSize: 24 }} />
                      <div className="mt-1 text-xs">Upload CNIC</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={<span className="text-[#006064]">Location</span>} required>
                <Input
                  name="location"
                  prefix={<EnvironmentOutlined className="text-[#00838F]" />}
                  placeholder="Your location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px]"
                />
              </Form.Item>
            </Col>
            {/* Category Dropdown */}
            <Col xs={24} md={12}>
              <Form.Item label={<span className="text-[#006064]">Categories</span>} required>
                <Select
                  mode="multiple"
                  value={formData.categories}
                  onChange={categories => {
                    // When categories change, remove subcategories not in selected categories
                    setFormData(prev => {
                      // Remove subcategories that are not in the new categories
                      const newAvailableSubs = categories.flatMap(cat => categoryData[cat]?.subcategories || []);
                      const newSubcategories = prev.subcategories.filter(sub => newAvailableSubs.includes(sub));
                      return {
                        ...prev,
                        categories,
                        subcategories: newSubcategories,
                      };
                    });
                  }}
                  placeholder="Select categories"
                  className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] rounded-[10px] w-full"
                  showSearch
                  optionFilterProp="children"
                >
                  {Object.entries(categoryData).map(([key, cat]) => (
                    <Option key={key} value={key}>{cat.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* Only one subcategory bar for all selected categories */}
            {formData.categories.length > 0 && (
              <Col xs={24} md={24}>
                <Form.Item
                  label={
                    <span className="text-[#006064]">
                      Subcategories for {formData.categories.map(cat => categoryData[cat]?.name).join(", ")}
                    </span>
                  }
                  required
                >
                  <Select
                    mode="multiple"
                    value={formData.subcategories}
                    onChange={subs => setFormData(prev => ({
                      ...prev,
                      subcategories: subs,
                    }))}
                    placeholder={`Select subcategories`}
                    className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] rounded-[10px] w-full"
                    showSearch
                    optionFilterProp="children"
                  >
                    {allAvailableSubcategories.map((sub: string) => (
                      <Option key={sub} value={sub}>{sub}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item label={<span className="text-[#006064]">Professional Bio</span>} required>
            <TextArea
              name="bio"
              placeholder="Tell us about your experience and expertise..."
              value={formData.bio}
              onChange={handleChange}
              className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px] min-h-[100px]"
              rows={4}
            />
          </Form.Item>

          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              id="terms"
              required
              className="rounded border-[#00BCD4]/30 text-[#00BCD4] focus:ring-[#00BCD4]/20"
            />
            <Text className="text-sm text-[#00838F]">
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-[#00BCD4] hover:text-[#00838F] transition-colors"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-[#00BCD4] hover:text-[#00838F] transition-colors"
              >
                Privacy Policy
              </Link>
            </Text>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            className="w-full bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px] mt-6 flex items-center justify-center"
          >
            Create Fixer Account
          </Button>
        </Form>
      </div>
    </div>
  );
}