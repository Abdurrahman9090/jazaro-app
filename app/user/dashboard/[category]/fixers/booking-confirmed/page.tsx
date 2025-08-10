"use client";

import { Card, Button, Avatar, Timeline, Typography } from "antd";
import {
  CheckCircleOutlined,
  CarOutlined,
  PhoneOutlined,
  MessageOutlined,
  UserOutlined,
  StarFilled,
  ClockCircleOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

const { Title, Text } = Typography;

const FIXERS = [
  {
    id: 1,
    name: "John Martinez",
    rating: 4.9,
    reviews: 127,
    avatar: "/placeholder-user.jpg",
    specialties: ["TV Repair", "Electronics", "Home Theater"],
    hourlyRate: 45,
    fixedPrice: 120,
    vehicle: "Blue Honda Civic - ABC 123",
    eta: "3:15 PM",
    serviceType: "TV Repair",
    estimatedDuration: "1-2 hours",
    total: 120,
    statusTimeline: [
      { time: "2:45 PM", label: "Booking Confirmed" },
      { time: "2:50 PM", label: "Fixer Preparing" },
      { time: "3:00 PM", label: "On the Way" },
      { time: "3:15 PM", label: "Arrived" },
      { time: "", label: "Working" },
      { time: "", label: "Completed" },
    ],
    specialist: "TV Repair Specialist",
  },
  {
    id: 2,
    name: "Sarah Lee",
    rating: 4.8,
    reviews: 98,
    avatar: "/placeholder-user.jpg",
    specialties: ["Plumbing", "Leak Repair"],
    hourlyRate: 50,
    fixedPrice: 140,
    vehicle: "Red Toyota Corolla - XYZ 456",
    eta: "3:30 PM",
    serviceType: "Leak Repair",
    estimatedDuration: "2-3 hours",
    total: 140,
    statusTimeline: [
      { time: "2:55 PM", label: "Booking Confirmed" },
      { time: "3:00 PM", label: "Fixer Preparing" },
      { time: "3:10 PM", label: "On the Way" },
      { time: "3:30 PM", label: "Arrived" },
      { time: "", label: "Working" },
      { time: "", label: "Completed" },
    ],
    specialist: "Plumbing Specialist",
  },
  // Add more fixers as needed
];

export default function BookingConfirmed() {
  const searchParams = useSearchParams();
  const fixerId = Number(searchParams.get("id"));
  const fixer = FIXERS.find((f) => f.id === fixerId) || FIXERS[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10 flex flex-col items-center">
        <CheckCircleOutlined className="text-4xl text-green-500 mb-2" />
        <Title level={4} className="!mb-0 text-[#00838F] text-center">
          Booking Confirmed!
        </Title>
        <Text className="text-[#00838F] text-base">
          Your fixer is on the way
        </Text>
      </div>

      {/* Live Tracking & ETA */}
      <div className="p-4">
        <Card className="mb-4 bg-[#E0F7FA] border-none text-center">
          <div className="font-semibold text-[#00838F] text-lg mb-1">
            Live Tracking
          </div>
          <div className="text-xs text-gray-500 mb-2">Estimated Arrival</div>
          <div className="text-3xl font-bold text-[#00BCD4] mb-2">
            {fixer.eta}
          </div>
          <div className="text-base text-[#00838F]">
            {fixer.name} is on the way
          </div>
        </Card>
      </div>

      {/* Vehicle Info & Fixer Info */}
      <div className="px-4 flex gap-4 mb-4">
        <Card className="flex-1 bg-white border-none flex flex-col items-center justify-center">
          <CarOutlined className="text-2xl text-[#00BCD4] mb-1" />
          <div className="font-medium text-[#00838F]">{fixer.vehicle}</div>
        </Card>
        <Card className="flex-1 bg-white border-none flex flex-col items-center justify-center">
          <Avatar
            size={48}
            src={fixer.avatar}
            icon={<UserOutlined />}
            className="mb-1"
          />
          <div className="font-semibold text-[#00838F]">{fixer.name}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <StarFilled className="text-yellow-400" /> {fixer.rating} (
            {fixer.reviews} reviews)
          </div>
          <div className="text-xs text-[#00BCD4]">{fixer.specialist}</div>
          <div className="flex gap-2 mt-2">
            <Button
              icon={<PhoneOutlined />}
              shape="round"
              className="border-[#00BCD4] text-[#00BCD4]"
            />
            <Button
              icon={<MessageOutlined />}
              shape="round"
              className="border-[#00BCD4] text-[#00BCD4]"
            />
          </div>
        </Card>
      </div>

      {/* Service Status Timeline */}
      <div className="px-4 mb-4">
        <Card className="bg-white border-none">
          <div className="font-semibold text-[#00838F] mb-2">
            Service Status
          </div>
          <Timeline
            mode="left"
            items={fixer.statusTimeline.map((item, idx) => ({
              label: item.time,
              children: (
                <span
                  className={
                    idx === 3 ? "font-semibold text-[#00BCD4]" : undefined
                  }
                >
                  {item.label}
                </span>
              ),
              dot:
                idx === 0 ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : undefined,
              color: idx === 3 ? "blue" : undefined,
            }))}
          />
        </Card>
      </div>

      {/* Service Details */}
      <div className="px-4 mb-4">
        <Card className="bg-white border-none">
          <div className="font-semibold text-[#00838F] mb-2">
            Service Details
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Service Type</span>
              <span className="text-[#00838F]">{fixer.serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pricing</span>
              <span className="text-[#00BCD4]">
                Fixed Price - ${fixer.fixedPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Duration</span>
              <span className="text-[#00838F]">{fixer.estimatedDuration}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Estimate</span>
              <span className="text-[#00BCD4]">${fixer.total}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation & Emergency Support */}
      <div className="px-4 pb-6">
        <div className="flex gap-2 mb-4">
          <Button
            icon={<HomeOutlined />}
            className="flex-1 border-[#00BCD4] text-[#00BCD4]"
          >
            Home
          </Button>
          <Button
            icon={<MessageOutlined />}
            className="flex-1 border-[#00BCD4] text-[#00BCD4]"
          >
            Chat
          </Button>
        </div>
        <Card className="bg-[#FFEBEE] border-none flex flex-col items-center text-center">
          <ExclamationCircleOutlined className="text-2xl text-[#C62828] mb-2" />
          <div className="font-semibold text-[#C62828] mb-1">Need Help?</div>
          <div className="text-sm text-[#C62828] mb-2">
            If you have any issues or emergencies, contact our support team
            immediately.
          </div>
          <Button type="primary" danger className="w-full">
            Emergency Support
          </Button>
        </Card>
      </div>
    </div>
  );
}
