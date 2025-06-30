"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card, Typography, Button, message } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import("../../../../../components/LeafletMap"), { ssr: false });

const mockFixers = [
  {
    id: "fixer1",
    name: "Ali Electrician",
    offer: "Rs. 1500 - Quick Repair",
    distance: "1.2 km",
    lat: 24.8607,
    lng: 67.0011,
  },
  {
    id: "fixer2",
    name: "Usman Electric Works",
    offer: "Rs. 1200 - Standard",
    distance: "2.0 km",
    lat: 24.8650,
    lng: 67.0090,
  },
  {
    id: "fixer3",
    name: "Sanaullah Fixers",
    offer: "Rs. 1800 - Premium",
    distance: "0.8 km",
    lat: 24.8570,
    lng: 67.0050,
  },
  {
    id: "fixer4",
    name: "QuickFix Team",
    offer: "Rs. 1400 - Fast Service",
    distance: "1.5 km",
    lat: 24.8620,
    lng: 67.0030,
  },
];

export default function FindFixerPage({ params }: { params: { category: string; subcategory: string } }) {
  const router = useRouter();
  const [selectedFixer, setSelectedFixer] = useState<string | null>(null);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0 && !selectedFixer) {
      message.warning("Time's up! Please try again.");
      router.back();
    }
    if (timer > 0 && !selectedFixer) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, selectedFixer, router]);

  useEffect(() => {
    if (selectedFixer) {
      setTimeout(() => {
        router.push(`/user/services/${params.category}/${encodeURIComponent(params.subcategory)}/fixer/${selectedFixer}`);
      }, 800);
    }
  }, [selectedFixer, params, router]);

  // Mock user location (Karachi)
  const userLocation = { lat: 24.8607, lng: 67.0011 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden py-6 px-2">
      <Title level={4} className="text-[#00838F] mb-2 text-center">Nearby Fixers</Title>
      <div className="mb-4 flex items-center justify-center gap-2">
        <ClockCircleOutlined className="text-[#00BCD4] text-lg" />
        <span className="text-[#00838F] font-semibold">{timer} seconds to choose</span>
      </div>
      <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
        {/* Map with user and fixer markers */}
        <LeafletMap userLocation={userLocation} fixers={mockFixers} />
      </div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
        {mockFixers.map((fixer) => (
          <Card
            key={fixer.id}
            hoverable
            onClick={() => setSelectedFixer(fixer.id)}
            className={`flex items-center justify-between bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 rounded-[14px] shadow-[0_4px_10px_rgba(0,188,212,0.10)] transition-transform duration-200 hover:scale-105 cursor-pointer px-4 py-4 ${selectedFixer === fixer.id ? 'ring-2 ring-[#00BCD4]' : ''}`}
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex items-center gap-3">
              <UserOutlined className="text-2xl text-[#00BCD4]" />
              <div>
                <div className="font-semibold text-[#006064]">{fixer.name}</div>
                <div className="text-xs text-[#00838F]">{fixer.offer}</div>
              </div>
            </div>
            <div className="text-xs text-[#00838F] font-bold">{fixer.distance}</div>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center text-xs text-[#00838F]">Select a fixer to proceed</div>
    </div>
  );
} 