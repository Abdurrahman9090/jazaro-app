"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Edit,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Shield,
  DollarSign,
  MessageCircle,
  Search,
  User,
  Settings,
  CheckCircle,
  Bell,
  Camera,
  Menu,
} from "lucide-react";
import Link from "next/link";
import CameraModal from "@/components/camera-modal";

export default function ProfilePage() {
  const [userRole] = useState<"customer" | "fixer">("customer");
  const [insuranceLinked, setInsuranceLinked] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const customerProfile = {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    memberSince: "January 2024",
    avatar: "/placeholder.svg?height=80&width=80",
    totalRequests: 12,
    completedRepairs: 10,
    avgRating: 4.8,
  };

  const repairHistory = [
    {
      id: 1,
      item: "Samsung TV",
      fixer: "Mike Rodriguez",
      date: "Dec 15, 2024",
      cost: 180,
      rating: 5,
      status: "completed",
    },
    {
      id: 2,
      item: "Kitchen Faucet",
      fixer: "Sarah Johnson",
      date: "Dec 10, 2024",
      cost: 120,
      rating: 4,
      status: "completed",
    },
    {
      id: 3,
      item: "Office Chair",
      fixer: "David Chen",
      date: "Dec 5, 2024",
      cost: 75,
      rating: 5,
      status: "completed",
    },
  ];

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData);
    // Here you would typically send the image to your backend for processing
    // or use it to update profile picture
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full opacity-30 blur-xl"></div>
      </div>

      {/* Profile Header */}
      <div className="relative z-10 bg-white/50 backdrop-blur-[10px] px-4 py-6 border-b border-[#00BCD4]/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white/80 backdrop-blur-[10px] rounded-[20px] shadow-[0_4px_10px_rgba(0,188,212,0.3)] border border-[#00BCD4]/30 flex items-center justify-center">
            <Avatar className="h-18 w-18">
              {/* <AvatarImage src={customerProfile.avatar || "/placeholder.svg"} /> */}
              <AvatarFallback className="text-lg bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] text-white font-bold">
                {customerProfile.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-[#006064]">
                {customerProfile.name}
              </h2>
              <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
            </div>
            <p className="text-[#00838F] text-sm mb-2">Customer</p>
            <div className="flex items-center gap-4 text-sm text-[#00838F]">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{customerProfile.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Since {customerProfile.memberSince}</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Become a Fixer Button */}
        <div className="flex justify-center mt-6 mb-3">
          <Link href="/user/fixer-register" className="w-full">
            <Button
              className="w-full py-5 text-lg font-bold bg-gradient-to-r from-[#00BCD4] to-[#00838F] text-white shadow-lg rounded-[16px] hover:from-[#00838F] hover:to-[#00BCD4] transition-all duration-200 border-2 border-[#00BCD4]/40"
              size="lg"
            >
              Become a Fixer
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#006064]">
              {customerProfile.totalRequests}
            </div>
            <div className="text-xs text-[#00838F]">Requests</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#4CAF50]">
              {customerProfile.completedRepairs}
            </div>
            <div className="text-xs text-[#00838F]">Completed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-[#006064]">
                {customerProfile.avgRating}
              </span>
              <Star className="h-5 w-5 fill-[#FF9800] text-[#FF9800]" />
            </div>
            <div className="text-xs text-[#00838F]">Rating</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 px-4 py-4 pb-20">
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 rounded-[10px]">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00BCD4] data-[state=active]:to-[#26C6DA] data-[state=active]:text-white text-[#00838F] rounded-[10px]"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00BCD4] data-[state=active]:to-[#26C6DA] data-[state=active]:text-white text-[#00838F] rounded-[10px]"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00BCD4] data-[state=active]:to-[#26C6DA] data-[state=active]:text-white text-[#00838F] rounded-[10px]"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Contact Information */}
            <Card className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#006064]">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#00838F]" />
                  <span className="text-[#006064]">
                    {customerProfile.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#00838F]" />
                  <span className="text-[#006064]">
                    {customerProfile.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#00838F]" />
                  <span className="text-[#006064]">
                    {customerProfile.location}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Integration */}
            <Card className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-[#006064]">
                  <Shield className="h-5 w-5 text-[#26C6DA]" />
                  Insurance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#006064]">Link Insurance</p>
                    <p className="text-sm text-[#00838F]">
                      Connect your insurance for covered repairs
                    </p>
                  </div>
                  <Switch
                    checked={insuranceLinked}
                    onCheckedChange={setInsuranceLinked}
                  />
                </div>
                {insuranceLinked && (
                  <div className="mt-3 p-3 bg-[#4CAF50]/20 backdrop-blur-[10px] rounded-[10px] border border-[#4CAF50]/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4CAF50]" />
                      <span className="text-sm font-medium text-[#006064]">
                        Insurance Linked
                      </span>
                    </div>
                    <p className="text-xs text-[#00838F] mt-1">
                      State Farm Insurance - Policy #SF123456
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#006064]">
                  Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                    <span className="text-[#006064]">Email Verified</span>
                  </div>
                  <Badge className="bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                    <span className="text-[#006064]">Phone Verified</span>
                  </div>
                  <Badge className="bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30">
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {repairHistory.map((repair) => (
              <Card
                key={repair.id}
                className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#006064]">
                        {repair.item}
                      </h3>
                      <p className="text-sm text-[#00838F]">
                        Fixed by {repair.fixer}
                      </p>
                    </div>
                    <Badge className="bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#00838F]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{repair.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${repair.cost}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#FF9800] text-[#FF9800]" />
                      <span className="text-[#006064]">{repair.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#006064]">
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
