"use client";

import { useState } from "react";
import { Row, Col,Button, Input, Select, Checkbox, Form, Typography } from "antd";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AuthSelector } from "@/redux/reducers";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export default function FixerRegisterPage() {
  const { user } = useSelector(AuthSelector);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profession: "",
    experience: "",
    location: "",
    bio: "",
    specialties: [] as string[],
    certifications: [] as string[],
  });

  const specialties = [
    "Electronics Repair",
    "Home Appliances",
    "Furniture",
    "Plumbing",
    "Electrical",
    "HVAC",
    "Carpentry",
    "Automotive",
    "Computer Repair",
    "Smart Home",
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => setStep(1);

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

  const handleSpecialtyChange = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleCertificationAdd = () => {
    const cert = prompt("Enter certification name:");
    if (cert) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, cert],
      }));
    }
  };

  const handleCertificationRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] px-4 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl">
        {step === 1 ? (
          <Form layout="vertical" onSubmitCapture={handleNext}>
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
            </Row>

            <Title level={4} className="text-[#00838F] mt-8 mb-4">Professional Information</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label={<span className="text-[#006064]">Main Profession</span>} required>
                  <Input
                    name="profession"
                    prefix={<IdcardOutlined className="text-[#00838F]" />}
                    placeholder="Your Profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] rounded-[10px]"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label={<span className="text-[#006064]">Years of Experience</span>} required>
                  <Select
                    value={formData.experience || undefined}
                    onChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                    placeholder="Select experience"
                    className="bg-white/80 border border-[#00BCD4]/30 text-[#006064] rounded-[10px] w-full"
                  >
                    <Option value="0-1">0-1 years</Option>
                    <Option value="1-3">1-3 years</Option>
                    <Option value="3-5">3-5 years</Option>
                    <Option value="5-10">5-10 years</Option>
                    <Option value="10+">10+ years</Option>
                  </Select>
                </Form.Item>
              </Col>
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

            <Button
              htmlType="submit"
              type="primary"
              className="w-full bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px] mt-6 flex items-center justify-center"
            >
              Next <ArrowRightOutlined className="inline h-4 w-4 ml-2" />
            </Button>
          </Form>
        ) : (
          <Form layout="vertical" onSubmitCapture={handleRegister} className="space-y-4">
            <Title level={4} className="text-[#00838F] mb-4">Specialties</Title>
            <Row gutter={12}>
              {specialties.map((specialty) => (
                <Col xs={12} md={8} key={specialty}>
                  <div
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      formData.specialties.includes(specialty)
                        ? "bg-[#00BCD4] text-white"
                        : "bg-white/80 hover:bg-[#00BCD4]/10"
                    }`}
                    onClick={() => handleSpecialtyChange(specialty)}
                  >
                    <Checkbox
                      checked={formData.specialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                    />
                    <span className="text-sm">{specialty}</span>
                  </div>
                </Col>
              ))}
            </Row>

            <Title level={4} className="text-[#00838F] mt-8 mb-4">Certifications</Title>
            <div className="space-y-2">
              {formData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/80 p-2 rounded-lg"
                >
                  <span className="text-[#006064]">{cert}</span>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleCertificationRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={handleCertificationAdd}
                className="w-full bg-white/80 text-[#00838F] hover:bg-[#00BCD4]/10 border border-[#00BCD4]/30"
                icon={<PlusOutlined />}
              >
                Add Certification
              </Button>
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <Checkbox
                id="terms"
                className="rounded border-[#00BCD4]/30 text-[#00BCD4] focus:ring-[#00BCD4]/20"
                required
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

            <div className="flex justify-between gap-4 mt-6">
              <Button
                type="default"
                className="bg-white/80 text-[#00838F] border border-[#00BCD4]/30 hover:bg-[#00BCD4]/10 rounded-[10px] flex items-center"
                onClick={handleBack}
                icon={<ArrowLeftOutlined />}
              >
                Back
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px] flex items-center"
              >
                Create Fixer Account
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
