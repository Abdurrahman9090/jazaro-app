"use client";

import { useState } from "react";
import { Button, Card, Badge, Avatar, Input, Tabs } from "antd";
import {
  SearchOutlined,
  StarFilled,
  CalendarOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RetweetOutlined,
  MessageOutlined,
  UserOutlined,
  FilterOutlined,
  CameraOutlined,
  MenuOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import CameraModal from "@/components/camera-modal";

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const repairHistory = [
    {
      id: 1,
      item: "Samsung TV",
      category: "Electronics",
      fixer: "Mike Rodriguez",
      fixerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Dec 15, 2024",
      cost: 180,
      rating: 5,
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
      recurring: false,
    },
    {
      id: 2,
      item: "Kitchen Faucet",
      category: "Plumbing",
      fixer: "Sarah Johnson",
      fixerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Dec 10, 2024",
      cost: 120,
      rating: 4,
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
      recurring: true,
    },
    {
      id: 3,
      item: "Office Chair",
      category: "Furniture",
      fixer: "David Chen",
      fixerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Dec 5, 2024",
      cost: 75,
      rating: 5,
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
      recurring: false,
    },
    {
      id: 4,
      item: "HVAC System",
      category: "HVAC",
      fixer: "Lisa Wong",
      fixerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Nov 28, 2024",
      cost: 250,
      rating: 5,
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
      recurring: true,
    },
    {
      id: 5,
      item: "Laptop Screen",
      category: "Electronics",
      fixer: "Alex Thompson",
      fixerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Nov 20, 2024",
      cost: 150,
      rating: 4,
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
      recurring: false,
    },
  ];

  const recurringServices = repairHistory.filter((item) => item.recurring);

  const filters = [
    { id: "all", name: "All", count: repairHistory.length },
    {
      id: "electronics",
      name: "Electronics",
      count: repairHistory.filter((r) => r.category === "Electronics").length,
    },
    {
      id: "plumbing",
      name: "Plumbing",
      count: repairHistory.filter((r) => r.category === "Plumbing").length,
    },
    { id: "recurring", name: "Recurring", count: recurringServices.length },
  ];

  const filteredHistory = repairHistory.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fixer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "recurring") return matchesSearch && item.recurring;
    return matchesSearch && item.category.toLowerCase() === selectedFilter;
  });

  const totalSpent = repairHistory.reduce((sum, item) => sum + item.cost, 0);
  const avgRating =
    repairHistory.reduce((sum, item) => sum + item.rating, 0) /
    repairHistory.length;

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData);
    // Here you would typically send the image to your backend for processing
    // or navigate to create a new repair request
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto relative overflow-hidden">
      {/* Stats */}
      <div className="relative z-10 px-2 py-4 bg-white/50 backdrop-blur-[10px]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-2 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#006064]">
              {repairHistory.length}
            </div>
            <div className="text-xs text-[#00838F]">Total Repairs</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-2 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#4CAF50]">
              ${totalSpent}
            </div>
            <div className="text-xs text-[#00838F]">Total Spent</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-2 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-[#006064]">
                {avgRating.toFixed(1)}
              </span>
              <StarFilled className="text-[#FF9800]" />
            </div>
            <div className="text-xs text-[#00838F]">Avg Rating</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-2 py-2 pb-20">
        <Tabs
          defaultActiveKey="all"
          className="space-y-4"
          items={[{
            key: 'all',
            label: 'All History',
            children: (
              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      placeholder="Search repairs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                    />
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <FilterOutlined className="h-4 w-4 text-[#006064] flex-shrink-0" />
                    {filters.map((filter) => (
                      <Button
                        key={filter.id}
                        type={selectedFilter === filter.id ? "primary" : "default"}
                        size="small"
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`whitespace-nowrap backdrop-blur-[10px] transition-all duration-300 rounded-[20px] ${
                          selectedFilter === filter.id
                            ? "bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] text-white shadow-[0_0_20px_rgba(0,188,212,0.5)] border-0"
                            : "bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80"
                        }`}
                      >
                        {filter.name} ({filter.count})
                      </Button>
                    ))}
                  </div>
                </div>
                {/* History List */}
                <div className="space-y-3">
                  {filteredHistory.map((repair) => (
                    <Card
                      key={repair.id}
                      className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] hover:shadow-[0_8px_20px_rgba(0,188,212,0.2)] transform hover:scale-105 transition-all duration-300 rounded-[10px]"
                    >
                      <div className="p-1">
                        <div className="flex gap-3">
                          <Image
                            src={repair.image || "/placeholder.svg"}
                            alt={repair.item}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded-[10px] border border-[#00BCD4]/30"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-[#006064] flex items-center gap-2">
                                  {repair.item}
                                  {repair.recurring && (
                                    <RetweetOutlined className="h-4 w-4 text-[#4DD0E1]" />
                                  )}
                                </h3>
                                <p className="text-sm text-[#00838F]">
                                  {repair.category}
                                </p>
                              </div>
                              <Badge
                                className="bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30 backdrop-blur-[10px]"
                                count={<span className="flex items-center"><CheckCircleOutlined className="h-3 w-3 mr-1" />Completed</span>}
                                style={{ backgroundColor: 'transparent', color: '#4CAF50', boxShadow: 'none' }}
                              />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar size={24} src={repair.fixerAvatar || "/placeholder.svg"}>
                                {repair.fixer.slice(0, 2)}
                              </Avatar>
                              <span className="text-sm text-[#00838F]">
                                {repair.fixer}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-[#00838F]">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <CalendarOutlined className="h-4 w-4" />
                                  <span>{repair.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarCircleOutlined className="h-4 w-4" />
                                  <span>${repair.cost}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <StarFilled className="h-4 w-4 text-[#FF9800]" />
                                <span className="text-[#006064]">
                                  {repair.rating}
                                </span>
                              </div>
                            </div>
                            {repair.recurring && (
                              <div className="mt-2 flex gap-2">
                                <Button
                                  size="small"
                                  type="default"
                                  className="flex-1 text-xs bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                                >
                                  <CalendarOutlined className="h-3 w-3 mr-1" />
                                  Reschedule
                                </Button>
                                <Button
                                  size="small"
                                  type="default"
                                  className="flex-1 text-xs bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                                >
                                  <ClockCircleOutlined className="h-3 w-3 mr-1" />
                                  Manage
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          }, {
            key: 'recurring',
            label: 'Recurring Services',
            children: (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] rounded-[20px] shadow-[0_0_20px_rgba(77,208,225,0.5)] flex items-center justify-center mx-auto mb-3">
                    <RetweetOutlined className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#006064] mb-2">
                    Recurring Services
                  </h3>
                  <p className="text-sm text-[#00838F] mb-4">
                    Manage your scheduled maintenance and recurring repairs
                  </p>
                </div>
                <div className="space-y-3">
                  {recurringServices.map((service) => (
                    <Card
                      key={service.id}
                      className="border-0 bg-white/80 backdrop-blur-[10px] border-l-4 border-l-[#4DD0E1] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]"
                    >
                      <div className="p-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-[#006064] flex items-center gap-2">
                              {service.item}
                              <Badge
                                className="text-xs border-[#4DD0E1]/30 text-[#4DD0E1] bg-[#4DD0E1]/10 backdrop-blur-[10px]"
                                count={<span className="flex items-center"><RetweetOutlined className="h-3 w-3 mr-1" />Monthly</span>}
                                style={{ backgroundColor: 'transparent', color: '#4DD0E1', boxShadow: 'none' }}
                              />
                            </h3>
                            <p className="text-sm text-[#00838F]">
                              by {service.fixer}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-[#4DD0E1]">
                            ${service.cost}/month
                          </span>
                        </div>
                        <div className="bg-[#4DD0E1]/20 backdrop-blur-[10px] p-3 rounded-[10px] mb-3 border border-[#4DD0E1]/30">
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarOutlined className="h-4 w-4 text-[#4DD0E1]" />
                            <span className="text-sm font-medium text-[#006064]">
                              Next Service
                            </span>
                          </div>
                          <p className="text-sm text-[#00838F]">
                            January 15, 2025 at 2:00 PM
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="small"
                            type="default"
                            className="flex-1 bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                          >
                            <CalendarOutlined className="h-4 w-4 mr-1" />
                            Reschedule
                          </Button>
                          <Button
                            size="small"
                            type="default"
                            className="flex-1 bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                          >
                            <MessageOutlined className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                          <Button
                            size="small"
                            type="default"
                            className="flex-1 text-[#F44336] border-[#F44336]/30 bg-[#F44336]/10 hover:bg-[#F44336]/20 rounded-[10px]"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          }]}
        />
      </div>
      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
