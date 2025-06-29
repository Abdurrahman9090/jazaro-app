"use client";

import { useState } from "react";
import { Button, Card, Avatar, Badge, Input } from "antd";
import {
  ArrowLeftOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MoreOutlined,
  SendOutlined,
  CameraOutlined,
  AudioOutlined,
  RobotOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  AudioFilled,
} from "@ant-design/icons";
import Link from "next/link";
import CameraModal from "@/components/camera-modal";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const conversations = [
    {
      id: 1,
      name: "Mike Rodriguez",
      specialty: "Electronics Repair",
      lastMessage: "I can fix your TV screen today. When would be convenient?",
      timestamp: "2 min ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "Appliance Repair",
      lastMessage: "Thanks for the photos. I'll need to see it in person.",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
    },
    {
      id: 3,
      name: "David Chen",
      specialty: "Plumbing Expert",
      lastMessage: "The repair is complete. Please check and confirm.",
      timestamp: "Yesterday",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "fixer",
      content:
        "Hi! I saw your repair request for the TV. I can help you with that.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      content:
        "Great! The screen is cracked and there are some lines appearing.",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "fixer",
      content: "I can fix your TV screen today. When would be convenient?",
      timestamp: "10:35 AM",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData);
    // Here you would typically send the image to your backend for processing
    // or add it to the current conversation
  };

  if (selectedChat) {
    const currentChat = conversations.find((c) => c.id === selectedChat);

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
        {/* Chat Header */}
        <div className="relative z-10 bg-white/50 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              type="text"
              size="small"
              onClick={() => setSelectedChat(null)}
              className="p-0 text-[#006064] hover:text-[#00838F]"
              icon={<ArrowLeftOutlined className="h-6 w-6" />}
            />
            <div className="w-12 h-12 bg-white/80 backdrop-blur-[10px] rounded-[10px] shadow-[0_4px_10px_rgba(0,188,212,0.3)] border border-[#00BCD4]/30 flex items-center justify-center">
              <Avatar 
                size={40}
                src={currentChat?.avatar || "/placeholder.svg"}
                className="bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] text-white font-bold"
              >
                {currentChat?.name.slice(0, 2)}
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-[#006064] truncate">
                {currentChat?.name}
              </h2>
              <p className="text-sm text-[#00838F] truncate">
                {currentChat?.specialty}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="small"
                type="text"
                className="p-2 bg-[#4DD0E1]/20 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] hover:bg-[#4DD0E1]/30 rounded-[10px]"
                icon={<VideoCameraOutlined className="h-5 w-5" />}
              />
              <Button
                size="small"
                type="text"
                className="p-2 bg-[#26C6DA]/20 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] hover:bg-[#26C6DA]/30 rounded-[10px]"
                icon={<PhoneOutlined className="h-5 w-5" />}
              />
              <Button
                size="small"
                type="text"
                className="p-2 text-[#006064] hover:text-[#00838F]"
                icon={<MoreOutlined className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>

        {/* Video Diagnostics Banner */}
        <div className="relative z-10 bg-gradient-to-r from-[#4DD0E1]/20 to-[#00BCD4]/20 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] rounded-[10px] shadow-[0_0_20px_rgba(77,208,225,0.5)] flex items-center justify-center">
              <VideoCameraOutlined className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#006064]">
                Video Diagnostics Available
              </p>
              <p className="text-xs text-[#00838F]">
                Get real-time assessment of your issue
              </p>
            </div>
            <Button
              size="small"
              type="primary"
              className="bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white hover:from-[#26C6DA] hover:to-[#00ACC1] shadow-[0_0_20px_rgba(77,208,225,0.5)] rounded-[20px]"
            >
              Start Call
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 px-4 py-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-[10px] backdrop-blur-[10px] shadow-[0_4px_10px_rgba(0,188,212,0.3)] transition-all duration-300 hover:scale-105 ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] text-white shadow-[0_0_20px_rgba(0,188,212,0.3)]"
                    : "bg-white/80 border border-[#00BCD4]/30 text-[#006064]"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-[#00838F]"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Need Help Button */}
        <div className="relative z-10 px-4 py-2">
          <Button
            type="default"
            size="small"
            className="w-full bg-white/60 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[20px]"
            icon={<RobotOutlined className="h-4 w-4 mr-2" />}
          >
            Need Help? Chat with Bot
          </Button>
        </div>

        {/* Message Input */}
        <div className="relative z-10 bg-white/60 backdrop-blur-[10px] border-t border-[#00BCD4]/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              size="small"
              type="text"
              className="p-2 bg-[#26C6DA]/20 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] hover:bg-[#26C6DA]/30 rounded-[10px]"
              icon={<CameraOutlined className="h-5 w-5" />}
              onClick={() => setIsCameraOpen(true)}
            />
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="pr-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="small"
                type="text"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-[#006064] hover:text-[#00838F]"
                icon={<AudioOutlined className="h-4 w-4" />}
              />
            </div>
            <Button
              size="small"
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] text-white hover:from-[#00ACC1] hover:to-[#00BCD4] p-2 rounded-[10px] shadow-[0_0_20px_rgba(0,188,212,0.5)]"
              icon={<SendOutlined className="h-4 w-4" />}
            />
          </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Search */}
      <div className="relative z-10 px-4 py-3 bg-white/50 backdrop-blur-[10px] border-b border-[#00BCD4]/20">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchOutlined className="h-4 w-4 text-[#00838F]" />
          </span>
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="relative z-10 px-4 py-4 space-y-2 pb-20">
        {conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="border-0 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 cursor-pointer hover:bg-white/90 transition-all duration-300 hover:border-[#00BCD4]/50 shadow-[0_4px_10px_rgba(0,188,212,0.3)] hover:shadow-[0_8px_20px_rgba(0,188,212,0.2)] transform hover:scale-105 rounded-[10px]"
            onClick={() => setSelectedChat(conversation.id)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-14 h-14 bg-white/80 backdrop-blur-[10px] rounded-[10px] shadow-[0_4px_10px_rgba(0,188,212,0.3)] border border-[#00BCD4]/30 flex items-center justify-center">
                    <Avatar className="h-12 w-12" src={conversation.avatar || "/placeholder.svg"}>
                      {conversation.name.slice(0, 2)}
                    </Avatar>
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4CAF50] border-2 border-white rounded-full shadow-[0_0_10px_rgba(76,175,80,0.8)] animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#006064] truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#00838F]">
                        {conversation.timestamp}
                      </span>
                      {conversation.unread > 0 && (
                        <Badge className="bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,188,212,0.5)]">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#00838F] mb-1">
                    {conversation.specialty}
                  </p>
                  <p className="text-sm text-[#006064] truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
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
