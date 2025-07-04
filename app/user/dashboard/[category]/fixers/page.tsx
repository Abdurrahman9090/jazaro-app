"use client";

import { useRouter } from "next/navigation";
import { Card, Button, Input, Avatar, List, Typography } from "antd";
import { EnvironmentOutlined, SearchOutlined, UserOutlined, StarFilled, ClockCircleOutlined, MessageOutlined, AimOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Title, Text } = Typography;

const FIXER = {
  id: 1,
  name: "John Martinez",
  rating: 4.9,
  reviews: 127,
  distance: "0.8 miles",
  eta: "15-20 min",
  avatar: "/placeholder-user.jpg",
  specialties: ["TV Repair", "Electronics", "Home Theater"],
  hourlyRate: 45,
  fixedPrice: 120,
  availability: "Available now",
  location: "Downtown Area",
  completedJobs: 340,
  responseTime: "< 5 min",
  verified: true,
  isOnline: true,
};

export default function FixersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  // For demo, always show the same fixer
  const fixers = [FIXER, FIXER, FIXER];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-10">
        <Title level={4} className="!mb-0 text-[#00838F]">Available Fixers</Title>
      </div>
      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search fixers, skills, etc."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-lg"
        />
      </div>
      {/* Map Placeholder */}
      <div className="p-4">
        <Card className="mb-4 bg-[#E0F7FA] border-none text-center">
          <AimOutlined className="text-3xl text-[#00BCD4] mb-2" />
          <div className="font-medium text-[#00838F]">Map View (Coming Soon)</div>
          <div className="text-xs text-gray-500">See fixers near your location on the map</div>
        </Card>
      </div>
      {/* Fixers List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <List
          itemLayout="vertical"
          dataSource={fixers}
          renderItem={fixer => (
            <Card className="mb-4 shadow-md" key={fixer.id}>
              <div className="flex items-center gap-4">
                <Avatar size={56} src={fixer.avatar} icon={<UserOutlined />} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg text-[#00838F]">{fixer.name}</span>
                    {fixer.verified && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Verified</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <StarFilled className="text-yellow-400" /> {fixer.rating} ({fixer.reviews} reviews)
                    <span className="mx-2">•</span>
                    <EnvironmentOutlined /> {fixer.distance}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {fixer.specialties.map(s => (
                      <span key={s} className="bg-[#E0F7FA] text-[#00BCD4] px-2 py-0.5 rounded text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <ClockCircleOutlined /> ETA: {fixer.eta}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <UserOutlined /> {fixer.completedJobs} jobs
                  </div>
                </div>
                {/* Price Display */}
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-[#00BCD4]">${fixer.hourlyRate}/hr</span>
                  <span className="text-xs text-gray-500">Hourly</span>
                  <span className="text-sm font-semibold text-[#00838F] mt-1">${fixer.fixedPrice}</span>
                  <span className="text-xs text-gray-500">Fixed</span>
                </div>
              </div>
              {/* Accept/Reject Buttons */}
              <div className="flex gap-2 mt-4 justify-end">
                <Button
                  type="primary"
                  className="bg-[#00BCD4] hover:bg-[#00838F] text-white font-semibold"
                  onClick={() => router.push(`/user/dashboard/[category]/fixers/booking-confirmed?id=${fixer.id}`)}
                >
                  Accept
                </Button>
                <Button
                  danger
                  className="font-semibold"
                  // onClick logic for Reject can be added here
                >
                  Reject
                </Button>
              </div>
            </Card>
          )}
        />
      </div>
    </div>
  );
} 