"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  CheckCircle,
  DollarSign,
  MapPin,
  MessageCircle,
  Repeat,
  Star,
  User,
  Search,
  Camera,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import CameraModal from "@/components/camera-modal"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "fixer_available",
      title: "New Fixer Available",
      message: "Mike Rodriguez is now available for electronics repair in your area",
      timestamp: "5 min ago",
      unread: true,
      icon: <Bell className="h-5 w-5 text-[#26C6DA]" />,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      type: "job_update",
      title: "Job Completed",
      message: "Your TV repair has been completed by Sarah Johnson",
      timestamp: "1 hour ago",
      unread: true,
      icon: <CheckCircle className="h-5 w-5 text-[#4CAF50]" />,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Plumbing repair scheduled for tomorrow at 2:00 PM",
      timestamp: "2 hours ago",
      unread: false,
      icon: <Calendar className="h-5 w-5 text-[#26C6DA]" />,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      type: "recurring_service",
      title: "Recurring Service Reminder",
      message: "Monthly HVAC maintenance due in 3 days",
      timestamp: "1 day ago",
      unread: false,
      icon: <Repeat className="h-5 w-5 text-[#4DD0E1]" />,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Received",
      message: "Payment of $150 received for appliance repair",
      timestamp: "2 days ago",
      unread: false,
      icon: <DollarSign className="h-5 w-5 text-[#4CAF50]" />,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      type: "rating",
      title: "New Review",
      message: "You received a 5-star rating from John Smith",
      timestamp: "3 days ago",
      unread: false,
      icon: <Star className="h-5 w-5 text-[#FF9800]" />,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "fixer_available":
        return "border-l-[#26C6DA]"
      case "job_update":
        return "border-l-[#4CAF50]"
      case "appointment":
        return "border-l-[#26C6DA]"
      case "recurring_service":
        return "border-l-[#4DD0E1]"
      case "payment":
        return "border-l-[#4CAF50]"
      case "rating":
        return "border-l-[#FF9800]"
      default:
        return "border-l-[#00BCD4]/30"
    }
  }

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData)
    // Here you would typically send the image to your backend for processing
    // or create a new repair request from notifications
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/70 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/menu">
              <Menu className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            </Link>
            {/* 3D Jazaro Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* 3D Cube Effect */}
                <div className="w-8 h-8 relative transform-gpu perspective-1000">
                  <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-lg shadow-lg transform rotate-12 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-lg opacity-80 transform translate-x-1 translate-y-1"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm transform -rotate-12 drop-shadow-lg">J</span>
                    </div>
                  </div>
                </div>
                {/* Glowing Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_10px_rgba(0,188,212,0.8)] animate-pulse"></div>
              </div>
              <h1 className="text-xl font-bold text-[#006064] drop-shadow-lg">Jazaro</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications">
              <Bell className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            </Link>
            <Link href="/profile">
              <User className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            </Link>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="relative z-10 px-4 py-3 bg-white/50 backdrop-blur-[10px] border-b border-[#00BCD4]/20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#006064] drop-shadow-lg">Notifications</h1>
          <Button size="sm" variant="ghost" className="text-[#26C6DA] hover:text-[#006064]">
            Mark all read
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="relative z-10 px-4 py-4 bg-white/50 backdrop-blur-[10px] border-b border-[#00BCD4]/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#26C6DA]">{notifications.filter((n) => n.unread).length}</div>
            <div className="text-xs text-[#00838F]">Unread</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#4CAF50]">
              {notifications.filter((n) => n.type === "job_update").length}
            </div>
            <div className="text-xs text-[#00838F]">Job Updates</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#26C6DA]">
              {notifications.filter((n) => n.type === "appointment").length}
            </div>
            <div className="text-xs text-[#00838F]">Appointments</div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="relative z-10 px-4 py-4 space-y-3 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#006064]">Recent Activity</h2>
          <span className="text-sm text-[#00838F]">{notifications.length} notifications</span>
        </div>

        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`border-0 bg-white/80 backdrop-blur-[10px] border-l-4 ${getNotificationColor(notification.type)} border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] hover:shadow-[0_8px_20px_rgba(0,188,212,0.2)] transform hover:scale-105 transition-all duration-300 rounded-[10px] ${
              notification.unread ? "bg-[#00BCD4]/10" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#006064] text-sm">{notification.title}</h3>
                    {notification.unread && <div className="w-2 h-2 bg-[#26C6DA] rounded-full"></div>}
                  </div>
                  <p className="text-sm text-[#00838F] mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#00838F]">{notification.timestamp}</span>
                    {notification.type === "recurring_service" && (
                      <Badge variant="outline" className="text-xs border-[#4DD0E1]/30 text-[#4DD0E1] bg-[#4DD0E1]/10">
                        <Repeat className="h-3 w-3 mr-1" />
                        Recurring
                      </Badge>
                    )}
                  </div>
                </div>
                {notification.avatar && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] text-white text-xs">
                      {notification.title.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="relative z-10 px-4 py-4 bg-white/50 backdrop-blur-[10px] border-t border-[#00BCD4]/20">
        <h3 className="text-sm font-semibold text-[#006064] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
          >
            <Calendar className="h-4 w-4 mr-2" />
            View Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Messages
          </Button>
        </div>
      </div>

      {/* 3D Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-[10px] border-t border-[#00BCD4]/20 px-4 py-2 shadow-[0_4px_10px_rgba(0,188,212,0.3)] z-40">
        <div className="flex justify-around">
          <Link
            href="/"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Button
            onClick={() => setIsCameraOpen(true)}
            className="flex flex-col items-center py-2 bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] hover:from-[#00ACC1] hover:to-[#00BCD4] rounded-[20px] w-14 h-14 -mt-2 shadow-[0_0_20px_rgba(0,188,212,0.5)] transform hover:scale-110 transition-all duration-300 border-2 border-white/30 active:scale-95"
          >
            <Camera className="h-6 w-6 text-white" />
            <span className="text-xs text-white mt-1 font-bold">AI</span>
          </Button>
          <Link
            href="/history"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <Search className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">History</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Camera Modal */}
      <CameraModal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} onCapture={handleCameraCapture} />
    </div>
  )
}
