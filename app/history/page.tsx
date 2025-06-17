"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Search,
  Star,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Repeat,
  MessageCircle,
  MapPin,
  User,
  Filter,
  Camera,
  Menu,
  Bell,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CameraModal from "@/components/camera-modal"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isCameraOpen, setIsCameraOpen] = useState(false)

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
  ]

  const recurringServices = repairHistory.filter((item) => item.recurring)

  const filters = [
    { id: "all", name: "All", count: repairHistory.length },
    { id: "electronics", name: "Electronics", count: repairHistory.filter((r) => r.category === "Electronics").length },
    { id: "plumbing", name: "Plumbing", count: repairHistory.filter((r) => r.category === "Plumbing").length },
    { id: "recurring", name: "Recurring", count: recurringServices.length },
  ]

  const filteredHistory = repairHistory.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fixer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "recurring") return matchesSearch && item.recurring
    return matchesSearch && item.category.toLowerCase() === selectedFilter
  })

  const totalSpent = repairHistory.reduce((sum, item) => sum + item.cost, 0)
  const avgRating = repairHistory.reduce((sum, item) => sum + item.rating, 0) / repairHistory.length

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData)
    // Here you would typically send the image to your backend for processing
    // or navigate to create a new repair request
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto relative overflow-hidden">
      {/* Animated Background for Non-Home Pages */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-backgroundAnimation"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(224, 247, 250, 0.9) 0%, rgba(178, 235, 242, 0.8) 50%, rgba(128, 222, 234, 0.9) 100%), 
                             radial-gradient(circle at 20% 80%, rgba(0, 188, 212, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(77, 208, 225, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(38, 198, 218, 0.2) 0%, transparent 50%)`,
          }}
        />

        {/* Floating Elements Animation */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#00BCD4]/20 to-[#26C6DA]/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-60 right-10 w-24 h-24 bg-gradient-to-r from-[#4DD0E1]/20 to-[#00BCD4]/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-[#26C6DA]/20 to-[#4DD0E1]/20 rounded-full blur-xl animate-float-slow"></div>
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
        <h1 className="text-xl font-bold text-[#006064] drop-shadow-lg">History</h1>
      </div>

      {/* Stats */}
      <div className="relative z-10 px-4 py-4 bg-white/50 backdrop-blur-[10px] border-b border-[#00BCD4]/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#006064]">{repairHistory.length}</div>
            <div className="text-xs text-[#00838F]">Total Repairs</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="text-2xl font-bold text-[#4CAF50]">${totalSpent}</div>
            <div className="text-xs text-[#00838F]">Total Spent</div>
          </div>
          <div className="bg-white/80 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-[#006064]">{avgRating.toFixed(1)}</span>
              <Star className="h-5 w-5 fill-[#FF9800] text-[#FF9800]" />
            </div>
            <div className="text-xs text-[#00838F]">Avg Rating</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 py-4 pb-20">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 rounded-[10px]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00BCD4] data-[state=active]:to-[#26C6DA] data-[state=active]:text-white text-[#00838F] rounded-[10px]"
            >
              All History
            </TabsTrigger>
            <TabsTrigger
              value="recurring"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00BCD4] data-[state=active]:to-[#26C6DA] data-[state=active]:text-white text-[#00838F] rounded-[10px]"
            >
              Recurring Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                <Input
                  placeholder="Search repairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="h-4 w-4 text-[#006064] flex-shrink-0" />
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    size="sm"
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
                  <CardContent className="p-4">
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
                              {repair.recurring && <Repeat className="h-4 w-4 text-[#4DD0E1]" />}
                            </h3>
                            <p className="text-sm text-[#00838F]">{repair.category}</p>
                          </div>
                          <Badge className="bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30 backdrop-blur-[10px]">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={repair.fixerAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] text-white">
                              {repair.fixer.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-[#00838F]">{repair.fixer}</span>
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

                        {repair.recurring && (
                          <div className="mt-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Manage
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recurring" className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] rounded-[20px] shadow-[0_0_20px_rgba(77,208,225,0.5)] flex items-center justify-center mx-auto mb-3">
                <Repeat className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#006064] mb-2">Recurring Services</h3>
              <p className="text-sm text-[#00838F] mb-4">Manage your scheduled maintenance and recurring repairs</p>
            </div>

            <div className="space-y-3">
              {recurringServices.map((service) => (
                <Card
                  key={service.id}
                  className="border-0 bg-white/80 backdrop-blur-[10px] border-l-4 border-l-[#4DD0E1] border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)] rounded-[10px]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#006064] flex items-center gap-2">
                          {service.item}
                          <Badge
                            variant="outline"
                            className="text-xs border-[#4DD0E1]/30 text-[#4DD0E1] bg-[#4DD0E1]/10 backdrop-blur-[10px]"
                          >
                            <Repeat className="h-3 w-3 mr-1" />
                            Monthly
                          </Badge>
                        </h3>
                        <p className="text-sm text-[#00838F]">by {service.fixer}</p>
                      </div>
                      <span className="text-sm font-medium text-[#4DD0E1]">${service.cost}/month</span>
                    </div>

                    <div className="bg-[#4DD0E1]/20 backdrop-blur-[10px] p-3 rounded-[10px] mb-3 border border-[#4DD0E1]/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-[#4DD0E1]" />
                        <span className="text-sm font-medium text-[#006064]">Next Service</span>
                      </div>
                      <p className="text-sm text-[#00838F]">January 15, 2025 at 2:00 PM</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/60 border border-[#00BCD4]/30 text-[#006064] hover:bg-white/80 rounded-[10px]"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-[#F44336] border-[#F44336]/30 bg-[#F44336]/10 hover:bg-[#F44336]/20 rounded-[10px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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
            className="flex flex-col items-center py-2 text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4]/20 to-[#26C6DA]/20 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-lg">
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
