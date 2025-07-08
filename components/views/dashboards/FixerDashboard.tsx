"use client";

import React, { useState } from "react";
import { Button, Modal, Typography, Tag, Avatar, message } from "antd";
import {
  MapPin,
  DollarSign,
  User2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import ScalableCard from "@/components/card";

const { Title, Text } = Typography;

// Mock data for offers
const mockOffers = [
  {
    id: 1,
    customer: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    service: "AC Repair",
    price: 2500,
    location: "Bandra, Mumbai",
    time: "Today, 3:00 PM",
    status: "pending",
    details: "AC not cooling, needs urgent repair.",
  },
  {
    id: 2,
    customer: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    service: "Plumbing",
    price: 1200,
    location: "Andheri, Mumbai",
    time: "Tomorrow, 10:00 AM",
    status: "pending",
    details: "Leaking kitchen tap.",
  },
  {
    id: 3,
    customer: "Amit Patel",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    service: "Painting",
    price: 3500,
    location: "Powai, Mumbai",
    time: "Today, 5:30 PM",
    status: "accepted",
    details: "1BHK wall painting.",
  },
];

const statusColors: Record<string, string> = {
  pending: "orange",
  accepted: "green",
  declined: "red",
};

const FixerDashboard: React.FC = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAccept = (id: number) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, status: "accepted" } : offer
      )
    );
    message.success("Offer accepted!");
  };

  const handleDecline = (id: number) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, status: "declined" } : offer
      )
    );
    message.info("Offer declined.");
  };

  const showDetails = (offer: any) => {
    setSelectedOffer(offer);
    setModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc] px-2 md:px-0">
      <div className="max-w-2xl">
        <div className="p-2">
          {offers.length === 0 && (
            <ScalableCard className="text-center">
              <Text type="secondary">No offers at the moment.</Text>
            </ScalableCard>
          )}
          {offers.map((offer) => (
            <div className="mb-2" onClick={() => showDetails(offer)}>
              <ScalableCard
                key={offer.id}
                className="shadow-md border border-[#bae6fd] hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex flex-row items-start gap-4">
                  {/* Left: Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar src={offer.avatar} size={100} shape="square" />
                  </div>
                  {/* Right: Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Text className="font-semibold text-base">
                          {offer.customer}
                        </Text>
                        <Tag
                          color={statusColors[offer.status]}
                          className="capitalize"
                        >
                          {offer.status}
                        </Tag>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-600 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} className="text-[#0284c7]" />
                          {offer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={16} className="text-[#0284c7]" />₹
                          {offer.price}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="text-[#0284c7]" />
                          {offer.time}
                        </span>
                      </div>
                      <div className="mt-1 text-gray-500 text-xs">
                        {offer.service}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Buttons below info */}
                <div className="flex w-full gap-3 mt-4">
                  <Button
                    type="primary"
                    icon={<CheckCircle size={18} />}
                    className={`
                    !bg-gradient-to-r !from-green-400 !to-emerald-600
                    !border-none
                    !shadow-lg
                    !text-white
                    !font-bold
                    !px-5
                    !py-2
                    w-full
                    !rounded-sm
                    !transition-all
                    hover:!from-emerald-500 hover:!to-green-600
                    hover:!scale-105
                    active:!scale-95
                    disabled:!opacity-60
                  `}
                    size="middle"
                    disabled={offer.status !== "pending"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(offer.id);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    danger
                    icon={<XCircle size={18} />}
                    size="middle"
                    className={`
                    !bg-gradient-to-r !from-red-400 !to-pink-500
                    !border-none
                    !shadow-lg
                    !text-white
                    !font-bold
                    !px-5
                    !py-2
                    w-full
                    !rounded-sm
                    !transition-all
                    hover:!from-pink-500 hover:!to-red-600
                    hover:!scale-105
                    active:!scale-95
                    disabled:!opacity-60
                  `}
                    disabled={offer.status !== "pending"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecline(offer.id);
                    }}
                  >
                    Decline
                  </Button>
                </div>
              </ScalableCard>
            </div>
          ))}
        </div>

        <Modal
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          title={
            <div className="flex items-center gap-2">
              <User2 size={20} className="text-[#0284c7]" />
              <span>Offer Details</span>
            </div>
          }
        >
          {selectedOffer && (
            <div className="space-x-2">
              <div className="flex items-center gap-3 mb-3">
                <Avatar src={selectedOffer.avatar} size={40} />
                <div>
                  <Text className="font-semibold">
                    {selectedOffer.customer}
                  </Text>
                  <div className="text-xs text-gray-500">
                    {selectedOffer.service}
                  </div>
                </div>
                <Tag
                  color={statusColors[selectedOffer.status]}
                  className="ml-auto capitalize"
                >
                  {selectedOffer.status}
                </Tag>
              </div>
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <MapPin size={16} className="text-[#0284c7]" />
                <span>{selectedOffer.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <DollarSign size={16} className="text-[#0284c7]" />
                <span>₹{selectedOffer.price}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <Clock className="text-[#0284c7]" />
                <span>{selectedOffer.time}</span>
              </div>
              <div className="mb-3">
                <Text className="text-gray-600">{selectedOffer.details}</Text>
              </div>
              <div className="flex gap-3">
                <Button
                  type="primary"
                  icon={<CheckCircle size={16} />}
                  className="bg-green-500 hover:bg-green-600 border-none"
                  disabled={selectedOffer.status !== "pending"}
                  onClick={() => {
                    handleAccept(selectedOffer.id);
                    setModalVisible(false);
                  }}
                >
                  Accept
                </Button>
                <Button
                  danger
                  icon={<XCircle size={16} />}
                  disabled={selectedOffer.status !== "pending"}
                  onClick={() => {
                    handleDecline(selectedOffer.id);
                    setModalVisible(false);
                  }}
                >
                  Decline
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FixerDashboard;
